var Worley = (function() {
    var Seed = 3000;

    function setSeed(seed) {
        Seed = seed;
    }

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

    function Euclidean(x, y, z) {
        return noise({x:x, y:y, z:z}, EuclideanDistance);
    }

    function Manhattan(x, y, z) {
        return noise({x:x, y:y, z:z}, ManhattanDistance);
    }

    return {
        Euclidean: Euclidean,
        Manhattan: Manhattan,
        setSeed: setSeed
    }
}());

module.exports = Worley;
