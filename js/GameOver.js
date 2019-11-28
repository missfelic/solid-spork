class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.game.sound.stopAll();
    gameOver = true;
    // Titlescreen
    this.titlescreen = this.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "titlescreen"
    );
    this.titlescreen.setScale(0.2);

    // Gameover text
    gameOverText = this.add.text(
      75,
      350,
      `${completedGame ? "Level \nComplete!" : "Game over!"}`,
      {
        font: "30px",
        fill: "#333",
        align: "center"
      }
    );

    const textHeight = completedGame ? 440 : game.config.height / 2;

    // Return to MainMenu
    mainMenuText = this.add.text(95, textHeight, "Play again?", {
      font: "20px ",
      fill: "#333"
    });

    const bestTime = Cookies.get("bestTime");

    const textStyle = {
      font: "20px",
      color: "#333",
      align: "center"
    };

    bestTimeText = this.add.text(70, 270, bestTime, textStyle);

    if (bestTime >= 60) {
      let minutes = Math.floor(bestTime / 60);
      bestTimeText.setText(`Your Best Time: \n${minutes}m ${bestTime % 60}s`);
    } else {
      bestTimeText.setText(`Your Best Time: \n${bestTime % 60}s`);
    }

    bestTimeText.setOrigin(0, 0);

    // Load MainMenu
    this.input.on("pointerdown", () => {
      game.scene.stop("gameOver");
      location.reload();
    });
  }

  update() {}
}
