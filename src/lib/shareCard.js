export function drawShareCard({ title, big, unit, insight, accent }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1000, 1000);
  grad.addColorStop(0, '#0b0f14');
  grad.addColorStop(1, '#121822');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1000, 1000);

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, 920, 920);

  ctx.fillStyle = accent;
  ctx.font = '600 28px "IBM Plex Mono", monospace';
  ctx.fillText('SIGNAL', 70, 120);

  ctx.fillStyle = '#7c8a99';
  ctx.font = '400 24px "Space Grotesk", sans-serif';
  ctx.fillText(title, 70, 165);

  ctx.fillStyle = accent;
  ctx.font = '700 220px "IBM Plex Mono", monospace';
  ctx.fillText(String(big), 65, 470);

  ctx.fillStyle = '#e8ecef';
  ctx.font = '500 34px "Space Grotesk", sans-serif';
  ctx.fillText(unit, 70, 530);

  ctx.fillStyle = '#e8ecef';
  ctx.font = '400 30px "Space Grotesk", sans-serif';
  wrapText(ctx, insight, 70, 620, 840, 42);

  ctx.fillStyle = '#7c8a99';
  ctx.font = '400 22px "IBM Plex Mono", monospace';
  ctx.fillText('play at this link', 70, 930);

  return canvas.toDataURL('image/png');
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

export function downloadCard(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}