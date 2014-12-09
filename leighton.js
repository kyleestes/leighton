define(function (require) {
    var orb = require('orb');

    var orb1 = orb('green');
    var orb2 = orb('purple');
    var orb3 = orb('red');
    
    alert(orb1.getColor() + ', ' + orb2.getColor() + ', ' + orb3.getColor());
});