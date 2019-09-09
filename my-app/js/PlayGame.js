class PlayGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }
    create(){
        // Loading Game
        // Creating Titled Sprites
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky");
        // Setting Pivot Point (Left Corner)
        this.sky.setOrigin(0, 0);
        // Fix Sky (So It Doesn't Move When Camera Moves)
        this.sky.setScrollFactor(0);
        
        // Adding Second Background (Sides)
        this.sides = this.add.tileSprite(0, 0, 0, 0, "sides");
        // Setting Pivot Point (Left Corner)
        this.sides.setOrigin(0, 0);
        // Setting Scale
        this.sides.setScale(0.2, 0.2);
        // Fix Sky (So It Doesn't Move When Camera Moves)
        this.sides.setScrollFactor(0);

        // ****** TODO: *******  // 
        // Add Cloud
        // Add Trees 
        // Add Starting Ground

        // Starting Platform
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(this.game.config.width / 2, game.config.height / 1.2, 'platforms').setScale(0.2).refreshBody();

        // Add pinkMonster
        this.pinkMonster = this.physics.add.sprite(game.config.width / 2, game.config.height / 1.2, 'pinkMonster');
        // Create pinkMonster Animation (Idle)
        this.anims.create ({
            key: 'idle',
            frames:
            this.anims.generateFrameNumbers('pinkMonster'), frameRate: 20,
            repeat: -1
        });
        this.pinkMonster.play('idle');

        // Set Bounds To Allow Camera To Follow The pinkMonster
        // this.myCam = this.cameras.main;
        // this.myCam.setBounds(0, 0, game.config.width, game.config.height);
        
        // Making The Camera Follow The pinkMonster
        // this.myCam.startFollow(this.pinkMonster);
        
        // Adding Collision
        this.physics.add.collider(this.pinkMonster, this.platforms);

        // Key Inputs To Control The pinkMonster
        this.cursors = this.input.keyboard.createCursorKeys();

        ////////// NEED TO RE THINK ///////////
        let randX = Math.floor(Math.random() * game.config.width);
        let randY = Math.floor(Math.random() * game.config.height);
        console.log('Height::',game.config.height, 'Width::', game.config.width)
        console.log('X::', randX, 'Y::', randY);

    }



    

    update() {

        // Keyboard Inputs
        if (this.cursors.left.isDown) {
            this.pinkMonster.setVelocityX(-160);
            this.pinkMonster.anims.play('idle', true);
            this.pinkMonster.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.pinkMonster.setVelocityX(160);
            this.pinkMonster.anims.play('idle', true);
            this.pinkMonster.flipX = false;
        }

        // Check For Collision With Platform
        if (this.physics.add.collider(this.pinkMonster, this.platforms)){
            // If Collision - Y ( Bounce )
            this.pinkMonster.y -= 10;
        }

        // Scroll The Background
        // // Scroll The Texture Of The TileSprites 
        // this.sky.titlePositionY = this.myCam.scrollY * .3;
        // this.sides.titlePositionY = this.myCam.scrollY * .6;
    }
}