(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tooloud"] = factory();
	else
		root["tooloud"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Perlin = __webpack_require__(2),
	    Simplex = __webpack_require__(3),
	    Worley = __webpack_require__(4),
	    Fractal = __webpack_require__(5);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Perlin = (function() {
	    var permutation = [
	        151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,
	        140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,
	        247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,
	        57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,
	        74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,
	        60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,
	        65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,
	        200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,
	        52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,
	        207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,
	        119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
	        129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,
	        218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,
	        81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,
	        184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,
	        222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
	    ];
	    var p = permutation.concat(permutation);
	    
	    function lerp(t, a, b) { return a + t * (b - a) }
	    
	    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
	    
	    function grad(hash, x, y, z) {
	        var h = hash & 15,
	            u = h<8 ? x : y,
	            v = h<4 ? y : h===12||h===14 ? x : z;
	        return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v);
	    }

	    function noise(x, y, z) {
	        var X = Math.floor(x) & 255,
	            Y = Math.floor(y) & 255,
	            Z = Math.floor(z) & 255;
	        x -= Math.floor(x);
	        y -= Math.floor(y);
	        z -= Math.floor(z);
	        var u = fade(x),
	            v = fade(y),
	            w = fade(z);
	        var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,
	            B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;

	        return lerp(w,
	            lerp(v,
	                lerp(u, grad(p[AA], x, y, z), grad(p[BA], x-1, y, z)),
	                lerp(u, grad(p[AB], x, y-1, z), grad(p[BB], x-1, y-1, z))
	            ),
	            lerp(v,
	                lerp(u, grad(p[AA+1], x, y, z-1), grad(p[BA+1], x-1, y, z-1)),
	                lerp(u, grad(p[AB+1], x, y-1, z-1), grad(p[BB+1], x-1, y-1, z-1))
	            )
	        )
	    }

	    return {
	        noise: noise
	    }
	}());

	module.exports = Perlin;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Simplex = (function() {
	    var i, j, k;
	    var A = [0, 0, 0];
	    var u, v, w;
	    var T = [0x15,0x38,0x32,0x2c,0x0d,0x13,0x07,0x2a];

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
	        noise: noise
	    }
	}());

	module.exports = Simplex;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Worley = (function() {
	    function xorshift(seed) {
	        x = seed ^ (seed >> 12);
	        x = x ^ (x << 25);
	        x = x ^ (x >> 27);
	        return x * 2;
	    }

	    function hash(i, j, k) {
	        return (((((2166136261 ^ i) * 16777619) ^ j) * 16777619) ^ k) * 16777619 & 0xffffffff;
	    }

	    function d(p1, p2) {
	        return [p1.x - p2.x, p1.y - p2.y, p1.z - p2.z];
	    }

	    function EuclideanDistance(p1, p2) {
	        return d(p1, p2).reduce(function(sum, x) { return sum + (x * x) }, 0);
	    }

	    function ManhattanDistance(p1, p2) {
	        return d(p1, p2).reduce(function(sum, x) { return sum + Math.abs(x) }, 0)
	    }

	    function probLookup(value) {
	        value = value & 0xffffffff;
	        if (value < 393325350) return 1;
	        if (value < 1022645910) return 2;
	        if (value < 1861739990) return 3;
	        if (value < 2700834071) return 4;
	        if (value < 3372109335) return 5;
	        if (value < 3819626178) return 6;
	        if (value < 4075350088) return 7;
	        if (value < 4203212043) return 8;
	        return 9;
	    }

	    function insert(arr, value) {
	        var temp;
	        for (var i = arr.length - 1; i >= 0; i--) {
	            if (value > arr[i]) break;
	            temp = arr[i];
	            arr[i] = value;
	            if (i + 1 < arr.length) arr[i + 1] = temp;
	        }
	    }

	    function noise(input, distanceFunc) {
	        var Seed = input.seed || 3000;
	        var lastRandom,
	            numberFeaturePoints,
	            randomDiff = { x: 0, y: 0, z: 0 },
	            featurePoint = { x: 0, y: 0, z: 0 };
	        var cubeX, cubeY, cubeZ;
	        var distanceArray = [9999999, 9999999, 9999999];

	        for (var i = -1; i < 2; ++i)
	            for (var j = -1; j < 2; ++j)
	                for (var k = -1; k < 2; ++k) {
	                    cubeX = Math.floor(input.x) + i;
	                    cubeY = Math.floor(input.y) + j;
	                    cubeZ = Math.floor(input.z) + k;
	                    lastRandom = xorshift(hash((cubeX + Seed) & 0xffffffff, (cubeY) & 0xffffffff, (cubeZ) & 0xffffffff));
	                    numberFeaturePoints = probLookup(lastRandom);
	                    for (var l = 0; l < numberFeaturePoints; ++l) {
	                        lastRandom = xorshift(lastRandom);
	                        randomDiff.X = lastRandom / 0x100000000;

	                        lastRandom = xorshift(lastRandom);
	                        randomDiff.Y = lastRandom / 0x100000000;

	                        lastRandom = xorshift(lastRandom);
	                        randomDiff.Z = lastRandom / 0x100000000;

	                        featurePoint
	                            = { x: randomDiff.X + cubeX, y: randomDiff.Y + cubeY, z: randomDiff.Z + cubeZ };
	                        insert(distanceArray, distanceFunc(input, featurePoint));
	                    }
	                }

	        return distanceArray.map(function(x) { return x < 0 ? 0 : x > 1 ? 1 : x });
	    }

	    function Euclidean(x, y, z, seed) {
	        return noise({x:x, y:y, z:z, seed:seed}, EuclideanDistance);
	    }

	    function Manhattan(x, y, z, seed) {
	        return noise({x:x, y:y, z:z, seed:seed}, ManhattanDistance);
	    }

	    return {
	        Euclidean: Euclidean,
	        Manhattan: Manhattan
	    }
	}());

	module.exports = Worley;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ])
});
;