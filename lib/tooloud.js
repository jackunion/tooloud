var Perlin = require('./Perlin'),
    Worley = require('./Worley');

module.exports = {
    Perlin: Perlin.noise,
    Worley: {
        Euclidean: Worley.Euclidean,
        Manhattan: Worley.Manhattan
    }
};
