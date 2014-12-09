define(function(require) {
    var colors = require('colors');
    var constructor = function(color) {
        if (!colors[color]) {
            throw 'Invalid color';
        }
        
        var getColor = function() {
            return color;
        };

        var that = {};

        that.getColor = getColor;

        return that;
    };

    return constructor;
});