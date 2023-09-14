const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#spongebobText");
const bottomTextInput = document.querySelector("#bottomTextInput");

let image = new Image();

image.src = "https://pyxis.nymag.com/v1/imgs/09c/923/65324bb3906b6865f904a72f8f8a908541-16-spongebob-explainer.rhorizontal.w700.jpg";

image.addEventListener("load", () => {
  // Update the canvas with the image once it's loaded
  updateMemeCanvas(canvas, image, topTextInput.value);
});

topTextInput.addEventListener("input", () => {
  updateMemeCanvas(canvas, image, topTextInput.value);
  const spongebobMockedText = randomizeLetterCase(topTextInput.value);
  bottomTextInput.value = spongebobMockedText; // Set the generated mock text to the bottom text input
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
          context.strokeText(line, x, y);
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
      }
      else {
          line = testLine;
      }
  }
  context.strokeText(line, x, y);
  context.fillText(line, x, y);
}

function updateMemeCanvas(canvas, image, spongebobText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const padding = fontSize / 2; // Adjust this padding as necessary

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Position text horizontally at center and vertically at top with some padding
  const textX = width / 2;
  const textY = padding;

  ctx.textBaseline = "top";  // This makes the vertical alignment of the text to its top.

  // Add Spongebob Mock text with randomized letter case
  const spongebobMockedText = randomizeLetterCase(spongebobText);
  wrapText(ctx, spongebobMockedText, textX, textY, width - 2 * padding, fontSize + padding / 2);
  
}

function randomizeLetterCase(text) {
  // Helper function to randomize letter case in a string
  return text
    .split("")
    .map((char) => (Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()))
    .join("");
}
