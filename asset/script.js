(function () {
  const plantButton = document.getElementById("plantButton");
  const nameForm = document.getElementById("name-form");
  const canvas = document.getElementById("canvas");
  const mainDiv = document.getElementById("main");

  plantButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn reload khi bấm nút
    nameForm.style.display = "none";
    canvas.style.display = "block";
    mainDiv.style.display = "block";

    // Khởi động LoveTree sau khi bấm nút
    const imageList = [
      "flower/flower1.png",
      "flower/flower2.png",
      "flower/flower3.png",
      "flower/flower4.png"
    ];

    const tree = new LoveTree(canvas, imageList, function () {
      tree.plant(30); // Trồng 30 bông hoa
    });
  });
})();
