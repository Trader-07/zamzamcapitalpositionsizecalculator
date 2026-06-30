import React from 'react';
import { cn } from '../lib/utils';

/**
 * Animated interactive Donut Chart (pure SVG, no deps).
 * Props:
 *  - segments: [{ key, label, value, color }]
 *  - centerLabel, centerValue (React nodes)
 *  - size (px)
 *  - thickness (px)
 */
const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

const DonutChart = ({
  segments = [],
  size = 240,
  thickness = 26,
  centerLabel,
  centerValue,
  centerSub,
}) => {
  const [hovered, setHovered] = React.useState(null);
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;

  // animate by progress
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 800;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // re-run when total changes
  }, [total, segments.map((s) => s.value).join(',')]);

  let accum = 0;
  const arcs = segments.map((seg) => {
    const portion = total > 0 ? (Math.max(0, seg.value) / total) : 0;
    const startAngle = accum * 360;
    const endAngle = startAngle + portion * 360 * progress;
    accum += portion;
    return { ...seg, startAngle, endAngle, portion };
  });

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-[0_8px_24px_rgba(13,148,136,0.18)]"
        >
          <defs>
            {segments.map((s) => (
              <linearGradient id={`grad-${s.key}`} key={`grad-${s.key}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor={s.colorFrom || s.color} />
                <stop offset="100%" stopColor={s.colorTo || s.color} />
              </linearGradient>
            ))}
          </defs>

          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />

          {/* Arcs */}
          {arcs.map((a) => {
            if (a.endAngle - a.startAngle < 0.0001) return null;
            // Avoid full-circle as path issue
            const ea = Math.min(a.endAngle, a.startAngle + 359.999);
            const isHover = hovered === a.key;
            return (
              <path
                key={a.key}
                d={describeArc(cx, cy, r, a.startAngle, ea)}
                fill="none"
                stroke={`url(#grad-${a.key})`}
                strokeWidth={isHover ? thickness + 6 : thickness}
                strokeLinecap="round"
                onMouseEnter={() => setHovered(a.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  transition: 'stroke-width 220ms ease',
                  cursor: 'pointer',
                  filter: isHover ? 'brightness(1.05)' : 'none',
                }}
              />
            );
          })}
        </svg>

        {/* Center label - absolutely positioned inside SVG wrapper only */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
          <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {hovered ? segments.find((s) => s.key === hovered)?.label : centerLabel}
          </div>
          <div className="mt-1 text-xl md:text-2xl font-extrabold text-slate-900 tabular-nums leading-tight">
            {hovered
              ? formatAuto(segments.find((s) => s.key === hovered)?.value)
              : centerValue}
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500 tabular-nums">
            {hovered
              ? `${((segments.find((s) => s.key === hovered).value / Math.max(1, total)) * 100).toFixed(1)}% of total`
              : centerSub}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {segments.map((s) => (
          <button
            key={s.key}
            type="button"
            onMouseEnter={() => setHovered(s.key)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'group inline-flex items-center gap-2 text-xs md:text-sm font-medium rounded-full px-2.5 py-1.5 transition-colors',
              hovered === s.key ? 'bg-slate-100' : 'hover:bg-slate-50'
            )}
          >
            <span
              className="h-3 w-3 rounded-full ring-2 ring-white shadow"
              style={{
                background: `linear-gradient(135deg, ${s.colorFrom || s.color}, ${s.colorTo || s.color})`,
              }}
            />
            <span className="text-slate-700">{s.label}</span>
            <span className="text-slate-400 tabular-nums">
              {total > 0 ? `${((s.value / total) * 100).toFixed(1)}%` : '—'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const formatAuto = (v) => {
  if (v === undefined || v === null || Number.isNaN(v)) return '—';
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(v))}`;
};

export default DonutChart;
