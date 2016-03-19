var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    run = document.querySelector('#run'),
    clear = document.querySelector('#clear'),
    canvasWidth = 300,
    canvasHeight = 300;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

clear.addEventListener('click', function(e) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
});

run.addEventListener('click', render);

function render() {
    var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
        data = imageData.data;

    for (var i = 0; i < canvasWidth; i++) {
        for (var j = 0; j < canvasHeight; j++) {
            var index = (i + j * canvasWidth) * 4;
            var x = 15 * (i / canvasWidth),
                y = 15 * (j / canvasHeight),
                z = 0.4;

            var n = Math.floor(255 * (1 + tooloud.Perlin.noise(x, y, z)) / 2);
            data[index + 0] = n;
            data[index + 1] = n;
            data[index + 2] = n;
            data[index + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

render();
