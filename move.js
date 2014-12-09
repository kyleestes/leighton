define(function(require) {
    var directions = require('directions');
    var board = require('board')();

    var constructor = function(spec) {
        if (!spec.hasOwnProperty('position')) {
            throw 'Null position';
        }

        if (spec.position < board.getMinPosition() || spec.position > board.getMaxPosition()) {
            throw 'Invalid position';
        }

        if (!spec.direction) {
            throw 'Null direction';
        }

        if (!directions[spec.direction]) {
            throw 'Invalid direction';
        }

        var getPosition = function() {
            return spec.position;
        };

        var getDirection = function() {
            return spec.direction;
        };

        var that = {};

        that.getPosition = getPosition;
        that.getDirection = getDirection;

        return that;
    };

    return constructor;
});