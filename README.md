# DotGame

Implementation of the DotGame game engine to be used with a front-end client.

#### The Game
A connect-the-dots game for two players.

##### Definitions
octilinear line - a horizontal, vertical, or 45° diagonal line

##### Rules
* The game is played on a 4x4 grid of 16 nodes.
* Players take turns drawing octilinear lines connecting nodes.
* Each line must begin at the start or end of the existing path, so that all lines form a continuous path.
* The first line may begin on any node.
* A line may connect any number of nodes.
* Lines may not intersect.
* No node can be visited twice.
* The game ends when no valid lines can be drawn.
* The player who draws the last line is the loser.


##### Attribution
Game designed by Sid Sackson.

---

## Play the game

https://chrisorlandodev.github.io/dot-game/play/

## Building

```
npm install
npm build
```

## Installing

```html
<script src="../dist/dot-game.js"></script>
```

#### Initialize game
```javascript
var responseHandler = YOUR_RESPONSE_HANDLER; 
var dotGame = new DotGame.Game(4, 4, responseHandler);

// Send the game a message
dotGame.request(message); // The game will send response to your response handler.

// To initialize/reset the game engine state
dotGame.init();
```

Client Protocol can be found at https://technical-assessment.konicaminoltamarketplace.com/client/

**Example Using Elm Port**

```html
<script src="../dist/dot-game.js"></script>
<script type="application/javascript">
    var dotGame = new DotGame.Game(4, 4, app.ports.response.send, console);
    app.ports.request.subscribe(message => dotGame.request(message));
</script>
```


## Running the tests

```
npm test
```

## Built With

* [Typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.js.org/)


## Authors

* **Chris Orlando** - https://github.com/chrisorlandodev

## Acknowledgments

* Rosetta Code - [Find the intersection of two lines](https://rosettacode.org/wiki/Find_the_intersection_of_two_lines#C.23)
