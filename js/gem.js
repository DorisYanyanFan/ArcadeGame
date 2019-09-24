//function shuffle. this function will be called to choose a random value in an array.
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

//Gem constructor. Set gem's color randomly through shuffling a color array. Then according to gems' color, set image resource.
let Gem = function() {
    this.row = 99;
    this.col = 99;
    this.colorArray = ['Blue','Green','Orange'];
    this.color = shuffle(this.colorArray)[0];
    this.sprite = `images/Gem ${this.color}.png`;
    // Select a random position by shuflling all the avaiable positions, and select the first postion as gem's position. The gem position is stored in positionArray[0].
    // Set this.x; this.y according to the gem postion.
    this.positionArray = (function(){
        let positionArray = [];
        for (let i = 0; i <3; i++) {
            for (let j=0; j<5; j++) {
                 positionArray.push([i,j]);
            }
        };
        return shuffle(positionArray);
    })();
    this.row = this.positionArray[0][0] + 1;
    this.col = this.positionArray[0][1] + 1;
    this.x = 14 + 125 * this.positionArray[0][1];
    this.y = 176 + 140 * this.positionArray[0][0];
};


// Scale the gem picture to make it smaller.
Gem.prototype.render = function() {
    ctx.save();
    ctx.scale(0.8,0.6);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
}

// Foucntion to create 5 gems will be used in the game. This function will be called when game started.
// First instantiate 5 gem with random color and random places, store them in an array called fiveGems.
const drawGems = function() {
    const fiveGems = [];
    for(let i=0; i<5; i++) {
        let gem = new Gem();
        //Make sure nearest two gems doesn't show up in the same position.
        if (i>0 && gem.row === fiveGems[i-1].row && gem.col === fiveGems[i-1].col) {
            i = i-1;
            continue;
        };
        fiveGems.push(gem);
    };
// gem in allGems[] will be drawed on canvas through engine.js. Push/delete each gem into allGems[] at certain time.
// fiveGems[0] appear in 2 seconds when the game started, dispear at 10 seconds after the game started.
// fiveGems[1] appear in 7 seconds when the game started, dispear at 14 seconds after the game started.
// fiveGems[2] appear in 12 seconds when the game started, dispear at 20 seconds after the game started.
// fiveGems[3] appear in 17 seconds when the game started, dispear at 29 seconds after the game started.
// fiveGems[4] appear in 24 seconds when the game started, dispear at 30 seconds after the game started.
    timeout28 = window.setTimeout(function(){allGems.push(fiveGems[0])}, 2000);
    timeout23 = window.setTimeout(function(){allGems.push(fiveGems[1])}, 7000);
    timeout20 = window.setTimeout(function(){allGems.splice(0,1)}, 10000);
    timeout18 = window.setTimeout(function(){allGems.push(fiveGems[2])}, 12000);
    timeout16 = window.setTimeout(function(){allGems.splice(0,1)}, 14000);
    timeout13 = window.setTimeout(function(){allGems.push(fiveGems[3])}, 17000);
    timeout10 = window.setTimeout(function(){allGems.splice(0,1)}, 20000);
    timeout6 = window.setTimeout(function(){allGems.push(fiveGems[4])}, 24000);
    timeout1 = window.setTimeout(function(){allGems.splice(0,1)}, 29000);
    timeout0 = window.setTimeout(function(){allGems.splice(0,1)}, 30000);
};


// function to stop draw gems on canvas. clear all gems and timeout ID in this game. This function will be called when one game is ended.
const clearGems = function() {
    allGems = [];
    clearTimeout(timeout28);
    clearTimeout(timeout23);
    clearTimeout(timeout20);
    clearTimeout(timeout18);
    clearTimeout(timeout16);
    clearTimeout(timeout13);
    clearTimeout(timeout10);
    clearTimeout(timeout6);
    clearTimeout(timeout1);
    clearTimeout(timeout0)
}
