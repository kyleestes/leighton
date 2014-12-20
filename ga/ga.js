define(function (require) {
    var plus = 10;
    var minus = 11;
    var multiply = 12;
    var divide = 13;
    
    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var population = [];
    var initialPopulationSize = 100;
    var bitsPerGene = 4;
    var genesPerIndividual = 75;
    
    var populate = function(populationSize) {
        population = [];
        while (population.length < initialPopulationSize) {
            var individual = '';
            while (individual.length < genesPerIndividual * bitsPerGene) {
                individual += getRandomInt(0, 2).toString();
            }
            
            population.push(individual);
        }
    };

    var getPopulation = function() {
        return population;    
    };
    
    var that = {};
    that.populate = populate;
    that.getPopulation = getPopulation;
    return that;
});