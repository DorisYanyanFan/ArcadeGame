
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


let Gem = function() {};

// Set gem's color randomly through shuffling a color array. Then according to gems' color, set image resource.
Gem.prototype.getColor = function() {
    this.color = (function(){
        const gems = ['blue','green','orange'];
        shuffle(gems);
        return gems[0];
    })();
    if (this.color == 'blue'){
        this.sprite = 'images/Gem Blue.png';
    } else if (this.color == 'green') {
        this.sprite = 'images/Gem Green.png';
    } else if(this.color == 'orange') {
        this.sprite = 'images/Gem Orange.png';
    };
};

// Select a random position on the road, the selected position is stored in an array [col, row].
// Set the position according to the seleced postion.
Gem.prototype.getPosition = function(){
    const position = (function(){
        let positionArray = [];
        for (let i = 0; i <3; i++) {
            for (let j=0; j<5; j++) {
                 positionArray.push([i,j]);
            }
        };
        shuffle(positionArray);
        return positionArray[0];
    })();
    this.x = 14 + 125 * position[1];
    this.y = 176 + 140 * position[0];
};

// Scale the gem picture to make it smaller.
Gem.prototype.render = function() {
    ctx.save();
    ctx.scale(0.8,0.6);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
}


// create 5 gems with random color and random places, store them in an array called fiveGems.
const fiveGems = [];
for(let i=0; i<5; i++) {
    (function(){ //
        let gem = new Gem();
        gem.getColor();
        gem.getPosition();
        fiveGems.push(gem);
    })();
}

let allGems = [];

const drawGems = function() {
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
