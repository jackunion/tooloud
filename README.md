# tooloud

Collection of noise functions written in JavaScript

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

# Noise

## General

- [Gradient noise](https://en.wikipedia.org/wiki/Gradient_noise) on Wikipedia
- [Value noise](https://en.wikipedia.org/wiki/Value_noise) on Wikipedia
- http://www.redblobgames.com/articles/noise/introduction.html
- http://blogs.msdn.com/b/hemipteran/archive/2014/03/26/generating-noise-for-applications.aspx
- http://lodev.org/cgtutor/randomnoise.html

## Perlin

- [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise) on Wikipedia
- Original Java implementation of [Improved Perlin Noise](http://mrl.nyu.edu/~perlin/noise/)
- http://asserttrue.blogspot.fi/2011/12/perlin-noise-in-javascript_31.html
- http://asserttrue.blogspot.fi/2012/01/procedural-textures-in-html5-canvas.html
- http://flafla2.github.io/2014/08/09/perlinnoise.html

## Simplex

- [Simplex noise](https://en.wikipedia.org/wiki/Simplex_noise) on Wikipedia
- http://www.csee.umbc.edu/~olano/s2002c36/ch02.pdf
- https://briansharpe.wordpress.com/2012/01/13/simplex-noise/

## Worley

- [Worley noise](https://en.wikipedia.org/wiki/Worley_noise) on Wikipedia
- https://aftbit.com/cell-noise-2/

## Fractal

- http://asserttrue.blogspot.fi/2012/01/turbulence-in-html5-canvas.html
