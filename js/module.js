// module to start the game
const startButton = document.querySelector('#start');
let startTime;
startButton.addEventListener('click',function(){
    let frontPage = document.querySelector('#frontPage');
    frontPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    createEnemy();
    startTime = Date.now();
    game.status = 'active';
    redraw = requestAnimationFrame(drawResult);
});

let lostPage = document.querySelector('#lostPage');

let lost = function(){
    lostPage.style.cssText = 'transform: translate(-50%, -50%)';
    cancelAnimationFrame(redraw);
    deleteEnemy();
};

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click',function(){
    let frontPage = document.querySelector('#frontPage');
    frontPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    createEnemy();
    startTime = Date.now();
    game.status = 'active';
    redraw = requestAnimationFrame(drawResult);
    lostPage.style.cssText = 'transform: translate(-9999px, -9999px)';
});
