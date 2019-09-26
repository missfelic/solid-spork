class RestartGame extends Phaser.Scene {
  constructor() {
    super("RestartGame");
  }
  create() {
    this.scene.start("PlayGame");
  }
}
