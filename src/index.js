/*
    Perlin noise implementation taken from http://mrl.nyu.edu/~perlin/noise/
    Simplex noise implementation taken from http://www.csee.umbc.edu/~olano/s2002c36/ch02.pdf
    Worley noise implementation taken from https://aftbit.com/cell-noise-2/
*/

import Perlin from './Perlin';
import Simplex from './Simplex';
import Worley from './Worley';
import Fractal from './Fractal';

const perlin = new Perlin();
const simplex = new Simplex();
const worley = new Worley();

export default {
    Perlin: {
        noise: perlin.noise,
        setSeed: perlin.setSeed,
        create: function(seed) { return new P(seed) }
    },

    Simplex: {
        noise: simplex.noise,
        setSeed: simplex.setSeed,
        create: function(seed) { return new S(seed) }
    },

    Worley: {
        Euclidean: worley.Euclidean,
        Manhattan: worley.Manhattan,
        setSeed: worley.setSeed,
        create: function(seed) { return new Worley(seed) }
    },

    Fractal: {
        noise: Fractal.noise
    }
}
