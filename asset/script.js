(function () {
  const validNames = ["Phát", "Trân"]; // Đổi tên tùy ý

  function normalize(str) {
    return str.trim().toLowerCase();
  }

  const plantButton = document.getElementById("plantButton");
  const nameForm = document.getElementById("name-form");
  const canvas = document.getElementById("canvas");
  const mainDiv = document.getElementById("main");
  const errorMsg = document.getElementById("error-msg");

  plantButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn trang bị reload khi bấm nút

    const name1 = normalize(document.getElementById("name1").value);
    const name2 = normalize(document.getElementById("name2").value);

    if (
      validNames.map(normalize).includes(name1) &&
      validNames.map(normalize).includes(name2) &&
      name1 !== name2
    ) {
      nameForm.style.display = "none";
      canvas.style.display = "block";
      mainDiv.style.display = "block";
      startTreeAnimation();
    } else {
      errorMsg.textContent = "Tên không đúng hoặc trùng nhau. Thử lại nhé!";
    }
  });

  function startTreeAnimation() {
    const width = canvas.width;
    const height = canvas.height;

    const tree = new Tree(canvas, width, height, {
      seed: { x: width / 2 - 20, color: "rgb(190,26,37)", scale: 2 },
      branch: [
        [535, 680, 570, 250, 500, 200, 30, 100, [
          [540, 500, 455, 417, 340, 400, 13, 100, [[450, 435, 434, 430, 394, 395, 2, 40]]],
          [550, 445, 600, 356, 680, 345, 12, 100, [[578, 400, 648, 409, 661, 426, 3, 80]]],
          [539, 281, 537, 248, 534, 217, 3, 40],
          [546, 397, 413, 247, 328, 244, 9, 80, [
            [427, 286, 383, 253, 371, 205, 2, 40],
            [498, 345, 435, 315, 395, 330, 4, 60]
          ]],
          [546, 357, 608, 252, 678, 221, 6, 100, [[590, 293, 646, 277, 648, 271, 2, 80]]]
        ]]
      ],
      bloom: { num: 700, width: width, height: height },
      footer: { width: 1200, height: 5, speed: 10 }
    });

    const seed = tree.seed;
    const foot = tree.footer;
    let hold = 1;

    canvas.addEventListener("click", function (e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (seed.hover(x, y)) hold = 0;
    });

    const seedAnimate = eval(Jscex.compile("async", function () {
      seed.draw();
      while (hold) $await(Jscex.Async.sleep(10));
      while (seed.canScale()) {
        seed.scale(0.95);
        $await(Jscex.Async.sleep(10));
      }
      while (seed.canMove()) {
        seed.move(0, 2);
        foot.draw();
        $await(Jscex.Async.sleep(10));
      }
    }));

    const growAnimate = eval(Jscex.compile("async", function () {
      while (tree.canGrow()) {
        tree.grow();
        $await(Jscex.Async.sleep(10));
      }
    }));

    const flowAnimate = eval(Jscex.compile("async", function () {
      while (tree.canFlower()) {
        tree.flower(2);
        $await(Jscex.Async.sleep(10));
      }
    }));

    const moveAnimate = eval(Jscex.compile("async", function () {
      tree.snapshot("p1", 240, 0, 610, 680);
      while (tree.move("p1", 500, 0)) {
        foot.draw();
        $await(Jscex.Async.sleep(10));
      }
      foot.draw();
      tree.snapshot("p2", 500, 0, 610, 680);
      canvas.parentElement.style.background = "url(" + tree.toDataURL("image/png") + ")";
      canvas.style.background = "#ffe";
      $await(Jscex.Async.sleep(300));
      canvas.style.background = "none";
    }));

    const jumpAnimate = eval(Jscex.compile("async", function () {
      while (true) {
        tree.ctx.clearRect(0, 0, width, height);
        tree.jump();
        foot.draw();
        $await(Jscex.Async.sleep(25));
      }
    }));

    const runAsync = eval(Jscex.compile("async", function () {
      $await(seedAnimate());
      $await(growAnimate());
      $await(flowAnimate());
      $await(moveAnimate());
      $await(jumpAnimate());
    }));

    runAsync().start();
  }
})();
