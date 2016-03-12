# tooloud

Collection of noise functions written in JavaScript

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
  - [Perlin](#perlin-noise)
  - [Simplex](#simplex-noise)
  - [Worley](#worley-noise)
  - [Fractal](#fractal-noise)

### Installation

`npm install tooloud`

`var tooloud = require ('tooloud');`

or 


`git clone https://github.com/jackunion/tooloud`

`<script src="path/to/tooloud/dist/tooloud.min.js"></script>`

### Available noise functions

```
tooloud.Perlin.noise(x, y, z, seed);
tooloud.Simplex.noise(x, y, z, seed);
tooloud.Worley.Euclidean(x, y, z, seed);
tooloud.Worley.Manhattan(x, y, z, seed);
tooloud.Fractal(x, y, z, octaves, noiseCallback);
```

Seeding ```tooloud.Perlin``` or ```tooloud.Simplex``` may slightly increase the execution time.

All ```seed``` arguments are optional. If ```seed``` argument was omitted:

- ```tooloud.Perlin``` and ```tooloud.Simplex``` will run without any seed
- ```tooloud.Worley``` will supply the noise function with seed (defaults to 3000)

### Using tooloud with canvas

```javascript
var tooloud = require('tooloud'); // omit if tooloud was included via the script tag

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
    data = imageData.data,
    canvasWidth = 640,
    canvasHeight = 480;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var seed = Math.floor(Math.random() * 10000);

for (var i = 0; i < canvasWidth; i++) {
    for (var j = 0; j < canvasHeight; j++) {
        var index = (i + j * canvasWidth) * 4;
        
        /*
        var x, y, z;

        Normalize:
        x = i / canvasWidth;
        y = j / canvasHeight;
        z = 0;
        // fixing one of the coordinates turns 3D noise into 2D noise
        // fixing two of the coordinates turns 3D noise into 1D noise
        // fixed coordinate will serve as a seed, i.e. you'll get different results for different values
        
        // Scale:
        var scale = 10;
        x = scale * x;
        y = scale * y;
        */
        
        // In one go:
        var x = 15 * (i / canvasWidth), 
            y = 5 * (j / canvasHeight),         // You can use different scale values for each coordinate
            z = 0;

        var n = tooloud.Perlin.noise(x, y, z, seed),  // calculate noise value at x, y, z
            r = Math.floor(255 * n),
            g = Math.floor(255 * n),
            b = Math.floor(255 * n);

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
// loop
context.fillStyle = 'rgba(' + [r,g,b,255].join(',') + ')';
contex.fillRect(i, j, 1, 1);
```

Despite the fact that you need less code to get the same result, this approach is *incredibly* slower than one involving ```ImageData```.

In case you would like to know more, you can read about [pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas) on Mozilla Developer Network.

##### Note on using smaller canvas

Sometimes you find yourself in need of rerunning the same noise function with different input values. In this case, consider scaling your canvas down for a faster performance until the desired output is found.

![](/examples/_scaling/3.png) ![](/examples/_scaling/2.png) ![](/examples/_scaling/1.png)

##### Note on using tooloud.Worley

Instead of returning a certain value, ```tooloud.Worley``` returns an array containing distances to three closest feature points.

To use ```tooloud.Worley``` with canvas you just need to slightly change the way you calculate your RGB values:

```javascript
var n = tooloud.Worley.Euclidean(x, y, z, seed);

// n is an array containing three numbers
// using indexes from 0 to 2 you can access one of them

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
var n = tooloud.Fractal.noise(x, y, z, octaves, tooloud.Perlin.noise);
```

The better way to use it would be to define a separate function outside the loop and use it as an argument for ```tooloud.Fractal.noise``` later on. Inside that function you would call the desired noise function, process the output the way you want and return the result:

```javascript
function fractalCallback(x, y, z) {
    // you can use different noise functions

    // return tooloud.Perlin.noise(x, y, z);

    // return (1 + tooloud.Simplex.noise(x, y, z, seed)) / 2;

    var n = tooloud.Worley.Euclidean(x, y, z, seed);
    return n[1] - n[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, octaves, fractalCallback);
data[index + 0] = Math.floor(255 * n);      // R
data[index + 1] = Math.floor(255 * n);      // G
data[index + 2] = Math.floor(255 * n);      // B
data[index + 3] = 255;                      // A
```

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
