function startLoveTree() {
  const name1 = document.getElementById("name1").value.toLowerCase();
  const name2 = document.getElementById("name2").value.toLowerCase();

  if (name1.includes("phát") && name2.includes("trân")) {
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
    spawnGifts();
  } else {
    alert("Tên không đúng!");
  }
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

function spawnGifts() {
  const giftPositions = [10, 30, 50, 70, 90];
  giftPositions.forEach(pos => {
    const gift = document.createElement("div");
    gift.className = "gift-effect";
    gift.style.left = pos + "vw";
    gift.style.top = Math.random() * 300 + "px";

    gift.innerHTML = \`
      <div class="gift-lid"></div>
      <div class="gift-box"></div>
      <div class="gift-content">
        <img src="images/img_\${pos}.jpg" width="100" /><br>
        <small>Khoảnh khắc đáng nhớ</small>
      </div>
    \`;

    gift.onclick = () => {
      gift.classList.toggle("open");
      const content = gift.querySelector(".gift-content");
      content.style.display = content.style.display === "block" ? "none" : "block";
    };

    document.getElementById("animation-area").appendChild(gift);
  });
}
