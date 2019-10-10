class LevelTwo extends Phaser.Scene {
  constructor() {
    super("LevelTwo");
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
    this.platforms = this.physics.add.staticGroup();
    // Adding all the platforms
    this.platforms
      .create(190, 600, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(120, 500, "grass")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(100, 365, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(220, 265, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(150, 145, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(100, 70, "grass")
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
    this.coins.create(100, 580, "coins").setScale(0.09);
    this.coins.create(220, 320, "coins").setScale(0.09);

    this.coins.create(100, 320, "coins").setScale(0.09);
    this.coins.create(100, 285, "coins").setScale(0.09);
    this.coins.create(100, 250, "coins").setScale(0.09);
    this.coins.create(100, 215, "coins").setScale(0.09);

    this.coins.create(230, 20, "coins").setScale(0.09);

    this.coins.children.iterate(child => {
      child.play("spin");
    });

    // Adding Collision With Starting Platform
    this.physics.add.collider(this.pinkMonster, this.startPlatform);

    // Adding Collision With Platforms
    this.physics.add.collider(this.pinkMonster, this.platforms);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlap
    this.physics.add.overlap(this.pinkMonster, this.coins, this.collectCoin);

    // Lives Group
    this.lives = this.physics.add.group({
      key: "life",
      repeat: 2,
      setXY: { x: 75, y: 785, stepX: 28 }
    });

    this.lives.children.iterate(function(child) {
      child.body.allowGravity = false;
    });

    // Score
    scoreText = this.add.text(100, 0, "Score: " + score, {
      font: "20px",
      fill: "#000"
    });
    // Level Text
    levelText = this.add.text(162, 772, "Level 2", {
      font: "20px",
      fill: "#000"
    });
  }

  // Collect function
  collectCoin = (pinkMonster, coins) => {
    this.sfx.coinSound.play();
    coins.destroy();
    coinScore();
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
      // Return to previous level
      game.scene.stop("LevelTwo");
      game.scene.start("LevelOne");
    }

    // If you reach the top then
    if (this.pinkMonster.y <= 0) {
      // Loads Level Three
      game.scene.start("LevelThree");
      game.scene.stop("LevelTwo");
    }
  }
}
