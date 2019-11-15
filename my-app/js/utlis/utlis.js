//    **    //
// Utilities //
//    **   //

// Random X Between Width Of My Game
const randomX = () => {
  let randomX = Math.floor(Math.random() * (250 - 100) + 100);
  return randomX;
};

// Random Y Between Height Of My Game
const randomY = () => {
  let randomY = Math.floor(Math.random() * (700 - 100) + 100);
  return randomY;
};

const closeCookie = () => {
  const cookiesContainer = document.getElementsByClassName("cookiesContainer");

  // Loop through cookieContainer adding class 'hide' to each element
  for (var i = 0; i < cookiesContainer.length; i++) {
    cookiesContainer[i].classList.toggle("hide");
  }

  gameData.cookieClosed = true;
  window.localStorage.setItem("gameData", JSON.stringify(gameData));
};

// Checking for keyPress to start timer
let startTimer;
document.addEventListener("keydown", event => {
  if (event.keyCode === 39 || event.keyCode === 32 || event.keyCode === 37) {
    startTimer = true;
  }
});

// Time Counter
let seconds = gameData.timeLapsed;
let timeCounter = setInterval(() => {
  if (startTimer && timerToggle) {
    ++seconds;
  }

  if (timerToggle) {
    if (seconds >= 60) {
      let minutes = Math.floor(seconds / 60);
      timerText.setText(`${minutes}m ${seconds % 60}s`);
    } else {
      timerText.setText(`${seconds % 60}s`);
    }
  }

  gameData.timeLapsed = seconds;
  window.localStorage.setItem("gameData", JSON.stringify(gameData));
  // Stoping Timmer
  if (completedGame || gameOver) {
    clearInterval(timeCounter);
  }
}, 500);
