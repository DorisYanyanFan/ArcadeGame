
// Create a score panel
var canvasScore = document.createElement('canvas'),
    ctxScore = canvasScore.getContext('2d');

canvasScore.width = 505;
canvasScore.height = 140;


const drawPanel = function(){
    var now = Date.now();
    timer = 30 - Math.floor((now - startTime)/1000);
    ctxScore.clearRect(0,0,505,140);
    ctxScore.fillStyle = 'lightblue';
    ctxScore.fillRect(0,0,505,140);
    ctxScore.font = "30pt Impact";
    ctxScore.textAlign = "center";
    ctxScore.fillStyle = "SeaGreen";
    ctxScore.fillText(`Time Left: ${timer?timer:30} sec`, canvasScore.width/2, 40);
    ctxScore.fillStyle = "Black";
    ctxScore.fillText(`Score: ${score?score: 0}  Stars:           `, canvasScore.width/2, 90);
    ctxScore.strokeStyle = "Black";
    ctxScore.lineWidth = 2;
    ctxScore.strokeText(`Time Left: ${timer?timer:30} sec`, canvasScore.width/2, 40);
};

drawPanel();

const drawResult = function () {
    drawPanel();
    redraw = requestAnimationFrame(drawResult);
       if (timer == 0) {
            game.status = 'lost';
            game.lostReason1;
            lost();
           };
};

let Star = function (){};

Star.prototype.render = function() {
    ctxScore.drawImage(Resources.get('images/Star.png'), 400, -300);
};

let star = new Star();



// append the score panel to the document. I append the score panel in this file to makesure the score panel is following the main canvas generated in engine.js.
document.body.appendChild(canvasScore);



//Select the player
const selector = document.querySelector('#selector'),
    ctxSelector = selector.getContext('2d');

selector.width = 580;
selector.height = 200;

const Char = function (col) {
        this.x = 66 + (col - 1) * 180;
        this.y = -30;
        this.spriteArray = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png'
        ];
        this.sprite = this.spriteArray[col-1];
};

Char.prototype.render = function (){
    ctxSelector.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let panel = {
    col: 2,
    x: 246,
    y:-30,
    sprite:'images/Selector.png',
    render: function(){
        ctxSelector.clearRect(0,0,580,200);
        ctxSelector.drawImage(Resources.get(panel.sprite), panel.x, panel.y)
    }
};

allChar = [panel, new Char(1), new Char(2), new Char(3)];

panel.handleInput = function(direct) {
    if (game.status !== 'inactive') {
        return;
    };
    switch(direct) {
        case 'left':
            if (panel.col >1) {
                panel.col -= 1;
                panel.x = 66 + (panel.col - 1) * 180;
            };
            break;
        case 'right':
            if (panel.col < 3) {
                panel.col += 1;
                panel.x = 66 + (panel.col - 1) * 180;
            }
            break;
    };
    switch (panel.col) {
        case 1:
            game.character = 'boy';
            break;
        case 2:
            game.character = 'cat-girl';
            break;
        case 3:
            game.character = 'horn-girl';
            break;
    }
};


// module to start the game
const startButton = document.querySelector('#start');
const frontPage = document.querySelector('#frontPage');

const initGame = function(){
  createEnemy();
  createPlayer();
  score = 0;
  startTime = Date.now();
  game.status = 'active';
  redraw = requestAnimationFrame(drawResult);
  drawGems();
};

const clearFrontPage = function() {
    frontPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    selector.clearRect(0,0,580,200);
};

startButton.addEventListener('click', function(){
    initGame();
    clearFrontPage();
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        39: 'right'
    };
    panel.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(event) {
    if (event.keyCode === 13){
        switch (game.status) {
            case 'inactive':
                initGame();
                clearFrontPage();
                break;
            case 'lost':
                initGame();
                lostPage.style.cssText = 'transform: translate(-9999px, -9999px)';
                break;
            case 'win':
                initGame();
                winPage.style.cssText = 'transform: translate(-9999px, -9999px)';
                break;
        }
    }
});

// if the game is lost
const lostPage = document.querySelector('#lostPage');

const lost = function(){
    lostPage.style.cssText = 'transform: translate(-50%, 0)';
    cancelAnimationFrame(redraw);
    deleteEnemy();
    clearGems();
    player.goBack()
};

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click',function(){
    initGame();
    lostPage.style.cssText = 'transform: translate(-9999px, -9999px)';
});


// if the game is win
const winPage = document.querySelector('#winPage');

const win = function(){
    winPage.style.cssText = 'transform: translate(-50%, 0)';
    cancelAnimationFrame(redraw);
    deleteEnemy();
    clearGems();
    player.goBack()
};

const restartWinButton = document.querySelector('#restartWin');
restartWinButton.addEventListener('click',function(){
    initGame();
    winPage.style.cssText = 'transform: translate(-9999px, -9999px)';
});
