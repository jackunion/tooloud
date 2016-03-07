# Simplex noise

![](/examples/Simplex/img/1.png)

```javascript
var n = tooloud.Simplex.noise3D(x, y, z);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

![](/examples/Simplex/img/2.png)

```javascript
var n = (1 + tooloud.Simplex.noise3D(x, y, z)) / 2;
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

![](/examples/Simplex/img/3.png)

```javascript
var n = Math.cos(tooloud.Simplex.noise3D(i/45, j/120, z) * 50);
data[index + 0] = Math.floor(255 * n);
data[index + 1] = Math.floor(255 * n);
data[index + 2] = Math.floor(255 * n);
data[index + 3] = 255;
```

---

![](/examples/Simplex/img/4.png)

```javascript
var dist = (Math.pow(i - (canvasWidth / 2), 2) + Math.pow(j - (canvasHeight / 2), 2)) / 1000;
var n = (1 + tooloud.Simplex.noise3D(i/5, j/5, 0.8)) / 2;
var d = dist * Math.round(255 * n);
data[index + 0] = 255 - d;
data[index + 1] = -d;
data[index + 2] = 0;
data[index + 3] = 255;
```
