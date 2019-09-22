// Enemies with random speed and random start line.
var Enemy = function(row) {
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.speedArray = [200, 260, 300];
    this.speed = shuffle(this.speedArray)[0];
    this.startLineArray = [-101, -300, -800, -1000];
    this.x = shuffle(this.startLineArray)[0];
    this.y = (83 * row) - 20;
};


// Update enemy postion. When an enemy reaches end of the road, reshuffle its speed and startline.
Enemy.prototype.update = function(dt) {
    if (this.x < 800) {
        this.x = this.x + dt * this.speed;   /*this.x = dt * this.speed would end up with wiered animation, why?*/
    } else {
        this.x = shuffle(this.startLineArray)[0];
        this.speed = shuffle(this.speedArray)[0];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player constructor
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

Player.prototype.goBack = function() {
    this.x = 202;
    this.y = 322;
    this.row = 4;
    this.col = 3;
};

// Player is 50px wide, enemy is 100px wide
Player.prototype.update = function(dt) {
    const collide = function collide(enemy){
        if(enemy.x > this.x - 80 && enemy.x < this.x + 80) {
            console.log('this is player and I failed');    /*revised needed*/
            game.status = 'lost';
            this.goBack();
            lost();
          }
        };

    if (this.row >=1 && this.row < 4) {
        for (let enemy of allEnemies) {
            if (enemy.row === this.row) {
                collide.call(this, enemy);
            }
        }
    };
    if (this.row === 0) {
        win();
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

// function createEnemy will create 9 enemies when called; 3 in each road. Each enemy's speed and start line will be randomly chosed.
// function shuffle is declared at gem.js

let allEnemies = [];

const createEnemy = function(){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j<3; j++) {
            let enemy= new Enemy(i+1);
            allEnemies.push(enemy);
        }
    }
};

// function to delete all existing enemies
const deleteEnemy = function(){
    allEnemies = [];
};


let player = new Player();

const createPlayer = function(){
    player = new Player();
};
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


let redraw,
    timer = 30;

const drawResult = function () {
    var now = Date.now();
    timer = 30 - Math.floor((now - startTime)/1000);
    ctxScore.clearRect(0,0,505,140);
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
       if (timer == 0) {
               lost();
           };
};
