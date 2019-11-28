class LevelTwo extends Phaser.Scene {
  constructor() {
    super("LevelTwo");
  }

  create() {
    const defaultPosY = this.game.config.height / 1.1;
    const defaultPosX = this.game.config.width / 2;

    // Sounds
    this.sfx = {
      jumpSound: this.sound.add("jump"),
      coinSound: this.sound.add("coinSound"),
      gameover: this.sound.add("gameover")
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

    // Groups
    // Creating Coin Group &  Setting Gravity To False
    this.coins = this.physics.add.staticGroup();
    // Creating Coins For The Coin Group
    this.coins
      .create(100, 580, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(220, 320, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(100, 320, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(100, 285, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(100, 250, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(100, 215, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins
      .create(230, 20, "coins")
      .setScale(0.09)
      .refreshBody();
    this.coins.children.iterate(child => {
      child.play("spin");
    });

    // Hearts Group
    this.hearts = this.physics.add.staticGroup({
      key: "life",
      // gameData lives - this is stored in local storage
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

    // Level Text
    levelText = this.add.text(162, 772, "Level 2", {
      font: "20px",
      fill: "#000"
    });

    timerText = this.add.text(80, 20, seconds, {
      font: "25px",
      fill: "#333"
    });

    timerText.setOrigin(0, 0);
  }

  // Collect function
  collectCoin = (pinkMonster, coins) => {
    if (seconds < 1) {
      seconds -= 0;
    } else {
      seconds -= 1;
    }
    this.sfx.coinSound.play();
    coins.destroy();
  };

  update() {
    if (hasTapped || hasSwiped) {
      startTimer = true;
    }
    // Mobile Controls
    const myCanvas = document.getElementById("phaserCanvas");
    const newHammer = new Hammer.Manager(myCanvas);

    const onTap = new Hammer.Tap({
      event: "tap",
      taps: 1
    });

    const onSwipe = new Hammer.Swipe({
      event: "swipe",
      pointers: 1,
      threshold: 10
    });

    newHammer.add(onTap);
    newHammer.add(onSwipe);

    // on Tap
    newHammer.on("tap", e => {
      hasTapped = true;
      if (this.pinkMonster.body.touching.down) {
        this.pinkMonster.setVelocityY(-500);
        this.sfx.jumpSound.play();
      }
    });

    // on Swipe
    newHammer.on("swipeleft", () => {
      hasSwiped = true;
      this.pinkMonster.setVelocityX(-120);
      this.pinkMonster.anims.play("idle", true);
      this.pinkMonster.flipX = true;
    });

    newHammer.on("swiperight", () => {
      hasSwiped = true;
      this.pinkMonster.setVelocityX(120);
      this.pinkMonster.anims.play("idle", true);
      this.pinkMonster.flipX = false;
    });
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

    if (this.pinkMonster.y > game.config.height) {
      // Removing live when fall
      if (gameData.lives > 0) {
        gameData.lives -= 1;
        this.hearts.children.entries[gameData.lives].destroy();
      }
      if (gameData.lives === 0) {
        game.scene.stop("LevelTwo");
        game.scene.start("GameOver");
        this.game.sound.stopAll();
        this.sfx.gameover.play();
      } else {
        game.scene.start("LevelOne");
        game.scene.stop("LevelTwo");
      }
    }

    // If you reach the top then
    if (this.pinkMonster.y <= 0) {
      // Loads Level Three
      game.scene.start("LevelThree");
      game.scene.stop("LevelTwo");
    }
  }
}
