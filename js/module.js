// module to start the game
const startButton = document.querySelector('#start');


const startGame = function(){
  let frontPage = document.querySelector('#frontPage');
  frontPage.style.cssText = 'transform: translate(-9999px, -9999px)';
  createEnemy();
  createPlayer();
  startTime = Date.now();
  game.status = 'active';
  redraw = requestAnimationFrame(drawResult);
  drawGems();
};

startButton.addEventListener('click', startGame);

// if the game is lost
const lostPage = document.querySelector('#lostPage');

const lost = function(){
    lostPage.style.cssText = 'transform: translate(-50%, -50%)';
    cancelAnimationFrame(redraw);
    deleteEnemy();
    clearGems();
    player.goBack()
};

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click',function(){
    startGame();
    lostPage.style.cssText = 'transform: translate(-9999px, -9999px)';
});


// if the game is win
const winPage = document.querySelector('#winPage');

const win = function(){
    winPage.style.cssText = 'transform: translate(-50%, -50%)';
    cancelAnimationFrame(redraw);
    deleteEnemy();
    clearGems();
    player.goBack()
};

const restartWinButton = document.querySelector('#restartWin');
restartWinButton.addEventListener('click',function(){
    startGame();
    winPage.style.cssText = 'transform: translate(-9999px, -9999px)';
});
