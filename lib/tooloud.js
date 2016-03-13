var Perlin = require('./Perlin'),
    Simplex = require('./Simplex'),
    Worley = require('./Worley'),
    Fractal = require('./Fractal');

module.exports = {
    Perlin: {
        noise: Perlin.noise,
        setSeed: Perlin.setSeed
    },

    Simplex: {
        noise: Simplex.noise,
        setSeed: Simplex.setSeed
    },

    Worley: {
        Euclidean: Worley.Euclidean,
        Manhattan: Worley.Manhattan,
        setSeed: Worley.setSeed
    },

    Fractal: {
        noise: Fractal.noise
    }
};
