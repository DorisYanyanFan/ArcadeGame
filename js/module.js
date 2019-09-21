// module to start the game
const startButton = document.querySelector('#start');
let startTime;
startButton.addEventListener('click',function(){
    let frontPage = document.querySelector('#frontPage');
    frontPage.style.cssText = 'transform: translate(-9999px, -9999px)';
    createEnemy();
    startTime = Date.now();
    game.status = 'active';
});

// if (game.status == "lose"){
    // deleteEnemy();
// }

// let lost = new Promise(function(resolve){
    // if (game.status == 'lost') {
        // resolve('noooooooo');
    // }
// });
// lost.then = (function(value){
    // console.log(value);
// });

let canvas = document.querySelectorAll('canvas');
