class Options extends Phaser.Scene {
  constructor() {
    super("Options");
  }
  create() {
    let musicOn = true;
    let soundOn = true;
    // Titlescreen
    this.titlescreen = this.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "titlescreen"
    );
    this.titlescreen.setScale(0.2);

    // Back
    goBack = this.add.text(85, 350, "Back", {
      font: "20px ",
      fill: "#000"
    });

    // Mute Music
    muteMusic = this.add.text(85, game.config.height / 2, "Music - On", {
      font: "20px ",
      fill: "#000"
    });

    // Mute sfx
    muteSXF = this.add.text(85, 450, "SoundXFs - On", {
      font: "20px ",
      fill: "#000"
    });

    // Making Text Interactive
    goBack.setInteractive({ useHandCursor: true });
    muteMusic.setInteractive({ useHandCursor: true });
    muteSXF.setInteractive({ useHandCursor: true });

    // Go Back To MainMenu
    goBack.on("pointerdown", () => {
      game.scene.stop("Options");
      game.scene.start("MainMenu");
    });

    // Mute Music
    muteMusic.on("pointerdown", () => {
      if (musicOn === true) {
        musicOn = false;
        muteMusic.setText("Music - Off");
      } else {
        musicOn = true;
        muteMusic.setText("Music - On");
      }
    });

    // Mute SoundXF
    muteSXF.on("pointerdown", () => {
      if (soundOn === true) {
        soundOn = false;
        muteSXF.setText("SoundXF - Off");
      } else {
        soundOn = true;
        muteSXF.setText("SoundXF - On");
      }
    });
  }
}
