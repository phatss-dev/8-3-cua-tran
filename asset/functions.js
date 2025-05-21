
function typewriter(elementId, lines, lineIndex, speed) {
  if (lineIndex >= lines.length) return;

  let content = '';
  let i = 0;
  const el = document.getElementById(elementId);

  function typeLine() {
    if (i <= lines[lineIndex].length) {
      el.innerHTML = content + lines[lineIndex].substring(0, i) + "_";
      i++;
      setTimeout(typeLine, speed);
    } else {
      el.innerHTML = content + lines[lineIndex] + "<br/>";
      setTimeout(() => {
        typewriter(elementId, lines, lineIndex + 1, speed);
      }, 400);
    }
  }

  typeLine();
}
