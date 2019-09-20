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

Player.prototype.update = function(dt) {
    if (this.row >=1 && this.row < 4) {
        let playerPosition = this.x;
        const collide = function collide(enemy){
            if(enemy.x > playerPosition - 90 && enemy.x < playerPosition + 80) {
                console.log('this is player and I failed');    /*revised needed*/
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

const enemyArray = [[],[],[]];
const allEnemies = [];

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
