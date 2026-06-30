import React from 'react';

/**
 * Animates a numeric value smoothly. Supports decimals.
 */
const AnimatedNumber = ({
  value,
  decimals = 0,
  duration = 600,
  format,
  className,
  prefix = '',
  suffix = '',
}) => {
  const [display, setDisplay] = React.useState(value || 0);
  const fromRef = React.useRef(value || 0);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    const target = Number.isFinite(value) ? value : 0;
    const from = fromRef.current;
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      setDisplay(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  const formatted = format
    ? format(display)
    : new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      }).format(display);

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
