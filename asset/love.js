
function LoveTree(canvas, imageList, callback) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function drawBloom(x, y, image) {
    const img = new Image();
    img.onload = function () {
      ctx.save();
      ctx.translate(x, y);
      ctx.drawImage(img, -15, -15, 30, 30);
      ctx.restore();
    };
    img.src = image;
  }

  this.plant = function (count) {
    for (let i = 0; i < count; i++) {
      const x = random(100, width - 100);
      const y = random(100, height - 100);
      const imgIndex = Math.floor(Math.random() * imageList.length);
      const imgSrc = imageList[imgIndex];
      drawBloom(x, y, imgSrc);
    }
    if (typeof callback === "function") callback();
  };

  const fallingHearts = [];

  this.startFalling = function () {
    for (let i = 0; i < 25; i++) {
      const img = new Image();
      img.src = imageList[Math.floor(Math.random() * imageList.length)];
      fallingHearts.push({
        x: random(0, width),
        y: random(-200, -20),
        speedY: random(1, 2),
        angle: random(0, Math.PI * 2),
        angleSpeed: random(0.01, 0.03),
        amplitude: random(10, 20),
        img: img,
        opacity: 1,
        fading: false
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fallingHearts.length; i++) {
        const h = fallingHearts[i];
        h.y += h.speedY;
        h.angle += h.angleSpeed;
        const offsetX = Math.sin(h.angle) * h.amplitude;

        if (h.y > height - 30) h.fading = true;
        if (h.fading) h.opacity -= 0.02;

        if (h.opacity <= 0) {
          h.y = random(-200, -20);
          h.x = random(0, width);
          h.opacity = 1;
          h.fading = false;
        }

        ctx.save();
        ctx.globalAlpha = h.opacity;
        ctx.translate(h.x + offsetX, h.y);
        ctx.drawImage(h.img, -15, -15, 30, 30);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    animate();
  };
}
