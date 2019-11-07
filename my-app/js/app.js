let game;
let completedGame = false,
  gameOverText,
  mainMenuText,
  levelText,
  timerText,
  playText,
  optionsText,
  stagesText,
  muteMusic,
  goBack,
  sfx,
  muteSXF;

let gameData = window.localStorage;

gameData = {
  cookieClosed: false,
  name: "Player",
  lives: 3,
  bestTime: 0,
  timeLapsed: 0,
  settings: {
    muteSound: false,
    muteMusic: false
  }
};

window.onload = function() {
  const gameConfig = {
    type: Phaser.CANVAS,
    width: 308,
    height: 800,
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 1000
        },
        debug: false
      }
    },
    scene: [
      PreloadGame,
      MainMenu,
      GameOver,
      Options,
      LevelOne,
      LevelTwo,
      LevelThree
    ]
  };
  game = new Phaser.Game(gameConfig);
};
