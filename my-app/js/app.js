let game;

// Game Config
window.onload = function(){
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
    scene: [PreloadGame, PlayGame]
  }
  game = new Phaser.Game(gameConfig);
}