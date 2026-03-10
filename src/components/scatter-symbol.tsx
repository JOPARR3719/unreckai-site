export function ScatterSymbol({ size = 20, className = "", mono = false }: { size?: number; className?: string; mono?: boolean }) {
  const gap = size * 0.075;
  const sq = (size - gap * 2) / 3;
  const r = sq * 0.30;
  const strokeWidth = Math.max(size * 0.05, 0.5);
  const fillColor = "#1A2028";

  // Gradient stops: green → cyan → purple
  const green = [0x3b, 0xe8, 0xb0];
  const cyan = [0x1a, 0xaf, 0xd0];
  const purple = [0x9b, 0x8f, 0xff];

  function blend(a: number[], b: number[], f: number): string {
    const r = Math.round(a[0] + (b[0] - a[0]) * f);
    const g = Math.round(a[1] + (b[1] - a[1]) * f);
    const bl = Math.round(a[2] + (b[2] - a[2]) * f);
    return `rgb(${r},${g},${bl})`;
  }

  function strokeColor(row: number, col: number): string {
    const t = (row + col) / 4; // 0.0 ... 1.0 diagonally
    if (t <= 0.5) {
      return blend(green, cyan, t / 0.5);
    } else {
      return blend(cyan, purple, (t - 0.5) / 0.5);
    }
  }

  const squares = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      squares.push({
        x: col * (sq + gap),
        y: row * (sq + gap),
        stroke: strokeColor(row, col),
      });
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      {squares.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={sq}
          height={sq}
          rx={r}
          fill={fillColor}
          stroke={mono ? "currentColor" : s.stroke}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}
