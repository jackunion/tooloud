var Perlin = require('./Perlin'),
    Worley = require('./Worley'),
    Simplex = require('./Simplex'),
    Fractal = require('./Fractal');

module.exports = {
    Perlin: {
        noise: Perlin.noise
    },

    Simplex: {
        noise3D: Simplex.noise3D
    },

    Worley: {
        Euclidean: Worley.Euclidean,
        Manhattan: Worley.Manhattan
    },

    Fractal: {
        noise: Fractal.noise
    }
};
