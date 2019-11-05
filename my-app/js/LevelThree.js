class LevelThree extends Phaser.Scene {
  constructor() {
    super("LevelThree");
  }

  create() {
    const defaultPosY = this.game.config.height / 1.1;
    const defaultPosX = this.game.config.width / 2;

    // Sounds
    this.sfx = {
      jumpSound: this.sound.add("jump"),
      coinSound: this.sound.add("coinSound")
    };

    // Sky
    this.sky = this.add.image(0, 0, "sky").setOrigin(0, 0);

    // Clouds
    this.clouds = this.add.image(150, 80, "clouds").setScale(0.2);

    // Wood Sides
    this.sides = this.add
      .image(0, 0, "sides")
      .setOrigin(0, 0)
      .setScale(0.2);

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

    // Flag
    //TODO:
    // get pole, base & top displaying
    // position correctly
    // save time to local sotrage / session storage
    // make completed screen
    // show best time vs time you just got
    // once you hit flag save current time to storage & load completed level screen
    this.flag = this.physics.add
      .sprite(0, 0, "flag")
      .setOrigin(0)
      .setScale(0.08);

    this.anims.create({
      key: "blow",
      frames: this.anims.generateFrameNumbers("flag"),
      frameRate: 10,
      repeat: -1
    });
    this.flag.play("blow");
    this.flag.body.allowGravity = false;

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

    // Groups
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

    // Hearts Group
    this.hearts = this.physics.add.group({
      key: "life",
      // gameData lives - this is stored in local storage
      repeat: gameData.lives - 1,
      setXY: { x: 75, y: 785, stepX: 28 }
    });

    this.hearts.children.iterate(function(child) {
      child.body.allowGravity = false;
    });

    // Collision Detection
    this.physics.add.collider(this.pinkMonster, this.startPlatform);
    this.physics.add.collider(this.pinkMonster, this.simpleLevel);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlaps
    this.physics.add.overlap(this.pinkMonster, this.coins, this.collectCoin);

    // Level Three
    levelText = this.add.text(162, 772, "Level 3", {
      font: "20px",
      fill: "#000"
    });

    timerText = this.add.text(100, 20, "0", {
      font: "25px",
      fill: "#333"
    });

    timerText.setOrigin(0, 0);
  }

  // Collect function
  collectCoin = (pinkMonster, coins) => {
    this.sfx.coinSound.play();
    coins.destroy();
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

    if (this.pinkMonster.y > game.config.height) {
      // Removing lift when fall
      if (gameData.lives > 0) {
        gameData.lives -= 1;
        this.hearts.children.entries[gameData.lives].destroy();
      }
      if (gameData.lives === 0) {
        game.scene.stop("LevelThree");
        game.scene.start("GameOver");
      } else {
        game.scene.start("LevelTwo");
        game.scene.stop("LevelThree");
      }
    }
  }
}
