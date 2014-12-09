define(function(require) {
    var board = require('board')();

    var constructor = function() {
        var pickRandomPosition = function() {
            return Math.floor(Math.random() * (board.getMaxPosition() - board.getMinPosition() + 1)) + board.getMinPosition();
        };

        var that = {};

        that.pick = pickRandomPosition;

        return that;
    };

    return constructor;
});