//    **    //
// Utilities //
//    **   //

// Random X Between Width Of My Game
function randomX() {
  let randomX = Math.floor(Math.random() * (250 - 100) + 100);
  return randomX;
}

// Random Y Between Height Of My Game
function randomY() {
  let randomY = Math.floor(Math.random() * (700 - 100) + 100);
  return randomY;
}

// Save Score In Local Storage
function coinScore() {
  score += 8;
  scoreText.setText("Score: " + score);
  gameData.score = score;
  window.localStorage.setItem("gameData", JSON.stringify(gameData));
}

function closeCookie() {
  const cookiesContainer = document.getElementsByClassName("cookiesContainer");

  // Loop through cookieContainer adding class 'hide' to each element
  for (var i = 0; i < cookiesContainer.length; i++) {
    cookiesContainer[i].classList.toggle("hide");
  }

  gameData.cookieClosed = true;
  window.localStorage.setItem("gameData", JSON.stringify(gameData));
}
