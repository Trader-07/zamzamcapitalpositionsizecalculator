import React from 'react';
import { cn } from '../lib/utils';

/**
 * Reveal - fade/slide in on scroll using IntersectionObserver.
 * Props:
 *  - delay (ms)
 *  - y (px translate)
 *  - once (boolean)
 *  - as (tag)
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  as: As = 'div',
  threshold = 0.12,
}) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  return (
    <As
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </As>
  );
};

export default Reveal;
