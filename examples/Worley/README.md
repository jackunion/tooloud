# Worley noise

![](/examples/Worley/img/e1.png)

```javascript
var n = tooloud.Worley.Euclidean(x, y, z, seed);
data[index + 0] = Math.floor(255 * n[0]);
data[index + 1] = Math.floor(255 * n[0]);
data[index + 2] = Math.floor(255 * n[0]);
data[index + 3] = 255;
```

---

![](/examples/Worley/img/e2.png)

```javascript
var n = tooloud.Worley.Euclidean(x, y, z, seed);
data[index + 0] = Math.floor(255 * n[1]);
data[index + 1] = Math.floor(255 * n[1]);
data[index + 2] = Math.floor(255 * n[1]);
data[index + 3] = 255;
```

---

![](/examples/Worley/img/e3.png)

```javascript
var n = tooloud.Worley.Euclidean(x, y, z, seed);
data[index + 0] = Math.floor(255 * (n[1] - n[0]));
data[index + 1] = Math.floor(255 * (n[1] - n[0]));
data[index + 2] = Math.floor(255 * (n[1] - n[0]));
data[index + 3] = 255;
```

---

![](/examples/Worley/img/e4.png)

```javascript
var n = tooloud.Worley.Euclidean(x, y, z, seed);
data[index + 0] = Math.floor(255 * (n[2] * n[0]));
data[index + 1] = Math.floor(255 * (n[2] * n[0]));
data[index + 2] = Math.floor(255 * (n[2] * n[0]));
data[index + 3] = 255;
```

---

![](/examples/Worley/img/m1.png)

```javascript
var n = tooloud.Worley.Manhattan(x, y, z, seed);
data[index + 0] = Math.floor(255 * n[0]);
data[index + 1] = Math.floor(255 * n[0]);
data[index + 2] = Math.floor(255 * n[0]);
data[index + 3] = 255;
```

---

![](/examples/Worley/img/m2.png)

```javascript
var n = tooloud.Worley.Manhattan(x, y, z, seed);
data[index + 0] = Math.floor(255 * n[1]);
data[index + 1] = Math.floor(255 * n[1]);
data[index + 2] = Math.floor(255 * n[1]);
data[index + 3] = 255;
```

---

![](/examples/Worley/img/m3.png)

```javascript
var n = tooloud.Worley.Manhattan(x, y, z, seed);
data[index + 0] = Math.floor(255 * (n[1] - n[0]));
data[index + 1] = Math.floor(255 * (n[1] - n[0]));
data[index + 2] = Math.floor(255 * (n[1] - n[0]));
data[index + 3] = 255;
```

---

![](/examples/Worley/img/m4.png)

```javascript
var n = tooloud.Worley.Manhattan(x, y, z, seed);
data[index + 0] = Math.floor(255 * (n[2] * n[0]));
data[index + 1] = Math.floor(255 * (n[2] * n[0]));
data[index + 2] = Math.floor(255 * (n[2] * n[0]));
data[index + 3] = 255;
```
