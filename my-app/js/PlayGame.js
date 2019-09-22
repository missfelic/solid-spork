class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  create() {
    // Load Sounds
    this.sfx = {
      bgSound: this.sound.add("background"),
      jumpSound: this.sound.add("jump"),
      gemSound: this.sound.add("gemSound"),
      coinSound: this.sound.add("coinSound")
    };
    // Play Background Music
    this.sfx.bgSound.play();

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
      .create(100, 620, "log")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(210, 550, "grass")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(130, 445, "log")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(100, 345, "log")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(220, 280, "log")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(130, 200, "grass")
      .setScale(0.2)
      .refreshBody();
    this.simpleLevel
      .create(210, 100, "log")
      .setScale(0.2)
      .refreshBody();

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

    // Gems
    // Creating randomGems Group
    this.randomGems = this.physics.add.group();
    //  console.log(this.randomGems)
    this.randomGems.defaults.setAllowGravity = false;
    // //  // Adding all the platforms
    this.randomGems.create(randomX(), randomY(), "redGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "blueGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "greenGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "redGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "blueGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "greenGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "redGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "blueGem").setScale(0.05);
    this.randomGems.create(randomX(), randomY(), "greenGem").setScale(0.05);

    //  console.log('randomGems', this.randomGems);

    // Adding Collision With Starting Platform
    this.physics.add.collider(this.pinkMonster, this.startPlatform);

    // Adding Collision With Platforms
    this.physics.add.collider(this.pinkMonster, this.simpleLevel);

    // Adding Collision With Platforms
    this.physics.add.collider(this.coin, this.simpleLevel);

    // Collision with Gems
    this.physics.add.collider(this.randomGems, this.simpleLevel);

    // Key Inputs To Control The pinkMonster
    this.cursors = this.input.keyboard.createCursorKeys();

    // Checking for overlap
    this.physics.add.overlap(this.pinkMonster, this.coin, this.collectStar);
    this.physics.add.overlap(
      this.pinkMonster,
      this.randomGems,
      this.collectGem
    );

    this.randomGems = this.physics.add.group();
    console.log("Random Gems::", this.randomGems);
    this.randomGems.defaults.setAllowGravity = false;

    // TODO:::::
    // let gemArray = [];
    // const total = 6;

    // for (let i = 0; i <= total; i++) {
    //   gemArray.push(
    //     this.randomGems.create(randomX(), randomY(), "redGem").setScale(0.05)
    //   );
    //   this.physics.add.overlap(
    //     this.simpleLevel,
    //     this.randomGems,
    //     this.destroySprite
    //   );
    // }

    // Score
    score = 0;

    scoreText = this.add.text(0, 0, "Score: " + score, {
      font: "20px Arial",
      fill: "#000"
    });
  }

  // Collec functions of collectables
  collectStar = (pinkMonster, coin) => {
    this.sfx.coinSound.play();
    coin.destroy();
    score += 25;
    scoreText.setText("Score: " + score);
  };

  collectGem = (pinkMonster, randomGems) => {
    this.sfx.gemSound.play();
    randomGems.destroy();
    score += 10;
    scoreText.setText("Score: " + score);
  };

  destroySprite = (simpleLevel, randomGems) => {
    randomGems.destroy();
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

    // Destroy pinkMonster If pinkMoster Falls Off Screen & Reload Game
    if (this.pinkMonster.y > game.config.height) {
      this.sfx.bgSound.stop();
      this.pinkMonster.disableBody(true, true);
      game.scene.start("RestartGame");
    }
  }
}
