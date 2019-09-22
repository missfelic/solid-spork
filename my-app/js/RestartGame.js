class RestartGame extends Phaser.Scene {
  constructor() {
    super("RestartGame");
  }

  preload() {}
  create() {
    this.scene.start("PlayGame");
  }
}
