export function ScatterSymbol({ size = 20, className = "", mono = false, filled = false }: { size?: number; className?: string; mono?: boolean; filled?: boolean }) {
  const gap = size * 0.075;
  const sq = (size - gap * 2) / 3;
  const r = sq * 0.30;
  const strokeWidth = Math.max(size * 0.05, 0.5);
  const fillColor = "#0a0d10";

  const squares = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      squares.push({
        x: col * (sq + gap),
        y: row * (sq + gap),
      });
    }
  }

  // filled mode: currentColor fill + gradient stroke (for Corrected Preview card)
  // mono mode: transparent fill + currentColor stroke
  // default: dark fill + gradient stroke
  const useGradient = !mono;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      {useGradient && (
        <defs>
          <linearGradient id={`scatter-grad-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="15%" stopColor="#3be8b0" />
            <stop offset="45%" stopColor="#1aafd0" />
            <stop offset="80%" stopColor="#9B8FFF" />
          </linearGradient>
        </defs>
      )}
      {squares.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={sq}
          height={sq}
          rx={r}
          fill={mono ? "transparent" : filled ? "currentColor" : fillColor}
          stroke={mono ? "currentColor" : `url(#scatter-grad-${size})`}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}
