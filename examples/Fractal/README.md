# Fractal noise

Simple example of ```tooloud.Fractal.noise``` applied to ```tooloud.Perlin.noise``` (4 octaves).

![](/examples/Fractal/img/1.png)

```javascript
var n = tooloud.Fractal.noise(x, y, z, 4, tooloud.Perlin.noise);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

Slightly more complex example using a callback function (2 octaves).

![](/examples/Fractal/img/2.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return (1 + tooloud.Perlin.noise(x, y, z)) / 2;
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 2, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

Same as above but with 4 octaves.

![](/examples/Fractal/img/3.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return (1 + tooloud.Perlin.noise(x, y, z)) / 2;
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 4, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Simplex.noise``` (2 octaves).

![](/examples/Fractal/img/4.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return (1 + tooloud.Simplex.noise(x, y, z)) / 2;
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 2, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Simplex.noise``` (4 octaves).

![](/examples/Fractal/img/5.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return (1 + tooloud.Simplex.noise(x, y, z)) / 2;
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 4, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Worley.Euclidean``` (first closest distance, 2 octaves).

![](/examples/Fractal/img/6.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return tooloud.Worley.Euclidean(x, y, z, 120)[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 2, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Worley.Euclidean``` (first closest distance, 4 octaves).

![](/examples/Fractal/img/7.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return tooloud.Worley.Euclidean(x, y, z, 120)[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 4, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Worley.Manhattan``` (first closest distance, 2 octaves).

![](/examples/Fractal/img/8.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return tooloud.Worley.Manhattan(x, y, z, 120)[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 2, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Worley.Manhattan``` (first closest distance, 4 octaves).

![](/examples/Fractal/img/9.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    return tooloud.Worley.Manhattan(x, y, z, 120)[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 4, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Worley.Euclidean``` (first closest distance subtracted from the second one, 2 octaves).

![](/examples/Fractal/img/10.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    var n = tooloud.Worley.Euclidean(x, y, z, 120);
    return n[1] - n[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 2, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

```tooloud.Fractal.noise``` applied to ```tooloud.Worley.Euclidean``` (first closest distance subtracted from the second one, 4 octaves).

![](/examples/Fractal/img/11.png)

```javascript
// define a callback function
function fractalCallback(x, y, z) {
    var n = tooloud.Worley.Euclidean(x, y, z, 120);
    return n[1] - n[0];
}

// loop
var n = tooloud.Fractal.noise(x, y, z, 4, fractalCallback);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```
