// Enemies with random speed and random start line.
let score = 0,
    starsNum = 0,
    redraw,
    startTime,
    timer,
    allGems = [],
    allChar = [];

// Create game status
var game = {
        status: 'inactive',
        reasonArray: ['You are eaten by a cockroach', 'Time Up'],
        character: 'cat-girl',
        endTime: 30,
        get lostReason0() {
            document.querySelector('#reason').textContent = game.reasonArray[0];
        },
        get lostReason1() {
            document.querySelector('#reason').textContent = game.reasonArray[1];
        }
    };

var Enemy = function(row) {
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.speedArray = [160, 260, 320];
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
    this.sprite = `images/char-${game.character}.png`;
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

// Player is 60px wide, enemy is 100px wide
Player.prototype.update = function(dt) {
    const collide = function collide(enemy){
        if(enemy.x > this.x - 80 && enemy.x < this.x + 80) {
            console.log('this is player and I failed');    /*revised needed*/
            game.lostReason0;
            openLostModal();
          }
        };

    const collect = function collect(gem) {
        if (gem.row === this.row && gem.col === this.col) {
            console.log('GEMgemgem');
            gem.row = 99;
            gem.col = 99;
            gem.x = 999;
            gem.y = 999;
            if (gem.color == 'Green') {
                score += 60;
            } else if (gem.color == 'Blue') {
                score += 80;
            } else if (gem.color == 'Orange') {
                score += 100;
            }
        }
    };

    if (this.row >=1 && this.row < 4) {
        for (let gem of allGems) {
            collect.call(this, gem);
        };
        for (let enemy of allEnemies) {
            if (enemy.row === this.row) {
                collide.call(this, enemy);
            }
        }
    };

    if (this.row === 0) {
        openWinModal();
    }
};

Player.prototype.handleInput = function(direct) {
    if (game.status !== 'active') {
        return;
    };
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

// draw a score panel to show the performance
const scorePanel = {};

scorePanel.render = function(){
    var now = Date.now();
    timer = 30 - Math.floor((now - startTime)/1000);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0,620,505,135);
    ctx.font = "30pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "SeaGreen";
    ctx.fillText(`Time Left:         sec`, 505/2, 665);
    ctx.fillText(`${game.status == 'active'? timer : game.endTime}`, 304, 665);
    ctx.fillStyle = "Teal";
    ctx.fillText(`Score: ${score?score: 0}`, 100, 725);
    ctx.fillText(`Stars:  `, 260, 725);
    ctx.strokeStyle = "Black";
    ctx.lineWidth = 2;
    ctx.strokeText(`Time Left:         sec`, 505/2, 665);
    ctx.strokeText(`${game.status == 'active'? timer : game.endTime}`, 304, 665);

// if time up, end the game
    if (timer == 0 && game.status == 'active') {
        game.lostReason1;
        openLostModal();
    };

// draw the stars according to the score
    ctx.save();
    ctx.scale(0.6,0.6);
    if (score > 100 && score < 200 ) {
        ctx.drawImage(Resources.get('images/Star.png'), 510, 1080);
        starsNum = 1;
    } else if (score > 199 && score < 278) {
        ctx.drawImage(Resources.get('images/Star.png'), 510, 1080);
        ctx.drawImage(Resources.get('images/Star.png'), 610, 1080);
        starsNum = 2;
    } else if (score > 279) {
        ctx.drawImage(Resources.get('images/Star.png'), 510, 1080);
        ctx.drawImage(Resources.get('images/Star.png'), 610, 1080);
        ctx.drawImage(Resources.get('images/Star.png'), 720, 1080);
        starsNum = 3;
    }
    ctx.restore();
};
