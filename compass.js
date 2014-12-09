define(function(require) {
    var directions = require('directions');

    var constructor = function() {
        var pickRandomDirection = function() {
            var result;
            var count = 0;
            for (var prop in directions) {
                if (Math.random() < 1 / ++count) {
                    result = prop;
                }
            }

            return result;
        };

        var that = {};

        that.pick = pickRandomDirection;

        return that;
    };

    return constructor;
});