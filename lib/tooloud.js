var Perlin = require('./Perlin'),
    Worley = require('./Worley'),
    Simplex = require('./Simplex');

module.exports = {
    Perlin: Perlin.noise,
    Simplex: {
        noise3D: Simplex.noise3D
    }
    Worley: {
        Euclidean: Worley.Euclidean,
        Manhattan: Worley.Manhattan
    }
};
