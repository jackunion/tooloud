# tooloud

Collection of noise functions written in JavaScript

- [tooloud](https://github.com/jackunion/tooloud)
  - [Installation](#installation)
  - [Available noise functions](#available-noise-functions)
  - [Using tooloud with canvas](#using-tooloud-with-canvas)
    - [Note on using tooloud.Worley](#note-on-using-tooloudworley)
    - [Note on using tooloud.Fractal](#note-on-using-tooloudfractal)
  - [Examples](#examples)
- [Noise](#noise)
  -[General](#general)
  -[Perlin](#perlin)
  -[Simplex](#simplex)
  -[Worley](#worley)
  -[Fractal](#fractal)

### Installation

`npm install tooloud`

`var tooloud = require ('tooloud');`

or 


`git clone https://github.com/jackunion/tooloud`

`<script src="path/to/tooloud/dist/tooloud.min.js"></script>`

### Available noise functions

```
tooloud.Perlin.noise(x, y, z);
tooloud.Simplex.noise3D(x, y, z);
tooloud.Worley.Euclidean(x, y, z, seed);
tooloud.Worley.Manhattan(x, y, z, seed);
tooloud.Fractal(x, y, z, octaves, noiseCallback);
```

### Using tooloud with canvas

```javascript
var tooloud = require('tooloud'); // omit if tooloud is included via the script tag

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
    data = imageData.data;
    canvasWidth = 640,
    canvasHeight = 480;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

for (var i = 0; i < canvasWidth; i++) {
    for (var j = 0; j < canvasHeight; j++) {
        var index = (i + j * canvasWidth) * 4;
        var x = 10 * (i / canvasWidth), 
            y = 10 * (j / canvasHeight),
            z = 0.8;
        var n = tooloud.Perlin.noise(x, y, z);

        data[index + 0] = Math.floor(255 * n);  // R
        data[index + 1] = Math.floor(255 * n);  // G
        data[index + 2] = Math.floor(255 * n);  // B
        data[index + 3] = 255;                  // A
    }
}

ctx.putImageData(imageData, 0, 0);
```

- [ ] fillRect() vs ImageData ([Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas))

##### Note on using tooloud.Worley

Instead of returning a certain value, ```tooloud.Worley``` returns an array containing distances to three closest feature points. The idea behind this decision is simple: you can generate differenly looking textures by combining those distances (adding, multiplying or using the second closest feature point for example).

To use ```tooloud.Worley``` with canvas you just need to slightly change the way you assign your RGB values:

```javascript
var n = tooloud.Worley.Euclidean(x, y, z, seed);

// n is an array containing three numbers
// using indexes from 0 to 2 you can access one of them

data[index + 0] = Math.floor(255 * n[0]);  // R
data[index + 1] = Math.floor(255 * n[0]);  // G
data[index + 2] = Math.floor(255 * n[0]);  // B
data[index + 3] = 255;                     // A
```

Consider these images:

![](/img/Worley/img/e1.png) ![](/img/Worley/img/e2.png) ![](/img/Worley/img/e3.png) ![](/img/Worley/img/e4.png)

In order of appearance:

```Math.floor(255 * n[0])```

```Math.floor(255 * n[1])```

```Math.floor(255 * (n[1] - n[0]))```

```Math.floor(255 * (n[2] * n[0]))```

##### Note on using tooloud.Fractal

- [ ] TODO

### Examples

- [ ] TODO

# Noise

## General

- [Gradient noise](https://en.wikipedia.org/wiki/Gradient_noise) on Wikipedia
- [Value noise](https://en.wikipedia.org/wiki/Value_noise) on Wikipedia
- http://www.redblobgames.com/articles/noise/introduction.html
- http://blogs.msdn.com/b/hemipteran/archive/2014/03/26/generating-noise-for-applications.aspx
- http://lodev.org/cgtutor/randomnoise.html

## Perlin

- [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise) on Wikipedia
- Original Java implementation of [Improved Perlin noise](http://mrl.nyu.edu/~perlin/noise/)
- http://asserttrue.blogspot.fi/2011/12/perlin-noise-in-javascript_31.html
- http://asserttrue.blogspot.fi/2012/01/procedural-textures-in-html5-canvas.html
- http://flafla2.github.io/2014/08/09/perlinnoise.html

## Simplex

- [Simplex noise](https://en.wikipedia.org/wiki/Simplex_noise) on Wikipedia
- Original Java implementation of [Simplex noise](http://www.csee.umbc.edu/~olano/s2002c36/ch02.pdf) (Appendix B)
- https://briansharpe.wordpress.com/2012/01/13/simplex-noise/

## Worley

- [Worley noise](https://en.wikipedia.org/wiki/Worley_noise) on Wikipedia
- An in depth [cell noise tutorial](https://aftbit.com/cell-noise-2/)
- Steven Worley's article on cell noise: [A Cellular Texture Basis Function](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.95.412&rep=rep1&type=pdf)
- Carl-Johan Rosén's paper on cell noise: [Cell Noise and Processing](http://www.carljohanrosen.com/share/CellNoiseAndProcessing.pdf)

## Fractal

- http://asserttrue.blogspot.fi/2012/01/turbulence-in-html5-canvas.html
