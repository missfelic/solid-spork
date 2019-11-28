class PreloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }

  preload() {
    // Setting Canvas id
    this.game.canvas.id = "phaserCanvas";
    // Images //
    //Sky
    this.load.image("sky", "assets/background/layers/sky.png");
    // Sides
    this.load.image("sides", "assets/background/layers/sides.png");
    // Trees
    this.load.image("trees", "assets/background/layers/trees.png");
    // Cloud
    this.load.image("clouds", "assets/background/layers/clouds.png");
    // Log Platforms
    this.load.image("log", "assets/platforms/log.png");
    // Grass Platforms
    this.load.image("grass", "assets/platforms/platform.png");
    // Life
    this.load.image("life", "assets/life/life.gif");
    // Post
    this.load.image("post", "assets/flag/post.png");
    // Top
    this.load.image("top", "assets/flag/top.png");
    // Base
    this.load.image("base", "assets/flag/base.png");

    // Title Screen
    this.load.image("titlescreen", "assets/titlescreen/titlescreen.png");

    // Sprites //
    this.load.spritesheet(
      "pinkMonster",
      "assets/sprites/pinkMonsterSprite.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );
    // Coins
    this.load.spritesheet("coins", "assets/sprites/coin.png", {
      frameWidth: 300,
      frameHeight: 300
    });

    // Flag
    this.load.spritesheet("flag", "assets/flag/flag.png", {
      frameWidth: 898,
      frameHeight: 641
    });

    // Audio //
    // Jumping
    this.load.audio("jump", "assets/audio/jump.mp3");
    // Coin
    this.load.audio("coinSound", "assets/audio/coin.mp3");
    // Level Complete
    this.load.audio("stageComplete", "assets/audio/stageComplete.mp3");
    // Background Music
    this.load.audio("bgMusic", "assets/audio/bgMusic.mp3");
    // Gameover
    this.load.audio("gameover", "assets/audio/gameover.mp3");
  }

  create() {
    this.scene.start("MainMenu");

    this.bgMusic = this.sound.add("bgMusic");
    this.bgMusic.setLoop(true);
    this.bgMusic.play();
  }
}
