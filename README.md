# Arcade Game Project

## Table of Contents

- [How to Run and Play](#how)
- [Game Rules](#rules)
- [Functions](#functions)
- [Files](#files)
- [Contributing](#Contributing)

## <a name ='how'>How to Run and Play</a>
Download the folder and open the index.html, then the game will be loaded.

This is a keyboard game. At the front page, use arrow keys *left* and *right* to select the player. To start the game, press *enter*, or click start button. During the game, use keys *up*, *down*, *left*, *right* to move player. Players are allowed to stay on the street or on the grass during the game.
After the game, press key *enter*, or click play again button to restart the game.


## <a name ='rules'></a>Game Rules
To win this game, you need to cross the street and reach the sea within 30 seconds. Also you can collect gems on the road, more gems collected, higher scores will be rewarded. During these 30 seconds, you can stay on the street or go back to grass to take a rest.  

In either these cases, you will lose this game:
1. Come across a cockroach.
2. Haven't reach the sea shore within 30 seconds.

The performance will be evaluated according to the gems collected. Green gems will be rewarded

## Functions
1. Collide with cockroach.
    In this game, the player is 60px wide while enemy is 100px wide. As long as the image of player is overlapping with that of an enemy, it will be considered that player collide with an enemy, and the game is lost.
2. Scoring and Star
    Scores is calculated based on the gems collected. Green gem worth 60 points, blue gem worth 80 points, orange worth 100 points. Specifically,
    * 1 Star: 100 points or more;
    * 2 Star: 200 points or more;
    * 3 star: 280 points or more.
3. Score Panel
    A score panel will show up once game started. A timer count down will appear on the score panel.
    * Notes: To draw the score panel, canvas size has been revised in the engine.file. Code for score panel is in app.js
4. Gems
    Gems will appear at random place. Totally 5 gems will appear in each game. The first gem will appear at 3 secs after the game started, that one gem appear every 6 seconds.

## Files
1. modals.jss added
    * 1.1 Font page modal: canvas and button in front page; and the function to start game.
    * 1.2 Lost page modal: button to restart the game, and relevant function.
    * 1.3 Win page modal: canvas in the winning page, button to restart game and relevant functions.
2. gem.jss added
    * This file is about Gem constructor, and related functions.
3. app.jss modified
    * 3.1 Enemy object and Play Object updated;
    * 3.2 Game object created to track game status and store useful information.
    * 3.3 ScorePane.render function declared. Draw the score panel, also the stars on the winning page.
4. html and css is updated accordingly.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.
