define(function(require) {
    var orb = require('orb');
    var colors = require('colors');

    var constructor = function() {
        var orbs = [];
        var minPosition = 0;
        var maxPosition = 29;
        
        var addOrb = function(orb) {
            orbs = orbs || [];
            if (orbs.length > maxPosition) {
                throw 'Orb limit exceeded';
            }

            orbs.push(orb);
        };

        var getOrb = function(position) {
            if (position < minPosition || position > maxPosition) {
                throw 'Invalid position';
            }

            if (!orbs || position >= orbs.length) {
                throw 'Orb not found';
            }

            return orbs[position];
        };

        var setOrb = function(position, orb) {
            if (position < minPosition || position > maxPosition) {
                throw 'Invalid position';
            }

            if (!orbs || position >= orbs.length) {
                throw 'Orb not found';
            }

            if (!orb) {
                throw ('Null orb');
            }

            orbs[position] = orb;
        };

        var initialize = function() {
            var pickRandomColor = function() {
                var result;
                var count = 0;
                for (var prop in colors) {
                    if (Math.random() < 1 / ++count) {
                        result = prop;
                    }
                }

                return result;
            };

            for (var position = minPosition; position <= maxPosition; position++) {
                var color = pickRandomColor();
                var newOrb = orb(color);
                addOrb(newOrb);
            }
        };

        var getMinPosition = function() {
            return minPosition;
        };

        var getMaxPosition = function() {
            return maxPosition;
        };

        var that = {};

        that.getMinPosition = getMinPosition;
        that.getMaxPosition = getMaxPosition;
        that.addOrb = addOrb;
        that.getOrb = getOrb;
        that.setOrb = setOrb;
        that.initialize = initialize;

        return that;
    };

    return constructor;
});