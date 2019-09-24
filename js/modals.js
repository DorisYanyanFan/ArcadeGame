
// This part is about the front page modal.

// Draw a canvas that allow to select player
const selector = document.querySelector('#selector'),
    ctxSelector = selector.getContext('2d');

selector.width = 580;
selector.height = 200;

// Char constructor. set characters availale to choose
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

//panel is the selector png. it can move left and right to show which character is currently select.
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

// First ceate the character instances and put them together with panel in an array allChar[]
//allChar[] is declared at app.js.  enjine.js will draw all objects in allChar[] through render method
allChar = [panel, new Char(1), new Char(2), new Char(3)];


// function to allow player move panel left and right to choose character.
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


// modals in the front page
const startButton = document.querySelector('#start');
    startButton.focus();
    startButton.tabIndex = 0;
const frontPage = document.querySelector('#frontPage');

// function to intialize a game. will be called when start a game or restart a game.
const initGame = function(){
  createEnemy();
  createPlayer();
  score = 0;
  starsNum = 0;
  startTime = Date.now();
  game.status = 'active';
  drawGems();
};

// function to let front page modal go away. disable all buttons to avoid tab focus.
const clearFrontPage = function() {
    frontPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    ctxSelector.clearRect(0,0,580,200);
    startButton.tabIndex = -1;
    restartButton.tabIndex = -1;
    restartWinButton.tabIndex = -1;
    startButton.blur();
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


// This is about the lost modal
const lostPage = document.querySelector('#lostPage');
const restartButton = document.querySelector('#restart');

// when game is lost, open Lost Modal. Enable restart button and let it get focus in lostModal.
const openLostModal = function(){
    lostPage.style.cssText = 'transform: translate(-50%, 0)';
    deleteEnemy();
    clearGems();
    player.goBack();
    game.status = 'lost';
    game.endTime = timer;
    start.tabIndex = -1;
    restartButton.tabIndex = 0;
    restartButton.focus();
    restartWinButton.tabIndex = -1;
};

// when restart a game, let lost modal go away, disable buttons to avoid tab focus.
const closeLostModal = function(){
    lostPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    start.tabIndex = -1;
    restartButton.tabIndex = -1;
    restartWinButton.tabIndex = -1;
    restartButton.blur()
};

restartButton.addEventListener('click',function(){
    initGame();
    closeLostModal();
});


// This is about the win modal and its button funciton
const winPage = document.querySelector('#winPage');
const restartWinButton = document.querySelector('#restartWin');

// Prepare the canvas to draw stars on the winning page
const winStar = document.querySelector('#winstar'),
    ctxStar = winStar.getContext('2d');

winStar.width = 580;
winStar.height = 200;

// when game is win ,open win page modal (the stars has already drawed by score panel); enable restartWinButton and let it get focus
const openWinModal = function(){
    winPage.style.cssText = 'transform: translate(-50%, 0)';
    deleteEnemy();
    clearGems();
    player.goBack();
    game.status = 'win';
    game.endTime = timer;
    start.tabIndex = -1;
    restartButton.tabIndex = -1;
    restartWinButton.tabIndex = 0;
    restartWinButton.focus();
};

// restart game. close win modal, disable all buttons to aovid tab focus
const closeWinModal = function(){
    winPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    start.tabIndex = -1;
    restartButton.tabIndex = -1;
    restartWinButton.tabIndex = -1;
    restartWinButton.blur()
};

restartWinButton.addEventListener('click',function(){
    initGame();
    closeWinModal();
});

// This is the function when 'enter' is pressed.
document.addEventListener('keyup', function(event) {
    if (event.keyCode === 13){
        switch (game.status) {
            case 'inactive':
                initGame();
                clearFrontPage();
                break;
            case 'lost':
                initGame();
                closeLostModal();
                break;
            case 'win':
                initGame();
                closeWinModal();
                break;
        }
    }
});
