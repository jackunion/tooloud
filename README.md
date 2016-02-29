# tooloud
Collection of noise functions written in JavaScript
- [ ] improve webpack config

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
- [ ] TODO
  - fillRect() vs ImageData ([Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas))

# Noise

## General
http://mrl.nyu.edu/~perlin/noise/

http://www.redblobgames.com/articles/noise/introduction.html

http://blogs.msdn.com/b/hemipteran/archive/2014/03/26/generating-noise-for-applications.aspx

http://lodev.org/cgtutor/randomnoise.html

## Perlin
http://asserttrue.blogspot.fi/2011/12/perlin-noise-in-javascript_31.html

http://asserttrue.blogspot.fi/2012/01/turbulence-in-html5-canvas.html

http://asserttrue.blogspot.fi/2012/01/procedural-textures-in-html5-canvas.html

http://flafla2.github.io/2014/08/09/perlinnoise.html

## Simplex
http://www.csee.umbc.edu/~olano/s2002c36/ch02.pdf

https://briansharpe.wordpress.com/2012/01/13/simplex-noise/

## Worley
https://aftbit.com/cell-noise-2/

https://sharpnoise.codeplex.com/SourceControl/latest#SharpNoise/HTMLSharpNoise/Script/WorleyNoise.js
