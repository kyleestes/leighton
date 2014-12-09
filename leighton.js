define(function (require) {
    var board = require('board')();
    var compass = require('compass')();
    var jar = require('jar')();
    var move = require('move');
    var judge = require('judge')();
    var plow = require('plow')();

    var getBoard = function() {
        return board;
    };

    var run = function() {
        var pickRandomMove = function() {
            var randomDirection = compass.pick();
            var randomPosition = jar.pick();
            var randomMove = move({
                position: randomPosition,
                direction: randomDirection
            });

            return randomMove;
        };

        // Pick random move
        var randomMove = pickRandomMove();

        // Ask judge if move is legal, and pick another if it is not
        while (!judge.rule(randomMove)) {
            randomMove = pickRandomMove();
        }

        // Make the  move
        plow.drive(board, randomMove);
    };

    board.initialize();
    run();
});