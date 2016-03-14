function Simplex(seed) {
    var i, j, k;
    var A = [0, 0, 0];
    var u, v, w;
    var T = [0x15,0x38,0x32,0x2c,0x0d,0x13,0x07,0x2a];

    var seedValue = seed ? xorshift(seed) : 0;

    function setSeed(seed) {
        seedValue = seed ? xorshift(seed) : 0;
    }

    function xorshift(seed) {
        x = seed ^ (seed >> 12);
        x = x ^ (x << 25);
        x = x ^ (x >> 27);
        return x * 2;
    }

    function b2func(N, B) { return N >> B & 1 }

    function b4func(i, j, k, B) { return T[b2func(i, B) << 2 | b2func(j, B) << 1 | b2func(k, B)] }

    function K(a) {
        var s = (A[0]+A[1]+A[2]) / 6.;
        var x = u - A[0] + s,
            y = v - A[1] + s,
            z = w - A[2] + s;
        var t = .6 - x * x - y * y - z * z;
        var h = shuffle(i + A[0], j + A[1], k + A[2]);

        A[a]++;

        if (t < 0) return 0;

        var b5 = h >> 5 & 1,
            b4 = h >> 4 & 1,
            b3 = h >> 3 & 1,
            b2 = h >> 2 & 1,
            b = h & 3;
        var p = b === 1 ? x : b === 2 ? y : z,
            q = b === 1 ? y : b === 2 ? z : x,
            r = b === 1 ? z : b === 2 ? x : y;
        p = (b5 === b3 ? -p : p);
        q = (b5 === b4 ? -q : q);
        r = (b5 !== (b4^b3) ? -r : r);
        t *= t;

        return 8 * t * t * (p + (b === 0 ? q + r : b2 === 0 ? q : r));
    }

    function shuffle(i, j, k) {
        return b4func(i, j, k, 0) + b4func(j, k, i, 1) + b4func(k, i, j, 2) + b4func(i, j, k, 3) +
            b4func(j, k, i, 4) + b4func(k, i, j, 5) + b4func(i, j, k, 6) + b4func(j, k, i, 7)
    }

    function noise(x, y, z) {
        x += seedValue;
        y += seedValue;
        z += seedValue;
        var s = (x + y + z) / 3;
        i = Math.floor(x + s);
        j = Math.floor(y + s);
        k = Math.floor(z + s);
        s = (i + j + k) / 6.;
        u = x - i + s;
        v = y - j + s;
        w = z - k + s;
        A[0] = A[1] = A[2] = 0;
        var hi = u>=w ? u>=v ? 0 : 1 : v>=w ? 1 : 2;
        var lo = u< w ? u< v ? 0 : 1 : v< w ? 1 : 2;
        return K(hi) + K(3 - hi - lo) + K(lo) + K(0);
    }

    return {
        noise: noise,
        setSeed: setSeed
    }
}

module.exports = Simplex;
