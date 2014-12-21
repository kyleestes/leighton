define(function (require) {
    var setStatus = function(status) {
        document.getElementById('status').innerText = status;
    };

    setStatus('Initializing genetic algorithm...');

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var createPopulation = function() {
        return {
            individuals: [],
            fitness: 0
        };
    };

    var populate = function(population) {
        while (population.individuals.length < initialPopulationSize) {
            var individual = {
                chromosome: '',
                fitness: 0
            };

            while (individual.chromosome.length < genesPerIndividual * bitsPerGene) {
                individual.chromosome += getRandomInt(0, 2).toString();
            }

            population.individuals.push(individual);
        }

        return population;
    };

    var geneIsOperator = function(gene) {
        if (gene === plus || gene === minus || gene === multiply || gene === divide) {
            return true;
        }

        return false;
    };

    var geneIsNumeric = function(gene) {
        if (gene > -1 && gene < 10) {
            return true;
        }

        return false;
    };

    var toGenes = function(individual) {
        var genes = [];
        var geneCount = Math.floor(individual.chromosome.length / bitsPerGene);
        var operator = true;
        for (var i = 0; i < genesPerIndividual * bitsPerGene; i += bitsPerGene) {
            var gene = parseInt(individual.chromosome.substring(i * bitsPerGene, i * bitsPerGene + bitsPerGene), 2);
            if (operator) {
                if (!geneIsOperator(gene)) {
                    continue;
                }
            }
            else {
                if (!geneIsNumeric(gene)) {
                    continue;
                }
            }

            genes.push(gene);
            operator = !operator;
        }

        for (var i = 0; i < genes.length - 1; i++) {
            if (genes[i] === divide && genes[i + 1] === 0) {
                genes[i] = plus;
            }
        }

        return genes;
    };

    var testFitness = function(individual, target) {
        var result = 0;
        var genes = toGenes(individual);
        for (var i = 0; i < genes.length - 1; i += 2) {
            switch(genes[i]) {
                case plus:
                    result += genes[i + 1];
                    break;
                case minus:
                    result -= genes[i + 1];
                    break;
                case multiply:
                    result *= genes[i + 1];
                    break;
                case divide:
                    result /= genes[i + 1];
                    break;
            }
        }

        if (target === result) {
            return -1;
        }

        return 1 / Math.abs(target - result);
    };

    var select = function(population) {
        var roll = Math.random() * population.fitness;
        var spin = 0;
        for (var i = 0; i < population.individuals.length; i++) {
            spin += population.individuals[i].fitness;
            if (spin >= roll) {
                return population.individuals[i];
            }
        }

        throw 'Selection failed';
    };

    var crossover = function(individual1, individual2) {
        if (Math.random() > crossoverProbability) {
            return;
        }
        
        if (individual1.chromosome.length !== individual2.chromosome.length) {
            throw 'Individual chromosomes not of equal length';
        }

        var split = Math.floor(Math.random() * individual1.chromosome.length);

        var chromosome1 = individual1.chromosome.substring(0, split) + individual2.chromosome.substring(split, individual2.chromosome.length);
        var chromosome2 = individual2.chromosome.substring(0, split) + individual1.chromosome.substring(split, individual1.chromosome.length);
        individual1.chromosome = chromosome1;
        individual2.chromosome = chromosome2;
    };

    var mutate = function(individual) {
        for (var i = 0; i < individual.chromosome.length; i++) {
            if (Math.random() > mutationProbability) {
                continue;
            }

            if (individual.chromosome[i] === '1') {
                individual.chromosome[i] = '0';
            }
            else {
                individual.chromosome[i] = '1';
            }
        }
    };

    var evolve = function(population, generations, success, error) {
        var generation = 0;
        while (generation < generations) {
            population.fitness = 0;
            var solution = null;
            for (var i = 0; i < population.individuals.length; i++) {
                var individual = population.individuals[i];
                var fitness = testFitness(individual, target);
                individual.fitness = fitness;
                population.fitness += fitness;
                if (fitness === -1) {
                    solution = individual;
                }
            }

            if (solution) {
                success(solution, generation);
                return;
            }

            var newPopulation = createPopulation();
            while (newPopulation.individuals.length < initialPopulationSize) {
                var individual1 = select(population);
                var individual2 = select(population);
                crossover(individual1, individual2);
                mutate(individual1);
                mutate(individual2);
                newPopulation.individuals.push(individual1);
                newPopulation.individuals.push(individual2);
            }

            population = newPopulation;
            generation += 1;
        }

        error(population, generation);
    };

    var getPopulation = function() {
        return population;
    };
    
    var onEvolveSuccess = function(individual, generation) {
        setStatus('Solution at generation ' + generation + ' is ' + toSolution(individual));
    };

    var onEvolveError = function(population, generation) {
        setStatus('No solution at generation ' + generation);
    };

    var toSolution = function(individual) {
        var result = 0;
        var solution = '0 ';
        var genes = toGenes(individual);
        for (var i = 0; i < genes.length - 1; i += 2) {
            var operator;
            switch(genes[i]) {
                case plus:
                    result += genes[i + 1];
                    operator = '+';
                    break;
                case minus:
                    result -= genes[i + 1];
                    operator = '-';
                    break;
                case multiply:
                    result *= genes[i + 1];
                    operator = '*';
                    break;
                case divide:
                    result /= genes[i + 1];
                    operator = '/';
                    break;
            }

            var operand = genes[i + 1].toString();
            solution += operator;
            solution += ' ';
            solution += operand;
            solution += ' ';
        }
        
        solution += '= '
        solution += result;
        return solution;
    };

    var myPopulation = createPopulation();
    var target = parseInt(document.getElementById('target').value);
    var plus = 10;
    var minus = 11;
    var multiply = 12;
    var divide = 13;
    var initialPopulationSize = 100;
    var bitsPerGene = 4;
    var genesPerIndividual = 75;
    var generations = 400;
    var crossoverProbability = 0.7;
    var mutationProbability = 0.001;
    populate(myPopulation);
    evolve(myPopulation, generations, onEvolveSuccess, onEvolveError);

    var that = {};
    that.populate = populate;
    that.getPopulation = getPopulation;
    that.evolve = evolve;
    that.testFitness = testFitness;
    that.toGenes = toGenes;
    that.geneIsNumeric = geneIsNumeric;
    that.geneIsOperator = geneIsOperator;
    that.toSolution = toSolution;
    return that;
});