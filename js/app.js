// Enemies our player must avoid
var Enemy = function(row, speed, startLine) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startLine;
    this.y = (83 * row) - 20;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 800) {
        this.x = this.x + dt * this.speed;   /*this.x = dt * this.speed would end up with wiered animation, why?*/
    } else {
        this.x = -101;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 322;
    this.row = 4;
    this.col = 3;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player is 60px wide, enemy is 100px wide
Player.prototype.update = function(dt) {
    if (this.row >=1 && this.row < 4) {
        let playerPosition = this.x;
        const collide = function collide(enemy){
            if(enemy.x > playerPosition - 80 && enemy.x < playerPosition + 80) {
                console.log('this is player and I failed');    /*revised needed*/
                game.status = 'lost';
                this.x = 202;
                this.y = 322;
                this.row = 4;
                this.col = 3;

            }
        };
        for (let enemy of enemyArray[this.row-1]) {
            collide.call(this, enemy);
        }
    }
};

Player.prototype.handleInput = function(direct) {
    switch(direct) {
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
                this.row -= 1;
            };
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 83;
                this.row += 1;
            };
            break;
        case 'left':
            if (this.x > 100) {
              this.x -= 101;
              this.col -= 1;
            };
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 101;
                this.col += 1;
            };
            break;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemyArray = [[],[],[]];
let allEnemies = [];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const createEnemy = function(){
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          positionArray = [-101, -300, -800, -1000];
          speedArray = [200, 300, 400];
          position = shuffle(positionArray)[0];
          speed = shuffle(speedArray)[0];
          enemyArray[i][j] = new Enemy(i+1, speed, position);
          allEnemies.push(enemyArray[i][j]);
      }
  }
};

// function to delete all existing enemies
const deleteEnemy = function(){
    enemyArray = [[],[],[]];
    allEnemies = [];
};


const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Create game status

var game = {
    status: "inactive",
};


//EventListern StartGame
 // createEnemy();
 // window.requestAnimationFrame(drawResult);

// Create a score panel
var canvasScore = document.createElement('canvas'),
    ctxScore = canvasScore.getContext('2d');

canvasScore.width = 505;
canvasScore.height = 140;
document.body.appendChild(canvasScore);

let redraw = '';

const drawResult = function () {
    var now = Date.now();
    let timer = 30 - Math.floor((now - startTime)/1000);
    ctx.clearRect(0,0,505,140);
    ctxScore.fillStyle = 'lightblue';
    ctxScore.fillRect(0,0,505,140);
    ctxScore.font = "30pt Impact";
    ctxScore.textAlign = "center";
    ctxScore.fillStyle = "white";
    ctxScore.fillText(`Time Left: ${timer} sec`, canvasScore.width/2, 40);

    ctxScore.strokeStyle = "black";
    ctxScore.lineWidth = 3;
    ctxScore.strokeText(`Time Left: ${timer} sec`, canvasScore.width/2, 40);
    redraw = requestAnimationFrame(drawResult);
};

redraw = requestAnimationFrame(drawResult);
// cancelAnimationFrame(redraw);
