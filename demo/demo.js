const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const run = document.querySelector('#run');
const clear = document.querySelector('#clear');
const canvasWidth = 300;
const canvasHeight = 300;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const render = () => {
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;

    for (let i = 0; i < canvasWidth; i++) {
        for (let j = 0; j < canvasHeight; j++) {
            const index = (i + j * canvasWidth) * 4;
            const x = 15 * (i / canvasWidth);
            const y = 15 * (j / canvasHeight);
            const z = 0.4;

            const n = Math.floor(255 * (1 + tooloud.Perlin.noise(x, y, z)) / 2);
            data[index + 0] = n;
            data[index + 1] = n;
            data[index + 2] = n;
            data[index + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

clear.addEventListener('click', function(e) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
});

run.addEventListener('click', render);

render();
