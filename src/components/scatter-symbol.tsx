export function ScatterSymbol({ size = 20, className = "" }: { size?: number; className?: string }) {
  const gap = size * 0.075;
  const sq = (size - gap * 2) / 3;
  const r = sq * 0.22;

  const positions = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      positions.push({ x: col * (sq + gap), y: row * (sq + gap) });
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      {positions.map((pos, i) => (
        <rect key={i} x={pos.x} y={pos.y} width={sq} height={sq} rx={r} fill="currentColor" />
      ))}
    </svg>
  );
}
