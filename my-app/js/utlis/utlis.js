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
