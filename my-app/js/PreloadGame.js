class PreloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }

  preload() {
    // Load All Game Assets
    //Sky
    this.load.image("sky", "assets/background/layers/sky.png");
    // Sides
    this.load.image("sides", "assets/background/layers/sides.png");
    // Trees
    this.load.image("trees", "assets/background/layers/trees.png");
    // Cloud
    this.load.image("clouds", "assets/background/layers/clouds.png");
    // Log Platforms
    this.load.image("log", "assets/ground/log.png");
    // Grass Platforms
    this.load.image("grass", "assets/ground/platform.png");
    // pinkMonster Sprite Sheet
    this.load.spritesheet(
      "pinkMonster",
      "assets/pinkMonster/pinkMonsterSprite.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );
    // Coins
    this.load.spritesheet("coins", "assets/coin/coin.png", {
      frameWidth: 300,
      frameHeight: 300
    });
    // Title Screen
    this.load.image("titlescreen", "assets/titlescreen/titlescreen.png");

    // Background Music
    this.load.audio("background", "assets/music/omfg.mp3");
    // Jumping
    this.load.audio("jump", "assets/music/jump.mp3");
    // Coin
    this.load.audio("coinSound", "assets/music/coin.mp3");
  }
  create() {
    this.scene.start("PlayGame");
  }
}
