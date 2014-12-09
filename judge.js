define(function(require) {
    var board = require('board')();
    var directions = require('directions');

    var constructor = function() {
        var shift = {};
        shift[directions.up] = -6;
        shift[directions.upRight] = -5;
        shift[directions.right] = 1;
        shift[directions.downRight] = 7;
        shift[directions.down] = 6;
        shift[directions.downLeft] = 5;
        shift[directions.left] = -1;
        shift[directions.upLeft] = -7;
        
        var isMultipleOf6 = function(number) { 
            if (number % 6 === 0) { 
                return true; 
            } 

            return false; 
        };

        var isMultipleOf6Minus1 = function(number) {
            if (number % 6 === 5 || number % 6 === -1) {
                return true;
            }

            return false;
        };

        var rule = function(move) {
            var direction = move.getDirection();
            var position = move.getPosition();
            var target = position + shift[direction];

            switch (direction) {
                case directions.up:
                    if (target < 0) {
                        return false;
                    }

                    break;
                case directions.upRight:
                    if (target < 0 || isMultipleOf6(target)) {
                        return false;
                    }

                    break;
                case directions.right:
                    if (isMultipleOf6(target)) {
                        return false;
                    }

                    break;
                case directions.downRight:
                    if (target > 29 || isMultipleOf6(target)) {
                        return false;
                    }

                    break;
                case directions.down:
                    if (target > 29) {
                        return false;
                    }

                    break;
                case directions.downLeft:
                    if (target > 29 || isMultipleOf6Minus1(target)) {
                        return false;
                    }

                    break;
                case directions.left:
                    if (isMultipleOf6Minus1(target)) {
                        return false;
                    }

                    break;
                case directions.upLeft:
                    if (target < 0 || isMultipleOf6Minus1(target)) {
                        return false;
                    }
                    
                    break;
                default:
                    throw 'Invalid direction';
            }

            return true;
        };

        var that = {};

        that.rule = rule;

        return that;
    };

    return constructor;
});