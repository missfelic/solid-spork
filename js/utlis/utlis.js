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
  for (let i = 0; i < cookiesContainer.length; i++) {
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
seconds = gameData.timeLapsed;
let timeCounter = setInterval(() => {
  if (startTimer && timerToggle) {
    ++seconds;
  }

  if (timerToggle && !gameOver) {
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

// TODO:
// Mobile Controls
// if (hasTapped || hasSwiped) {
//   startTimer = true;
// }
// // Mobile Controls
// const myCanvas = document.getElementById("phaserCanvas");
// const newHammer = new Hammer.Manager(myCanvas);
// const onTap = new Hammer.Tap({
//   event: "tap",
//   taps: 1
// });
// const onSwipe = new Hammer.Swipe({
//   event: "swipe",
//   pointers: 1,
//   threshold: 10
// });
// newHammer.add(onTap);
// newHammer.add(onSwipe);
// // on Tap
// newHammer.on("tap", e => {
//   hasTapped = true;
//   if (this.pinkMonster.body.touching.down) {
//     this.pinkMonster.setVelocityY(-500);
//     this.sfx.jumpSound.play();
//   }
// });
// // on Swipe
// newHammer.on("swipeleft", () => {
//   hasSwiped = true;
//   this.pinkMonster.setVelocityX(-120);
//   this.pinkMonster.anims.play("idle", true);
//   this.pinkMonster.flipX = true;
// });
// newHammer.on("swiperight", () => {
//   hasSwiped = true;
//   this.pinkMonster.setVelocityX(120);
//   this.pinkMonster.anims.play("idle", true);
//   this.pinkMonster.flipX = false;
// });
