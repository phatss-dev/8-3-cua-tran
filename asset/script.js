window.onload = function () {
  const canvas = document.getElementById("canvas");
  const mainDiv = document.getElementById("main");
  const nameForm = document.getElementById("name-form");

  // Ẩn form, hiện canvas
  nameForm.style.display = "none";
  canvas.style.display = "block";
  mainDiv.style.display = "block";

  const imageList = [
    "flower/flower1.png",
    "flower/flower2.png",
    "flower/flower3.png",
    "flower/flower4.png"
  ];

  // Sau 3 giây, tự gieo hạt
  setTimeout(() => {
    const tree = new LoveTree(canvas, imageList, function () {
      tree.plant(30);
      tree.startFalling();

      // Sau 2.5s hiện thư
      setTimeout(() => {
        const letterBox = document.getElementById("letter-box");
        letterBox.classList.add("show");

        typewriter("letter-content", [
          "Gửi bạn thân mến,",
          "",
          "Chúc bạn mãi hạnh phúc, luôn cười thật tươi.",
          "Cảm ơn vì đã là một phần trong thế giới của mình!",
          "",
          "-- Một ai đó rất quan tâm bạn --"
        ], 0, 80);
      }, 2500);
    });
  }, 3000);
};
