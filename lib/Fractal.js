var Fractal = (function() {
    function noise(x, y, z, octaves, noiseCallback) {
        var t = 0, f = 1, n = 0;
        for (var i = 0; i < octaves; i++) {
            n += noiseCallback(x * f, y * f, z * f) / f;
            t += 1/f;
            f *= 2;
        }
        return n / t;
    }

    return {
        noise: noise
    }
}());

module.exports = Fractal;
