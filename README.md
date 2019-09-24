# Arcade Game Project

## Table of Contents

- [How to Run and Play](#how)
- [Game Rules](#rules)
- [Functions](#functions)
- [Files](#files)
- [Contributing](#Contributing)

## <a name ='how'>How to Run and Play</a>
Download the folder and open the index.html, the game will be loaded.

This is a keyboard game. At the front page, use arrow keys *left* and *right* to select the player. To start the game, press *enter*, or click start button. During the game, use keys *up*, *down*, *left*, *right* to move player. Players are allowed to stay on the road or on the grass during the game.
After the game, press key *enter*, or click play again button to restart the game.


## <a name ='rules'></a>Game Rules
To win this game, you need to cross the road and reach the water within 30 seconds. During the game, you can collect gems randomly dropped on the road, more gems collected, higher scores will be rewarded.  

In either these cases, you will lose this game:
1. Come across a cockroach.
2. Haven't reach the water side within 30 seconds.

The score and star will be evaluated according to the gems collected. Green gem worth 60 points, blue gem worth 80 points, orange worth 100 points. For stars rewarded, specifically,
* 1 Star: 100 points or more;
* 2 Star: 200 points or more;
* 3 star: 280 points or more.

## <a name ='functions'></a>Added functions
1. Score Panel
    A score panel will show up once page loaded. A count down timer will appear on the score panel.
2. Gems
    Gems will appear at random place, and will disappear after certain time. Totally 5 gems will appear in each game.
3. Player selector
    At the front page, players can select character through keys.

## Files
1. modals.jss added
    * 1.1 Font page modal: canvas and button in front page; and the function to start game.
    * 1.2 Lost page modal: button to restart the game, and relevant function.
    * 1.3 Win page modal: canvas to draw stars in the winning page, button to restart game and relevant functions.
2. gem.jss added
    * This file is about Gem constructor, and related functions.
3. app.jss modified
    * 3.1 Enemy object and Play Object updated;
    * 3.2 Game object created to track game status and store useful information.
    * 3.3 ScorePane.render function declared. Draw the score panel, also the stars on the winning page.
4. html and css is updated accordingly.
5. enjine.jss is revised to let score panel show up; loaded more png required in the added functions.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.
