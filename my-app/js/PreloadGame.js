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
      "assets/pinkmonster/pinkMonsterSprite.png",
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
    // Chest
    this.load.spritesheet("chest", "assets/chest/chest.png", {
      frameWidth: 432,
      frameHeight: 498
    });
    // Title Screen
    this.load.image("titlescreen", "assets/titlescreen/titlescreen.png");
    // Loadingbar
    // this.load.image("loading", "assets/loading/loading.png");
    // Jumping
    this.load.audio("jump", "assets/music/jump.mp3");
    // Coin
    this.load.audio("coinSound", "assets/music/coin.mp3");
    // Key
    this.load.image("bronzeKey", "assets/keys/bronzeKey.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
