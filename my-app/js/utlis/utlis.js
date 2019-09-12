//    **    //
 // Utilities // 
//    **   //

// Random X Between Width Of My Game
function randX () {
    let randX = Math.floor(Math.random() * game.config.width);
    console.log('Game width::', game.config.width)
    console.log('X::', randX);
    return randX;
}

// Random Y Between Height Of My Game
function randY () {
    let randY = Math.floor(Math.random() * game.config.height);
    console.log('Game height::', game.config.height)
    console.log('Y::', randY);
    return randY;
}

function checkX(object) {
    console.log('Objects X::', object.children.entries[0].width)
}

function checkY(object) {
    console.log(object.children.entries[0].width)
}