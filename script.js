const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawCharacter(x, y, color) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y + 30, 15, 0, Math.PI * 2); // body
  ctx.fillStyle = color;
  ctx.fill();
}

function drawSeed(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "brown";
  ctx.fill();
  ctx.closePath();
}

function animatePlanting(name1, name2) {
  let y1 = -40, y2 = -40;
  let seedY = -10;
  const centerX = canvas.width / 2;

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter(centerX - 50, y1, "#f88");
    drawCharacter(centerX + 50, y2, "#8af");
    drawSeed(centerX, seedY);

    y1 += 2;
    y2 += 2;
    seedY += 2;

    if (y1 >= canvas.height - 150) {
      clearInterval(interval);
      setTimeout(startTreeGrowth, 1000);
    }
  }, 30);
}

function startTreeGrowth() {
  const audio = document.getElementById("bg-music");
  audio.play();

  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height - 150);
  ctx.lineTo(canvas.width/2, canvas.height - 250);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 8;
  ctx.stroke();

  document.getElementById("letter").classList.remove("hidden");
}

function startLoveTree() {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();
  if (!name1 || !name2) return alert("Vui lòng nhập đầy đủ tên hai người");
  document.getElementById("input-container").style.display = "none";
  animatePlanting(name1, name2);
}
