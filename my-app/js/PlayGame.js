class PlayGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }
    create(){
        // Loading Game
        // Creating Titled Sprites  // DOESNT ANIMATE YET
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky");
        // Setting Pivot Point (Left Corner)
        this.sky.setOrigin(0, 0);
        // Fix Sky (So It Doesn't Move When Camera Moves)
        this.sky.setScrollFactor(0);
        
        // Adding Second Background (Sides) // DOESNT ANIMATE YET
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
        this.startPlatform = this.physics.add.staticGroup();
        this.startPlatform.create(this.game.config.width / 2, game.config.height / 1.2, 'log').setScale(0.2).refreshBody();

        // Endless Platforms
        this.endlessPlatforms = this.physics.add.staticGroup();
        this.endlessPlatforms.create(randX(), randY(), 'platforms').setScale(0.2).refreshBody();
        this.endlessPlatforms.create(randX(), randY(), 'log').setScale(0.2).refreshBody();


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
        
        // Adding Collision With Starting Platform
        this.physics.add.collider(this.pinkMonster, this.startPlatform);
        // Adding Collision With Endless Platforms
        this.physics.add.collider(this.pinkMonster, this.endlessPlatforms);

        // Key Inputs To Control The pinkMonster
        this.cursors = this.input.keyboard.createCursorKeys();

    }

 


    

    update() {
        // checkX(this.endlessPlatforms)
        // checkY(this.endlessPlatforms)

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
        if (this.physics.add.collider(this.pinkMonster)){
            // If Collision - Y ( Bounce )
            this.pinkMonster.y -= 10;
        }

        // if (this.pinkMonster.y == this.log.y || this.pinkMonster.y == this.platforms.y)

         // Destroy pinkMonster If pinkMoster Falls Off Screen
         if(this.pinkMonster.y > game.config.height) {
             this.pinkMonster.disableBody(true, true)
             console.log('Sprite DESTROYED::', this.pinkMonster, 'Disabled body::', this.pinkMonster.disableBody);
         }
        // Scroll The Background
        // // Scroll The Texture Of The TileSprites 
        // this.sky.titlePositionY = this.myCam.scrollY * .3;
        // this.sides.titlePositionY = this.myCam.scrollY * .6;
    }
}