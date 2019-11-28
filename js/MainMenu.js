class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // Titlescreen
    this.titlescreen = this.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "titlescreen"
    );
    this.titlescreen.setScale(0.2);

    // Play
    playText = this.add.text(125, 350, "Play!", {
      font: "20px ",
      fill: "#000"
    });

    // Making Text Interactive
    playText.setInteractive({ useHandCursor: true });

    // Load Game
    playText.on("pointerdown", () => {
      game.scene.stop("MainMenu");
      game.scene.start("LevelOne");
    });
  }
}
