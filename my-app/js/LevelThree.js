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

    // this.coins = this.physics.add.group();

    // Add Special Coin
    this.coin = this.physics.add
      .sprite(randomX(), randomY(), "coins")
      .setScale(0.12);
    // Creating Animation
    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("coins"),
      frameRate: 8,
      repeat: -1
    });
    this.coin.body.allowGravity = false;
    this.coin.play("spin");

    // Create coin group
    // push coins to the group
    // check for collisions with player & platforms
    // if collision respawn the coin
    // make sure there are 10 on the screen

    // Adding Collision With Starting Platform
    this.physics.add.collider(this.pinkMonster, this.startPlatform);

    // Adding Collision With Platforms
    this.physics.add.collider(this.pinkMonster, this.simpleLevel);

    // Adding Collision With Platforms
    this.physics.add.collider(this.coin, this.simpleLevel);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlap
    this.physics.add.overlap(this.pinkMonster, this.coin, this.collectStar);

    // Score
    score = 0;

    scoreText = this.add.text(0, 0, "Score: " + score, {
      font: "20px Arial",
      fill: "#000"
    });
  }

  // Collect function
  collectStar = (pinkMonster, coin) => {
    this.sfx.coinSound.play();
    coin.destroy();
    score += 25;
    scoreText.setText("Score: " + score);
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
