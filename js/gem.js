
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


let Gem = function() {

};

// create an array with 5 random gems.
Gem.prototype.getColor = function() {
    this.color = (function(){
        const gems = ['blue','green','orange'];
        shuffle(gems);
        return gems[0];
    // shuffle(gems).splice(5,1);
    // return gems;
    })();
    if (this.color == 'blue'){
        this.sprite = 'images/Gem Blue.png';
    } else if (this.color == 'green') {
        this.sprite = 'images/Gem Green.png';
    } else if(this.color == 'orange') {
        this.sprite = 'images/Gem Orange.png';
    };
};
// create an array with 5 random positions. Each position is stored in an array [row, col]
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

Gem.prototype.test = function(){
    this.test = 'hi';
};

Gem.prototype.render = function() {
    ctx.save();
    ctx.scale(0.8,0.6);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
}

let gem = new Gem();
gem.getColor();
gem.getPosition();
// const createGems = function(time) {
    // if (time === 27) {
        // allGems.push();
    // };

// };
