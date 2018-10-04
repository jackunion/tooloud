# Perlin noise

![](/examples/Perlin/img/1.png)

```javascript
const n = tooloud.Perlin.noise(x, y, z);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

![](/examples/Perlin/img/2.png)

```javascript
const n = (1 + tooloud.Perlin.noise(x, y, z)) / 2;
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

![](/examples/Perlin/img/3.png)

```javascript
const n = Math.cos(tooloud.Perlin.noise(i/45, j/120, z) * 50);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

![](/examples/Perlin/img/4.png)

```javascript
const dist = (Math.pow(i - (canvasWidth / 2), 2) + Math.pow(j - (canvasHeight / 2), 2)) / 1000;
const n = (1 + tooloud.Perlin.noise(i/5, j/5, 0.8)) / 2;
const d = dist * Math.round(255 * n);
data[index + 0] = 255 - d;
data[index + 1] = -d;
data[index + 2] = 0;
data[index + 3] = 255;
```
