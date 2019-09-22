# Arcade Game Project

## Table of Contents

- [How to Run]
- [Game Rules]
- [Functions]
- [Files]
- [Contributing]

## How to Run

Open the index.html and the game will be loaded. In the front page, use arrow keys or mouse to select the player you like and then click start. Use keys to move player.

## Game Rules

At the front page, select player and then start the game. To win this game, you need to cross the street within 30 seconds and collect gems. More gems collected, higher scores will be rewarded.  

In either these cases, you will lose this game:
1. Come across a cockroach.
2. Haven't across the street within 30 seconds.

The performance will be evaluated according to the gems collected. Green gems will be rewarded

## [Functions]
1. Collide with cockroach.
    In this game, the player is 60px wide while enemy is 100px wide. As long as the image of player is overlapping with that of an enemy, it will be considered that player collide with an enemy, and the game is lost.
2. Scoring and Star
    Scores is calculated based on the gems collected. Each gem worth 60 points. Specifically,
    * 1 Star: 100 points or more;
    * 2 Star: 160 points or more;
    * 3 star: 200 points or more.
3. Score Panel
    A score panel will show up once game started. A timer count down will appear on the score panel.
4. Gems
    Gems will appear at random place. The first gem will appear at 3 secs after the game started, that one gem appear every 6 seconds.
    To fullfills this funciton, engine.js is updated

## Files
1. Module.jss is added in the file.
2. gem.jss is added in the file
3. app.jss is updated
4. html and css is updated to show the module and its effect.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.
