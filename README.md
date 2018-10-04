# tooloud

Collection of noise functions written in JavaScript

Simple [jsFiddle demo](https://jsfiddle.net/jackunion/r37nba0L/).

### Contents

- [tooloud](https://github.com/jackunion/tooloud)
  - [Installation](#installation)
  - [Available noise functions](#available-noise-functions)
  - [Using tooloud with canvas](#using-tooloud-with-canvas)
    - [Note on using smaller canvas](#note-on-using-smaller-canvas)
    - [Note on using tooloud.Worley](#note-on-using-tooloudworley)
    - [Note on using tooloud.Fractal](#note-on-using-tooloudfractal)
  - [Examples](#examples)
- [Noise](#noise)
  - [General](#general)
  - [Perlin noise](#perlin-noise)
  - [Simplex noise](#simplex-noise)
  - [Worley noise](#worley-noise)
  - [Fractal noise](#fractal-noise)

### Installation

`npm install tooloud`

```javascript
import tooloud from 'tooloud';

// Optionally destructure
// const { Perlin, Simplex } = tooloud;
```

or

`git clone https://github.com/jackunion/tooloud`

`<script src="path/to/tooloud/dist/tooloud.min.js"></script>`

### Available noise functions

```javascript
tooloud.Perlin.noise(x, y, z);
tooloud.Simplex.noise(x, y, z);
tooloud.Worley.Euclidean(x, y, z);
tooloud.Worley.Manhattan(x, y, z);
tooloud.Fractal(x, y, z, octaves, noiseCallback);
```

Each ```tooloud``` object exposes a function that can be used to seed the noise:

```javascript
tooloud.Perlin.setSeed(seed);
tooloud.Simplex.setSeed(seed);
tooloud.Worley.setSeed(seed);
```

If seed wasn't set, all three noise functions will be supplied with seed (defaults to 3000)

Calling ```setSeed()``` without an argument will reset the seed.

**Important:** seeding the noise can increase the execution time.

Each ```tooloud``` noise object exposes a function that can be used to create another instance of that object. You can pass an optional seed value as an argument:

```javascript
var anotherPerlin = tooloud.Perlin.create(seed);
var anotherSimplex = tooloud.Simplex.create(seed);
var anotherWorley = tooloud.Worley.create(seed);
```

Each newly created instance exposes two functions: ```instance.noise(x, y, z)``` and ```instance.setSeed(seed)``` (```tooloud.Worley``` instances expose three functions: ```instance.Euclidean(x, y, z)```, ```instance.Manhattan(x, y, z)``` and ```instance.setSeed(seed)```).

**Important:** working with multiple instances can increase the execution time.

### Using tooloud with canvas

```javascript
import tooloud from 'tooloud'; // Omit if tooloud was included via the script tag

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
const canvasWidth = 640;
const canvasHeight = 480;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Seed your noise
// This is optional
tooloud.Perlin.setSeed(Math.floor(Math.random() * 10000));

let data = imageData.data;
for (let i = 0; i < canvasWidth; i++) {
    for (let j = 0; j < canvasHeight; j++) {
        const index = (i + j * canvasWidth) * 4;
        
        /*
        let x, y, z;

        Normalize:
        x = i / canvasWidth;
        y = j / canvasHeight;
        z = 0;
        // Fixing one of the coordinates turns 3D noise into 2D noise
        // Fixing two of the coordinates turns 3D noise into 1D noise
        // Fixed coordinate will serve as a seed, i.e. you'll get different results for different values
        
        // Scale:
        const scale = 10;
        x = scale * x;
        y = scale * y;
        */
        
        // In one go:
        const x = 15 * (i / canvasWidth);
        const y = 5 * (j / canvasHeight);         // You can use different scale values for each coordinate
        const z = 0;

        const n = tooloud.Perlin.noise(x, y, z);  // Calculate noise value at x, y, z
        const r = Math.floor(255 * n);
        const g = Math.floor(255 * n);
        const b = Math.floor(255 * n);

        data[index + 0] = r;            // R
        data[index + 1] = g;            // G
        data[index + 2] = b;            // B
        data[index + 3] = 255;          // A
    }
}

ctx.putImageData(imageData, 0, 0);
```

The naive way of using a noise function would be to set your RGB values using ```context.fillStylle``` and then draw a rectangle at the pixel's coordiantes:

```javascript
// ...Loop
context.fillStyle = 'rgba(' + [r,g,b,255].join(',') + ')';
contex.fillRect(i, j, 1, 1);
```

Despite the fact that you need less code to get the same result, this approach is *incredibly* slower than one involving ```ImageData```.

In case you would like to know more, you can read about [pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas) on Mozilla Developer Network.

##### Note on using smaller canvas

If you need to rerun the same noise function with different input values, consider scaling your canvas down for a faster performance until the desired output is found.

![](/examples/_scaling/3.png) ![](/examples/_scaling/2.png) ![](/examples/_scaling/1.png)

##### Note on using tooloud.Worley

Instead of returning a certain value, ```tooloud.Worley``` returns an array containing distances to three closest feature points.

To use ```tooloud.Worley``` with canvas you just need to slightly change the way you calculate your RGB values:

```javascript
const n = tooloud.Worley.Euclidean(x, y, z);

// n is an array containing three numbers
// Using indexes from 0 to 2 you can access one of them

data[index + 0] = Math.floor(255 * n[0]);  // R
data[index + 1] = Math.floor(255 * n[0]);  // G
data[index + 2] = Math.floor(255 * n[0]);  // B
data[index + 3] = 255;                     // A
```

The idea behind this decision is simple: you can generate different textures by combining those distances (adding, multiplying or using the n-th closest feature point):

![](/examples/Worley/img/e1.png) ![](/examples/Worley/img/e2.png) ![](/examples/Worley/img/e3.png) ![](/examples/Worley/img/e4.png)

See [Worley noise examples](/examples/Worley) for code and texture samples.

##### Note on using tooloud.Fractal

```tooloud.Fractal.noise``` accepts five arguments:

- x, y and z coordinates
- number of octaves
- a noise function you want to apply fractal noise to

You can simply pass the desired noise function to your fractal noise like this:

```javascript
const n = tooloud.Fractal.noise(x, y, z, octaves, tooloud.Perlin.noise);
```

The better way to use it would be to define a separate function outside the loop and use it as an argument for ```tooloud.Fractal.noise``` later on. Inside that function you would call the desired noise function, process the output the way you want and return the result:

```javascript
// Optionally seed the noise

// tooloud.Perlin.setSeed(1234);

// tooloud.Simplex.setSeed(12);

tooloud.Worley.setSeed(123);

const fractalCallback = (x, y, z) => {
    // You can use different noise functions

    // return tooloud.Perlin.noise(x, y, z);

    // return (1 + tooloud.Simplex.noise(x, y, z)) / 2;

    const n = tooloud.Worley.Euclidean(x, y, z);
    return n[1] - n[0];
}

// ...Loop
const n = tooloud.Fractal.noise(x, y, z, octaves, fractalCallback);
data[index + 0] = Math.floor(255 * n);      // R
data[index + 1] = Math.floor(255 * n);      // G
data[index + 2] = Math.floor(255 * n);      // B
data[index + 3] = 255;                      // A
```

**Important:** ```tooloud.Fractal.noise``` adds rescaled versions of the same noise onto itself, which may create some artifacts radiating from the origin. In case you find yourself unsatisfied with the output, you can always use available ```tooloud``` noise functions to create your own version of fractal noise.

### Examples

- [Perlin noise](/examples/Perlin)
- [Simplex noise](/examples/Simplex)
- [Worley noise](/examples/Worley)
- [Fractal noise](/examples/Fractal)

# Noise

## General

- [Gradient noise](https://en.wikipedia.org/wiki/Gradient_noise) on Wikipedia
- [Value noise](https://en.wikipedia.org/wiki/Value_noise) on Wikipedia
- ["Introduction to noise functions"](http://www.redblobgames.com/articles/noise/introduction.html) on RedBlobGames
- ["Generating Noise for applications"](http://blogs.msdn.com/b/hemipteran/archive/2014/03/26/generating-noise-for-applications.aspx) - an article on four different types of noise generation algorithms

## Perlin noise

- [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise) on Wikipedia
- Original Java implementation of [Improved Perlin noise](http://mrl.nyu.edu/~perlin/noise/)
- ["Perlin Noise in JavaScript"](http://asserttrue.blogspot.fi/2011/12/perlin-noise-in-javascript_31.html) - a brief introduction to Perlin noise
- ["Understanding Perlin Noise"](http://flafla2.github.io/2014/08/09/perlinnoise.html) - an in depth explanation of Perlin noise
- ["Procedural Textures in HTML5 Canvas"](http://asserttrue.blogspot.fi/2012/01/procedural-textures-in-html5-canvas.html) - a blog post on Perlin noise usage (with code and texture samples)

## Simplex noise

- [Simplex noise](https://en.wikipedia.org/wiki/Simplex_noise) on Wikipedia
- Original Java implementation of [Simplex noise](http://www.csee.umbc.edu/~olano/s2002c36/ch02.pdf) (Appendix B)
- ["Simplex noise demystified"](http://webstaff.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf) by Stefan Gustavson
- [A blog post](https://briansharpe.wordpress.com/2012/01/13/simplex-noise/) on optimized GPU noise functions and utilities (with a discussion in comments)

## Worley noise

- [Worley noise](https://en.wikipedia.org/wiki/Worley_noise) on Wikipedia
- An in depth [cell noise tutorial](https://aftbit.com/cell-noise-2/)
- Steven Worley's article on cell noise: [A Cellular Texture Basis Function](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.95.412&rep=rep1&type=pdf)
- Carl-Johan Rosén's paper on cell noise: [Cell Noise and Processing](http://www.carljohanrosen.com/share/CellNoiseAndProcessing.pdf)

## Fractal noise

- ["Turbulence in HTML5 Canvas"](http://asserttrue.blogspot.fi/2012/01/turbulence-in-html5-canvas.html)
