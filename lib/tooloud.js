var Perlin = require('./Perlin'),
    Simplex = require('./Simplex'),
    Worley = require('./Worley'),
    Fractal = require('./Fractal');

var perlin = new Perlin(),
    simplex = new Simplex(),
    worley = new Worley(),
    fractal = new Fractal();

module.exports = {
    Perlin: {
        noise: perlin.noise,
        setSeed: perlin.setSeed,
        create: function(seed) { return new Perlin(seed) }
    },

    Simplex: {
        noise: simplex.noise,
        setSeed: simplex.setSeed,
        create: function(seed) { return new Simplex(seed) }
    },

    Worley: {
        Euclidean: worley.Euclidean,
        Manhattan: worley.Manhattan,
        setSeed: worley.setSeed,
        create: function(seed) { return new Worley(seed) }
    },

    Fractal: {
        noise: fractal.noise,
        create: function() { return new Fractal() }
    }
}
