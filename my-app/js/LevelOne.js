class LevelOne extends Phaser.Scene {
  constructor() {
    super("LevelOne");
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

    // Trees
    this.trees = this.add
      .image(50, 0, "trees")
      .setOrigin(0, 0)
      .setScale(0.2);

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
      .create(100, 620, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(210, 550, "grass")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(130, 445, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(100, 345, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(220, 280, "log")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(130, 200, "grass")
      .setScale(0.2)
      .refreshBody();
    this.platforms
      .create(210, 100, "log")
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
    this.coins = this.physics.add.staticGroup();

    // Creating Coins For The Coin Group
    this.coins
      .create(100, 580, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(125, 540, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(150, 500, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(100, 325, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(210, 80, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins.children.iterate(child => {
      child.play("spin");
    });

    // Hearts Group
    this.hearts = this.physics.add.staticGroup({
      key: "life",
      // lives as the global variable
      repeat: gameData.lives - 1,
      setXY: { x: 75, y: 785, stepX: 28 }
    });

    // Collision Detection
    this.physics.add.collider(this.pinkMonster, this.startPlatform);
    this.physics.add.collider(this.pinkMonster, this.platforms);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlap
    this.physics.add.overlap(this.pinkMonster, this.coins, this.collectCoin);

    // Game Text
    levelText = this.add.text(162, 772, "Level 1", {
      font: "20px",
      fill: "#FFF"
    });

    timerText = this.add.text(80, 20, "0s", {
      font: "25px",
      fill: "#333"
    });

    timerText.setOrigin(0, 0);

    // Checking for keyPress to start timer
    // document.addEventListener("keydown", event => {
    //   if (
    //     event.keyCode === 39 ||
    //     event.keyCode === 32 ||
    //     event.keyCode === 37
    //   ) {
    //   }
    // });
  }

  // Collect function
  collectCoin = (pinkMonster, coins) => {
    this.sfx.coinSound.play();
    coins.destroy();
  };

  update() {
    // Keyboard Inputs
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

    // Destroy pinkMonster If pinkMoster Falls Off Screen & Reload Game
    if (this.pinkMonster.y > game.config.height) {
      // Reseting pinkMonster position
      this.pinkMonster.body.reset(
        game.config.width / 2,
        game.config.height / 1.2,
        false,
        false
      );
      // Removing live when fall
      if (gameData.lives > 0) {
        gameData.lives -= 1;
        this.hearts.children.entries[gameData.lives].destroy();
        if (gameData.lives === 0) {
          game.scene.stop("LevelOne");
          game.scene.start("GameOver");
        }
      }
    }

    // If Player Reaches Top of Screen Load Next Level
    if (this.pinkMonster.y <= 0) {
      clearTimeout(this.stopTimer);
      // Loads Level Two
      game.scene.start("LevelTwo");
      game.scene.stop("LevelOne");
    }
  }
}
