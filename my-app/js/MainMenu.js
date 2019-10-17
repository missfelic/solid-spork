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

    // TODO::
    //   // Loading bar
    //   this.loading = this.add.sprite(
    //     game.config.width / 2,
    //     game.config.height / 2,
    //     "loading"
    //   );

    // this.loading.setScale(0.5);

    // Play
    playText = this.add.text(125, 350, "Play", {
      font: "20px ",
      fill: "#000"
    });
    // Options
    optionsText = this.add.text(125, game.config.height / 2, "Options", {
      font: "20px ",
      fill: "#000"
    });
    // Quit
    quitText = this.add.text(125, 450, "Quit", {
      font: "20px ",
      fill: "#000"
    });

    // Making Text Interactive
    playText.setInteractive({ useHandCursor: true });
    optionsText.setInteractive({ useHandCursor: true });
    quitText.setInteractive({ useHandCursor: true });

    // Load Game
    playText.on("pointerdown", () => {
      game.scene.stop("MainMenu");
      game.scene.start("LevelOne");
    });

    // Load Options
    optionsText.on("pointerdown", () => {
      game.scene.stop("MainMenu");
      game.scene.start("Options");
    });

    // Quit Game
    quitText.on("pointerdown", () => {
      game.scene.stop("MainMenu");
    });
  }
}
