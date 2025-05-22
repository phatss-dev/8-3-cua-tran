function startLoveTree() {
  document.getElementById("person1").style.display = "block";
  document.getElementById("person2").style.display = "block";

  setTimeout(() => {
    document.getElementById("seed").style.display = "block";
  }, 2000);

  setTimeout(() => {
    document.getElementById("tree").style.display = "block";
    document.getElementById("bg-music").play();
  }, 4000);

  setTimeout(() => {
    document.getElementById("letter").style.display = "block";
  }, 6500);

  startHeartRain();
  createGiftBoxes();
}

function startHeartRain() {
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-rain";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 3 + "s";
    document.body.appendChild(heart);
    setTimeout(() => document.body.removeChild(heart), 5000);
  }, 200);
}

function createGiftBoxes() {
  const gifts = [
    { img: "images/img1.jpg", text: "Khoảnh khắc dễ thương" },
    { img: "images/img2.jpg", text: "Nụ cười của em" },
    { img: "images/img3.jpg", text: "Kỷ niệm đáng nhớ" }
  ];

  gifts.forEach((gift, index) => {
    const giftBox = document.createElement("div");
    giftBox.className = "gift-box";
    giftBox.style.left = `${20 + index * 30}vw`;

    giftBox.innerHTML = `
      <div class="gift-lid"></div>
      <div class="gift-content">
        <img src="${gift.img}" alt="gift-img" />
        <small>${gift.text}</small>
      </div>
    `;

    giftBox.onclick = () => {
      giftBox.classList.toggle("open");
    };

    document.getElementById("animation-area").appendChild(giftBox);
  });
}
