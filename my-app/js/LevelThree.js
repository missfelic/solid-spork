class LevelThree extends Phaser.Scene {
  constructor() {
    super("LevelThree");
  }

  create() {
    // Load Sounds
    this.sfx = {
      // bgSound: this.sound.add("background"),
      jumpSound: this.sound.add("jump"),
      coinSound: this.sound.add("coinSound")
    };
    // Play Background Music
    // this.sfx.bgSound.play();

    // Loading Game
    // Adding First Background Sky
    this.sky = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "sky"
    );
    // Setting Pivot Point (Left Corner)
    this.sky.setOrigin(0, 0);

    // Adding Second Background (Sides)
    this.sides = this.add.tileSprite(0, 0, 0, 0, "sides");
    // Setting Pivot Point (Left Corner)
    this.sides.setOrigin(0, 0);
    // Setting Scale
    this.sides.setScale(0.2, 0.2);

    // Add pinkMonster
    this.pinkMonster = this.physics.add.sprite(
      game.config.width / 2,
      game.config.height / 1.2,
      "pinkMonster"
    );
    // Create pinkMonster Animation (Idle)
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("pinkMonster"),
      frameRate: 20,
      repeat: -1
    });
    this.pinkMonster.play("idle");

    const defaultPosY = this.game.config.height / 1.1;
    const defaultPosX = this.game.config.width / 2;

    // Starting Platform
    this.startPlatform = this.physics.add.staticGroup();
    this.startPlatform
      .create(defaultPosX, defaultPosY, "grass")
      .setScale(0.2)
      .refreshBody();

    // Creating Random Platforms Group
    this.simpleLevel = this.physics.add.staticGroup();
    // Adding all the platforms
    this.simpleLevel
      .create(200, 590, "log")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(105, 480, "grass")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(150, 360, "grass")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(200, 225, "log")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(100, 105, "log")
      .setScale(0.2)
      .refreshBody();

    // Animating Each individual Coin
    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("coins"),
      frameRate: 8,
      repeat: -1
    });

    // Creating Coin Group &  Setting Gravity To False
    this.coins = this.physics.add.group();
    this.coins.defaults.setAllowGravity = false;
    // Creating Coins For The Coin Group
    this.coins.create(70, 545, "coins").setScale(0.09);

    this.coins.create(220, 265, "coins").setScale(0.09);

    this.coins.create(90, 140, "coins").setScale(0.09);

    this.coins.create(200, 60, "coins").setScale(0.09);
    this.coins.create(200, 100, "coins").setScale(0.09);
    this.coins.create(200, 140, "coins").setScale(0.09);

    this.coins.children.iterate(child => {
      child.play("spin");
    });

    // Adding Collision With Starting Platform
    this.physics.add.collider(this.pinkMonster, this.startPlatform);

    // Adding Collision With Platforms
    this.physics.add.collider(this.pinkMonster, this.simpleLevel);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlap
    this.physics.add.overlap(this.pinkMonster, this.coins, this.collectStar);

    // Score
    coinsCollected = 0;

    coinsCollectedText = this.add.text(
      0,
      0,
      "Coins: " + coinsCollected + "/6",
      {
        font: "20px Arial",
        fill: "#000"
      }
    );
  }

  // Collect function
  collectStar = (pinkMonster, coins) => {
    this.sfx.coinSound.play();
    coins.destroy();
    coinsCollected += 1;
    coinsCollectedText.setText("Coins: " + coinsCollected + "/6");
  };

  update() {
    // Keyboard Inputs
    // Left & Right Controls
    if (this.cursors.left.isDown) {
      this.pinkMonster.setVelocityX(-120);
      this.pinkMonster.anims.play("idle", true);
      this.pinkMonster.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.pinkMonster.setVelocityX(120);
      this.pinkMonster.anims.play("idle", true);
      this.pinkMonster.flipX = false;
    }

    // Jumping Controls
    if (this.cursors.space.isDown && this.pinkMonster.body.touching.down) {
      this.pinkMonster.setVelocityY(-500);
      // Adding Jump sound
      this.sfx.jumpSound.play();
    }

    // If you fall then
    if (this.pinkMonster.y > game.config.height) {
      // Loads Level One
      game.scene.start("LevelTwo");
      game.scene.stop("LevelThree");
    }
  }
}
