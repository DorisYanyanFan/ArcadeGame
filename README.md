# Arcade Game Project

## Table of Contents

- [How to Run](#how)
- [Game Rules](#rules)
- [Functions](#functions)
- [Files](#files)
- [Contributing]

## <a name ='how'>How to Run and Play</a>

Download the folder and open the index.html, then the game will be loaded.
At the front page, use arrow keys *left* and *right* to select the player. To start the game, press *enter*, or use mouse and click start button.
During the game, use keys *up*, *down*, *left*, *right* to move player.
After the game, press key *enter*, or click play again button to restart the game.


## <a name ='rules'></a>Game Rules

To win this game, you need to cross the street and reach the sea within 30 seconds. Also you can collect gems on the road, more gems collected, higher scores will be rewarded.  

In either these cases, you will lose this game:
1. Come across a cockroach.
2. Haven't reach the sea shore within 30 seconds.

The performance will be evaluated according to the gems collected. Green gems will be rewarded

## [Functions](functions)
1. Collide with cockroach.
    In this game, the player is 60px wide while enemy is 100px wide. As long as the image of player is overlapping with that of an enemy, it will be considered that player collide with an enemy, and the game is lost.
2. Scoring and Star
    Scores is calculated based on the gems collected. Each gem worth 60 points. Specifically,
    * 1 Star: 120 points or more;
    * 2 Star: 200 points or more;
    * 3 star: 300 points or more.
3. Score Panel
    A score panel will show up once game started. A timer count down will appear on the score panel.
    * Notes: To draw the score panel, canvas size has been revised in the engine.file. Code for score panel is in app.js
4. Gems
    Gems will appear at random place. Totally 5 gems will appear in each game. The first gem will appear at 3 secs after the game started, that one gem appear every 6 seconds.

## [Files](files)
1. Module.jss is added in the file. This file contains the the modals of front page and win/lose page; and functions about win or loose.
2. gem.jss is added in the file. This file is about Gem constructor, and
3. app.jss is updated
4. html and css is updated to show the module and its effect.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.
