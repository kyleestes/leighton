define(function (require) {
    var constructor = function(color) {
        var getColor = function() {
            return color;
        };

        var that = {};

        that.getColor = getColor;

        return that;
    };

    return constructor;
});