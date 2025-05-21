(function () {
  const canvas = document.getElementById("canvas");
  const mainDiv = document.getElementById("main");
  const nameForm = document.getElementById("name-form");

  // Ẩn phần nhập tên và hiển thị vùng chính
  nameForm.style.display = "none";
  canvas.style.display = "block";
  mainDiv.style.display = "block";

  const imageList = [
    "flower/flower1.png",
    "flower/flower2.png",
    "flower/flower3.png",
    "flower/flower4.png"
  ];

  // Chờ 3 giây rồi tự gieo
  setTimeout(() => {
    const tree = new LoveTree(canvas, imageList, function () {
      tree.plant(30);
      tree.startFalling();

      // Hiển thị thư
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
  }, 3000); // 3 giây
})();
