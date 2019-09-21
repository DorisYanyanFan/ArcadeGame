// create an array allGems containing 6 gems in randomly order. the first 5 gems will appear in the game.
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

const useGems = [
    'images/Gem Blue.png',
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',
    'images/Gem Orange.png'
];

const allGems = shuffle(useGems)[0];


let Gem = function(color, position) {
    this.color = color;
    this.x = 101;
    this.y = 83;
    this.sprite = 'images/Gem Blue.png';
};

Gem.prototype.render = function() {
    ctx.save();
    ctx.scale(0.8,0.6);
    ctx.drawImage(Resources.get(this.sprite), 516, 457);
    ctx.restore();
}

let gem = new Gem('blue', 'init');

const createGems = function(time) {
    if (time === 27) {
        allGems.push();
    };

};
