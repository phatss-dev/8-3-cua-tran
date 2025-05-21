(function(window) {

  function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  Point.prototype = {
    add: function(o) {
      return new Point(this.x + o.x, this.y + o.y);
    },
    sub: function(o) {
      return new Point(this.x - o.x, this.y - o.y);
    },
    div: function(n) {
      return new Point(this.x / n, this.y / n);
    }
  }

  function Bloom(ctx, point, img) {
    this.ctx = ctx;
    this.point = point;
    this.img = img;
    this.alpha = 1;
    this.angle = random(0, 360) * Math.PI / 180;
    this.scale = 0.1;
  }

  Bloom.prototype = {
    draw: function() {
      if (!this.img.complete) return;

      this.ctx.save();
      this.ctx.globalAlpha = this.alpha;
      this.ctx.translate(this.point.x, this.point.y);
      this.ctx.rotate(this.angle);
      this.ctx.scale(this.scale, this.scale);
      this.ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
      this.ctx.restore();

      this.scale += 0.02;
      if (this.scale < 1.2) {
        requestAnimationFrame(this.draw.bind(this));
      }
    }
  }

  function LoveTree(canvas, callback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = [];

    const imageList = [
      'flower/flower1.png',
      'flower/flower2.png',
      'flower/flower3.png',
      'flower/flower4.png',
      'flower/flower5.png',
      'flower/flower6.png',
      'flower/flower7.png',
      'flower/flower8.png',
      'flower/flower9.png',
      'flower/flower10.png',
      'flower/flower11.png'     
    ];

    this.loadImages(imageList, callback);
  }

  LoveTree.prototype = {
    loadImages: function(urls, callback) {
      let loaded = 0;
      const self = this;

      urls.forEach(function(url, i) {
        const img = new Image();
        img.src = url;
        img.onload = function () {
          loaded++;
          self.images[i] = img;
          if (loaded === urls.length && typeof callback === 'function') {
            callback();
          }
        };
      });
    },

    plant: function(n) {
      for (let i = 0; i < n; i++) {
        const x = random(100, this.canvas.width - 100);
        const y = random(100, this.canvas.height - 100);
        const img = this.images[random(0, this.images.length - 1)];
        const bloom = new Bloom(this.ctx, new Point(x, y), img);
        bloom.draw();
      }
    }
  }

  window.LoveTree = LoveTree;

})(window);