define(function(require) {
    var directions = require('directions');
    
    var constructor = function() {
        var drive = function(board, move) {
            var shift = {};
            shift[directions.up] = -6;
            shift[directions.upRight] = -5;
            shift[directions.right] = 1;
            shift[directions.downRight] = 7;
            shift[directions.down] = 6;
            shift[directions.downLeft] = 5;
            shift[directions.left] = -1;
            shift[directions.upLeft] = -7;

            var target = move.getPosition() + shift[move.getDirection()];

            var orb1 = board.getOrb(move.getPosition());
            board.setOrb(move.getPosition(), board.getOrb(target));
            board.setOrb(target, orb1);
        };

        var that = {};

        that.drive = drive;

        return that;
    };

    return constructor;
});