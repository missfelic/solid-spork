class LevelThree extends Phaser.Scene {
  constructor() {
    super("LevelThree");
  }

  create() {
    let bronzeKeyCollected = false;
    let chestOverlap = false;

    // Load Sounds
    this.sfx = {
      // bgSound: this.sound.add("background"),
      jumpSound: this.sound.add("jump"),
      coinSound: this.sound.add("coinSound")
    };
    // Play Background Music
    // this.sfx.bgSound.play();

    // Loading Game Background
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

    // Chest Sprite
    this.chest = this.physics.add.sprite(90, 75, "chest").setScale(0.1);
    // Creating Animation
    this.anims.create({
      key: "chestOpen",
      frames: this.anims.generateFrameNumbers("chest"),
      frameRate: 8,
      repeat: 0
    });
    this.chest.body.allowGravity = false;

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

    // Bronze Key
    this.bronzeKey = this.physics.add
      .sprite(230, 380, "bronzeKey")
      .setScale(0.5);
    this.bronzeKey.body.allowGravity = false;

    // Adding Collision With Starting Platform
    this.physics.add.collider(this.pinkMonster, this.startPlatform);

    // Adding Collision With Platforms
    this.physics.add.collider(this.pinkMonster, this.simpleLevel);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlap
    // Coin Overlap
    this.physics.add.overlap(this.pinkMonster, this.coins, this.collectCoin);
    // Chest Overlap
    this.physics.add.overlap(this.pinkMonster, this.chest, this.chestPlayAnims);
    // Key Overlap
    this.physics.add.overlap(this.pinkMonster, this.bronzeKey, this.collectKey);

    // Lives Group
    this.lives = this.physics.add.group();
    this.lives.defaults.setAllowGravity = false;
    // Create lives
    this.lives.create(75, 785, "life");
    this.lives.create(105, 785, "life");
    this.lives.create(135, 785, "life");

    // Score
    scoreText = this.add.text(100, 0, "Score: " + score, {
      font: "20px",
      fill: "#000"
    });
    // Level Three
    levelText = this.add.text(162, 772, "Level 3", {
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

  // Seperate Functions
  // Collect function
  collectCoin = (pinkMonster, coins) => {
    this.sfx.coinSound.play();
    coins.destroy();
    score += 10;
    scoreText.setText("Score: " + score);
  };

  // Key Collection
  collectKey = (pinkMonster, bronzeKey) => {
    bronzeKey.destroy();
    this.bronzeKeyCollected = true;
  };

  // Chest Overlap
  chestPlayAnims = (pinkMonster, chest) => {
    this.chestOverlap = true;
  };

  update() {
    // Checking For Collision With Chest
    if (this.chestOverlap && this.bronzeKeyCollected) {
      // Play animation
      this.chest.anims.play("chestOpen", true);
      this.chestOverlap = false;
      this.bronzeKeyCollected === false;
    } else if (this.chestOverlap && !this.bronzeKeyCollected) {
      this.chestOverlap = false;
    }

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
      // Restart Level
      game.scene.start("LevelThree");
    }
  }
}
