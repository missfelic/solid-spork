let game;
var coinsCollected,
  coinsCollectedText,
  playText,
  optionsText,
  quitText,
  muteMusic,
  goBack,
  sfx,
  muteSXF;
window.onload = function() {
  const gameConfig = {
    type: Phaser.AUTO,
    width: 308,
    height: 800,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 1000
        },
        debug: true
      }
    },
    scene: [
      PreloadGame,
      RestartGame,
      MainMenu,
      Options,
      PlayGame,
      LevelTwo,
      LevelThree
    ]
  };
  game = new Phaser.Game(gameConfig);
};
