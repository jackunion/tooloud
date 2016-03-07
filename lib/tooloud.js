var Perlin = require('./Perlin'),
    Simplex = require('./Simplex'),
    Worley = require('./Worley'),
    Fractal = require('./Fractal');

module.exports = {
    Perlin: {
        noise: Perlin.noise
    },

    Simplex: {
        noise: Simplex.noise
    },

    Worley: {
        Euclidean: Worley.Euclidean,
        Manhattan: Worley.Manhattan
    },

    Fractal: {
        noise: Fractal.noise
    }
};
