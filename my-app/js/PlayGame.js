class PlayGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }

    create(){
        // Loading Game
        // Adding First Background Sky
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky");
        // Setting Pivot Point (Left Corner)
        this.sky.setOrigin(0, 0);
        
        // Adding Second Background (Sides)
        this.sides = this.add.tileSprite(0, 0, 0, 0, "sides");
        // Setting Pivot Point (Left Corner)
        this.sides.setOrigin(0, 0);
        // Setting Scale
        this.sides.setScale(0.2, 0.2);

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
        
        const defaultPosY = this.game.config.height / 1.1;
        const defaultPosX = this.game.config.width / 2;

         // Starting Platform
         this.startPlatform = this.physics.add.staticGroup();
         this.startPlatform.create(defaultPosX, defaultPosY, 'log').setScale(0.2).refreshBody();

        // Creating Random Platforms Group
        this.simpleLevel = this.physics.add.staticGroup();
        // Adding all the platforms
        this.simpleLevel.create(100, 620, 'log').setScale(0.2).refreshBody();
        this.simpleLevel.create(210, 550, 'log').setScale(0.2).refreshBody();
        this.simpleLevel.create(130, 445, 'log').setScale(0.2).refreshBody();
        this.simpleLevel.create(100, 345, 'log').setScale(0.2).refreshBody();
        this.simpleLevel.create(220, 280, 'log').setScale(0.2).refreshBody();
        this.simpleLevel.create(130, 200, 'log').setScale(0.2).refreshBody();
        this.simpleLevel.create(210, 100, 'log').setScale(0.2).refreshBody();

        // Add Special Coin
        this.coin = this.physics.add.sprite(randomX(), randomY(), 'coins').setScale(0.12);
        // Creating Animation
        this.anims.create ({
            key: 'spin',
            frames:
            this.anims.generateFrameNumbers('coins'), frameRate: 8,
            repeat: -1,
        });

        this.coin.body.allowGravity = false;

        this.coin.play('spin');

         // Adding Collision With Starting Platform
         this.physics.add.collider(this.pinkMonster, this.startPlatform);

         // Adding Collision With Platforms
         this.physics.add.collider(this.pinkMonster, this.simpleLevel);

         // Adding Collision With Platforms
         this.physics.add.collider(this.coin, this.simpleLevel);

         // Key Inputs To Control The pinkMonster
         this.cursors = this.input.keyboard.createCursorKeys();

         this.physics.add.overlap(this.pinkMonster, this.coin, this.collectStar)
    }


    collectStar(pinkMonster, coin){
        coin.destroy();
    }

    update() {

        // Keyboard Inputs
        // Left & Right Controls
        if (this.cursors.left.isDown) {
            this.pinkMonster.setVelocityX(-120);
            this.pinkMonster.anims.play('idle', true);
            this.pinkMonster.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.pinkMonster.setVelocityX(120);
            this.pinkMonster.anims.play('idle', true);
            this.pinkMonster.flipX = false;
        }

        // Jumping Controls 
        if (this.cursors.space.isDown && this.pinkMonster.body.touching.down){
            this.pinkMonster.setVelocityY(-500);
        } 

         // Destroy pinkMonster If pinkMoster Falls Off Screen
         if(this.pinkMonster.y > game.config.height) {
             this.pinkMonster.disableBody(true, true)
             console.log('Sprite DESTROYED::', this.pinkMonster, 'Disabled body::', this.pinkMonster.disableBody);
         }
    }
}