let game;
let score = 0,
  levelText,
  scoreText,
  playText,
  optionsText,
  quitText,
  muteMusic,
  goBack,
  sfx,
  muteSXF;

let gameData = {
  cookieClosed: false,
  name: "Player",
  score: score,
  settings: {
    muteSound: false,
    muteMusic: false
  }
};

window.onload = function() {
  // Using Local Storage To Store Data
  window.localStorage.clear();
  window.localStorage.setItem("gameData", JSON.stringify(gameData));
  console.log("gameData from app.js", gameData);
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
    scene: [PreloadGame, MainMenu, Options, LevelOne, LevelTwo, LevelThree]
  };
  game = new Phaser.Game(gameConfig);
};
