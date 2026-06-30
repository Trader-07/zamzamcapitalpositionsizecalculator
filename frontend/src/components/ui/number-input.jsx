import React from 'react';
import { cn } from '../../lib/utils';

/**
 * NumberInput - supports null (empty) and decimal values.
 * Stores its own string state to allow intermediate typing like "" or "12.".
 */
const NumberInput = React.forwardRef(
  (
    {
      value,
      onChange,
      prefix,
      suffix,
      placeholder,
      step = 'any',
      min,
      max,
      disabled,
      className,
      id,
      ariaLabel,
      inputClassName,
    },
    ref
  ) => {
    // Sync external numeric value into a local string for display.
    const [text, setText] = React.useState(() =>
      value === null || value === undefined || Number.isNaN(value) ? '' : String(value)
    );
    const lastEmittedRef = React.useRef(value);

    React.useEffect(() => {
      // If external value changes (e.g. linked field), update text
      if (value === lastEmittedRef.current) return;
      const next =
        value === null || value === undefined || Number.isNaN(value) ? '' : String(value);
      setText(next);
      lastEmittedRef.current = value;
    }, [value]);

    const handleChange = (e) => {
      const raw = e.target.value;
      // Allow only digits, single dot, optional minus
      if (raw === '' || /^-?\d*\.?\d*$/.test(raw)) {
        setText(raw);
        let parsed;
        if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
          parsed = null;
        } else {
          const n = Number(raw);
          parsed = Number.isNaN(n) ? null : n;
        }
        lastEmittedRef.current = parsed;
        onChange && onChange(parsed);
      }
    };

    return (
      <div
        className={cn(
          'group relative flex items-stretch w-full rounded-xl border bg-white/70 backdrop-blur transition-all duration-200',
          'border-slate-200 hover:border-emerald-300',
          'focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
      >
        {prefix && (
          <div className="flex items-center justify-center px-3 text-slate-500 font-medium border-r border-slate-100 select-none">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          aria-label={ariaLabel}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          step={step}
          min={min}
          max={max}
          className={cn(
            'flex-1 bg-transparent outline-none px-3 py-3 text-slate-900 placeholder:text-slate-400 text-base font-medium tabular-nums',
            inputClassName
          )}
        />
        {suffix && (
          <div className="flex items-center justify-center px-3 text-slate-500 font-medium border-l border-slate-100 select-none">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
NumberInput.displayName = 'NumberInput';

export default NumberInput;
