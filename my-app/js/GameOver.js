class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    gameOver = true;
    // Titlescreen
    this.titlescreen = this.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "titlescreen"
    );
    this.titlescreen.setScale(0.2);

    // Gameover text
    gameOverText = this.add.text(80, 350, "Game Over", {
      font: "30px ",
      fill: "#333"
    });

    // Return to MainMenu
    mainMenuText = this.add.text(105, game.config.height / 2, "Main Menu", {
      font: "20px ",
      fill: "#333"
    });

    timerText = this.add.text(145, 300, seconds, {
      font: "25px",
      color: "#333"
    });

    timerText.setOrigin(0, 0);

    // Making Text Interactive
    mainMenuText.setInteractive({ useHandCursor: true });

    // Load MainMenu
    mainMenuText.on("pointerdown", () => {
      game.scene.stop("GameOver");
      location.reload();
    });
  }

  update() {}
}
