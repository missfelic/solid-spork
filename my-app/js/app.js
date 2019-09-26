let game;
// Need to save score throughout the game scenes
var coinsCollected;
var coinsCollectedText;
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
        debug: false
      }
    },
    scene: [PreloadGame, PlayGame, RestartGame, LevelTwo, LevelThree]
  };
  game = new Phaser.Game(gameConfig);
};
