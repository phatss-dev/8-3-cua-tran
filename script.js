function startLove() {
  const boy = document.getElementById('boyName').value.trim();
  const girl = document.getElementById('girlName').value.trim();
  if (!boy || !girl) {
    alert('Hãy nhập đủ tên hai người!');
    return;
  }

  document.getElementById('person1').classList.remove('hidden');
  document.getElementById('person2').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('seed').classList.remove('hidden');
  }, 1000);

  setTimeout(() => {
    document.getElementById('tree').classList.remove('hidden');
    document.getElementById('bgMusic').play();
  }, 3000);

  setTimeout(() => {
    document.getElementById('loveLetter').classList.remove('hidden');
  }, 5000);

  setTimeout(() => {
    showGifts();
  }, 6000);
}

function showGifts() {
  const giftArea = document.getElementById('giftArea');
  const gifts = [
    { img: 'images/image1.jpg', text: 'Kỷ niệm đầu tiên' },
    { img: 'images/image2.jpg', text: 'Lúc em cười' },
    { img: 'images/image3.jpg', text: 'Nhớ khoảnh khắc này' }
  ];

  gifts.forEach((gift, index) => {
    const giftBox = document.createElement('div');
    giftBox.className = 'gift-box';

    const giftImg = document.createElement('img');
    giftImg.src = `images/gift${index+1}.png`;
    giftBox.appendChild(giftImg);

    const content = document.createElement('div');
    content.className = 'gift-content';
    content.innerHTML = `<img src="${gift.img}" width="100%" /><p>${gift.text}</p>`;
    giftBox.appendChild(content);

    giftImg.onclick = () => {
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    };

    giftArea.appendChild(giftBox);
  });
}
