let bestTimeText,
  completedGame = false,
  // Global Swipe Variables
  deltaX = 0,
  deltaY = 0,
  game,
  gameOver = false,
  gameOverText,
  hasTapped = false,
  hasSwiped = false,
  levelText,
  mainMenuText,
  playText,
  seconds,
  timerToggle = false,
  timerText;

let gameData = window.localStorage;

// If not cookie, set one
if (!Cookies.get("bestTime")) {
  Cookies.set("bestTime", "0", { expires: 7, path: "/" });
}

gameData = {
  cookieClosed: false,
  lives: 3,
  timeLapsed: 0
};

window.onload = function() {
  const gameConfig = {
    type: Phaser.AUTO,
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
    scene: [PreloadGame, MainMenu, GameOver, LevelOne, LevelTwo, LevelThree]
  };

  game = new Phaser.Game(gameConfig);
};
