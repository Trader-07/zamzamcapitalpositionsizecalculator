import React from 'react';
import NumberInput from './ui/number-input';
import AnimatedNumber from './AnimatedNumber';
import DonutChart from './DonutChart';
import Reveal from './Reveal';
import { DEFAULT_VALUES } from '../lib/mock';
import { formatINR, formatPercent } from '../lib/format';
import {
  Wallet, Percent, IndianRupee, ShieldAlert, AlertTriangle,
  CheckCircle2, Coins, Hash, TrendingDown, Sparkles, Activity,
} from 'lucide-react';
import { cn } from '../lib/utils';

const Pill = ({ children, className }) => (
  <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold', className)}>{children}</span>
);

const Field = ({ id, label, icon: Icon, error, children, hint }) => (
  <div>
    <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
      {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
      {label}
    </label>
    {children}
    <div className="mt-1.5 min-h-[18px] text-xs flex items-center gap-1.5">
      {error ? (
        <span className="text-rose-600 font-medium flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          {error}
        </span>
      ) : (
        hint && <span className="text-slate-400">{hint}</span>
      )}
    </div>
  </div>
);

const StepRow = ({ n, title, expression, value, accent }) => (
  <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-sm hover:-translate-y-0.5 transition-all">
    <div className={cn('h-8 w-8 md:h-9 md:w-9 flex-shrink-0 rounded-full grid place-items-center text-xs font-bold text-white shadow-sm', accent || 'bg-emerald-500')}>
      {n}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="text-[11px] md:text-xs text-slate-500 tabular-nums truncate">{expression}</div>
    </div>
    <div className="text-right font-bold text-slate-900 tabular-nums whitespace-nowrap text-sm md:text-base">{value}</div>
  </div>
);

const StatTile = ({ label, value, tone, icon: Icon }) => {
  const tones = {
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    rose: 'text-rose-700 bg-rose-50 border-rose-100',
    slate: 'text-slate-700 bg-slate-50 border-slate-100',
  };
  return (
    <div className={cn('rounded-2xl border px-3 py-3 sm:px-4 sm:py-4 flex items-center gap-2.5 sm:gap-3 transition-all hover:-translate-y-0.5 hover:shadow-sm min-w-0', tones[tone])}>
      <div className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 rounded-xl bg-white/80 grid place-items-center shadow-sm">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold opacity-80 leading-tight">{label}</div>
        <div className="text-base sm:text-lg font-extrabold tabular-nums truncate leading-tight mt-0.5">{value}</div>
      </div>
    </div>
  );
};

const Calculator = () => {
  const [portfolioSize, setPortfolioSize] = React.useState(DEFAULT_VALUES.portfolioSize);
  const [riskPercent, setRiskPercent] = React.useState(DEFAULT_VALUES.riskPercent);
  const [entryPrice, setEntryPrice] = React.useState(DEFAULT_VALUES.entryPrice);
  const [mode, setMode] = React.useState('price');
  const [stopLossPrice, setStopLossPrice] = React.useState(DEFAULT_VALUES.stopLossPrice);
  const [stopLossPercent, setStopLossPercent] = React.useState(DEFAULT_VALUES.stopLossPercent);

  React.useEffect(() => {
    if (entryPrice && entryPrice > 0) {
      if (mode === 'price' && stopLossPrice !== null && stopLossPrice > 0) {
        const pct = ((entryPrice - stopLossPrice) / entryPrice) * 100;
        setStopLossPercent(Number.isFinite(pct) ? Number(pct.toFixed(2)) : null);
      } else if (mode === 'percent' && stopLossPercent !== null) {
        const price = entryPrice * (1 - stopLossPercent / 100);
        setStopLossPrice(Number.isFinite(price) ? Number(price.toFixed(2)) : null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryPrice]);

  const onChangeStopPrice = (v) => {
    setStopLossPrice(v);
    if (v !== null && entryPrice && entryPrice > 0) {
      const pct = ((entryPrice - v) / entryPrice) * 100;
      setStopLossPercent(Number.isFinite(pct) ? Number(pct.toFixed(2)) : null);
    } else if (v === null) {
      setStopLossPercent(null);
    }
  };

  const onChangeStopPct = (v) => {
    setStopLossPercent(v);
    if (v !== null && entryPrice && entryPrice > 0) {
      const price = entryPrice * (1 - v / 100);
      setStopLossPrice(Number.isFinite(price) ? Number(price.toFixed(2)) : null);
    } else if (v === null) {
      setStopLossPrice(null);
    }
  };

  const errors = {
    portfolioSize: portfolioSize !== null && portfolioSize <= 0 ? 'Portfolio size must be greater than 0' : '',
    riskPercent:
      riskPercent !== null && (riskPercent <= 0 || riskPercent > 100)
        ? 'Risk percentage must be between 0.1 and 100'
        : '',
    entryPrice: entryPrice !== null && entryPrice <= 0 ? 'Entry price must be greater than 0' : '',
    stopLossPrice:
      stopLossPrice !== null && entryPrice !== null && (stopLossPrice <= 0 || stopLossPrice >= entryPrice)
        ? 'Stop loss must be below entry and greater than 0'
        : '',
    stopLossPercent:
      stopLossPercent !== null && (stopLossPercent <= 0 || stopLossPercent >= 100)
        ? 'Stop loss % must be between 0.01 and 100'
        : '',
  };

  const isValid =
    portfolioSize && riskPercent && entryPrice && stopLossPrice &&
    portfolioSize > 0 && riskPercent > 0 && entryPrice > 0 && stopLossPrice > 0 &&
    stopLossPrice < entryPrice;

  const riskAmount = isValid ? (portfolioSize * riskPercent) / 100 : 0;
  const riskPerShare = isValid ? entryPrice - stopLossPrice : 0;
  const quantity = isValid && riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
  const investment = quantity * (entryPrice || 0);
  const utilization = portfolioSize ? (investment / portfolioSize) * 100 : 0;
  const remaining = Math.max(0, (portfolioSize || 0) - investment);
  const slDistance = riskPerShare;
  const slPercent = isValid && entryPrice > 0 ? (riskPerShare / entryPrice) * 100 : 0;

  const overInvested = investment > (portfolioSize || 0);

  const utilMsg = overInvested
    ? `Reduce your risk % so that your Investment Amount [${formatINR(investment)}] does not exceed your Portfolio Size [${formatINR(portfolioSize || 0)}].`
    : utilization > 75
    ? 'High capital utilization. Consider reducing position size.'
    : utilization > 50
    ? 'Moderate utilization. Stay disciplined with your risk plan.'
    : utilization > 0
    ? 'Healthy capital utilization. Stick to your plan.'
    : 'Enter valid inputs to see results.';

  const segments = [
    {
      key: 'invested',
      label: 'Investment Amount',
      value: Math.max(0, investment - riskAmount),
      colorFrom: '#10b981',
      colorTo: '#14b8a6',
      color: '#10b981',
    },
    {
      key: 'risk',
      label: 'Potential Risk',
      value: Math.max(0, Math.min(riskAmount, investment)),
      colorFrom: '#f43f5e',
      colorTo: '#fb7185',
      color: '#f43f5e',
    },
    {
      key: 'remaining',
      label: 'Remaining Capital',
      value: remaining,
      colorFrom: '#cbd5e1',
      colorTo: '#94a3b8',
      color: '#cbd5e1',
    },
  ];

  return (
    <section id="calculator" className="relative py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/30 to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <Reveal className="text-center mb-10 md:mb-14">
          <Pill className="bg-emerald-100/70 border border-emerald-200 text-emerald-700">
            <Sparkles className="w-3.5 h-3.5" /> Position Sizing
          </Pill>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Position Size <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Calculator</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Enter your trading parameters below and get instant calculations for optimal position sizing.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* INPUTS */}
          <Reveal className="lg:col-span-5" delay={80}>
            <div className="h-full rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-5 sm:p-6 md:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Trading Parameters</h3>
                <Pill className="bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Coins className="w-3.5 h-3.5" /> INR ₹
                </Pill>
              </div>

              <div className="space-y-1">
                <Field id="portfolio" label="Portfolio Size" icon={Wallet} error={errors.portfolioSize} hint="Total capital you trade with">
                  <NumberInput id="portfolio" value={portfolioSize} onChange={setPortfolioSize} prefix="₹" placeholder="1,00,000" />
                </Field>

                <Field id="risk" label="Portfolio at Risk" icon={Percent} error={errors.riskPercent} hint="Max % of capital to risk per trade">
                  <NumberInput id="risk" value={riskPercent} onChange={setRiskPercent} suffix="%" placeholder="2" />
                </Field>

                <Field id="entry" label="Entry Price" icon={IndianRupee} error={errors.entryPrice} hint="Price at which you plan to buy">
                  <NumberInput id="entry" value={entryPrice} onChange={setEntryPrice} prefix="₹" placeholder="1500.00" />
                </Field>

                <div className="mt-1">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" />
                      Stop Loss
                    </label>
                    <div className="inline-flex p-1 rounded-xl bg-slate-100">
                      <button
                        onClick={() => setMode('price')}
                        className={cn(
                          'px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all',
                          mode === 'price' ? 'bg-white text-emerald-700 shadow' : 'text-slate-500 hover:text-slate-700'
                        )}
                      >
                        Price (₹)
                      </button>
                      <button
                        onClick={() => setMode('percent')}
                        className={cn(
                          'px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all',
                          mode === 'percent' ? 'bg-white text-emerald-700 shadow' : 'text-slate-500 hover:text-slate-700'
                        )}
                      >
                        Percentage (%)
                      </button>
                    </div>
                  </div>

                  {mode === 'price' ? (
                    <Field id="slp" label="" error={errors.stopLossPrice} hint="Must be below entry price">
                      <NumberInput id="slp" value={stopLossPrice} onChange={onChangeStopPrice} prefix="₹" placeholder="1450.00" />
                    </Field>
                  ) : (
                    <Field id="slpct" label="" error={errors.stopLossPercent} hint="Distance from entry as a percentage">
                      <NumberInput id="slpct" value={stopLossPercent} onChange={onChangeStopPct} suffix="%" placeholder="3.33" />
                    </Field>
                  )}

                  <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-3 sm:px-4 py-3 gap-2">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 min-w-0">
                      <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">SL Distance</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                      {formatINR(slDistance, { decimals: 2 })} ({formatPercent(slPercent)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* OUTPUTS - Donut Chart + Stats */}
          <Reveal className="lg:col-span-7" delay={140}>
            <div className="h-full rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-5 sm:p-6 md:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                    <Activity className="w-4 h-4" />
                  </span>
                  Investment Snapshot
                </h3>
                <Pill className={cn(
                  'border whitespace-nowrap',
                  overInvested ? 'bg-rose-50 text-rose-700 border-rose-100' :
                  utilization > 75 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-emerald-50 text-emerald-700 border-emerald-100'
                )}>
                  <Percent className="w-3.5 h-3.5" />
                  <AnimatedNumber value={utilization} decimals={1} suffix="% utilized" />
                </Pill>
              </div>

              {/* Stat tiles - 1 col on mobile, 3 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
                <StatTile
                  label="Investment Amount"
                  icon={IndianRupee}
                  value={<AnimatedNumber value={investment} prefix="₹" />}
                  tone="emerald"
                />
                <StatTile
                  label="Potential Risk"
                  icon={ShieldAlert}
                  value={<AnimatedNumber value={riskAmount} prefix="₹" />}
                  tone="rose"
                />
                <StatTile
                  label="Shares to Buy"
                  icon={Hash}
                  value={<AnimatedNumber value={quantity} />}
                  tone="slate"
                />
              </div>

              {/* Chart - responsive size */}
              <div className="mt-6 flex flex-col items-center justify-center flex-1">
                <ResponsiveDonut
                  segments={segments}
                  investment={investment}
                  utilization={utilization}
                  isValid={isValid}
                />
              </div>

              <div className={cn(
                'mt-5 flex items-start gap-2 rounded-xl px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium border',
                overInvested ? 'bg-rose-50 text-rose-700 border-rose-100' :
                utilization > 75 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                utilization > 50 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                'bg-slate-50 text-slate-700 border-slate-100'
              )}>
                {overInvested || utilization > 50 ? (
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <span className="leading-relaxed">{utilMsg}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Calculation Steps - full width below the grid */}
        <Reveal className="mt-5 md:mt-6" delay={120}>
          <div className="rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-5 sm:p-6 md:p-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-5 flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              Calculation Steps
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
              <StepRow
                n={1}
                title="Risk Amount"
                expression={`${formatINR(portfolioSize || 0)} × ${formatPercent(riskPercent || 0)}`}
                value={<AnimatedNumber value={riskAmount} decimals={0} prefix="₹" />}
                accent="bg-emerald-500"
              />
              <StepRow
                n={2}
                title="Risk Per Share"
                expression={`${formatINR(entryPrice || 0, { decimals: 2 })} − ${formatINR(stopLossPrice || 0, { decimals: 2 })}`}
                value={<AnimatedNumber value={riskPerShare} decimals={2} prefix="₹" />}
                accent="bg-teal-500"
              />
              <StepRow
                n={3}
                title="Quantity"
                expression={`${formatINR(riskAmount, { decimals: 0 })} ÷ ${formatINR(riskPerShare, { decimals: 2 })}`}
                value={<AnimatedNumber value={quantity} decimals={0} suffix=" shares" />}
                accent="bg-emerald-600"
              />
              <StepRow
                n={4}
                title="Investment Amount"
                expression={`${quantity} × ${formatINR(entryPrice || 0, { decimals: 2 })}`}
                value={<AnimatedNumber value={investment} decimals={0} prefix="₹" />}
                accent="bg-teal-600"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// Responsive donut wrapper that adjusts size based on container width
const ResponsiveDonut = ({ segments, investment, utilization, isValid }) => {
  const [size, setSize] = React.useState(240);
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      if (w < 380) setSize(180);
      else if (w < 480) setSize(210);
      else if (w < 768) setSize(230);
      else if (w < 1024) setSize(250);
      else setSize(260);
    };
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full flex justify-center">
      <DonutChart
        segments={segments}
        size={size}
        thickness={Math.max(20, Math.round(size * 0.11))}
        centerLabel="Investment"
        centerValue={<AnimatedNumber value={investment} prefix="₹" />}
        centerSub={isValid ? `${formatPercent(utilization, 1)} of capital` : 'Enter inputs to begin'}
      />
    </div>
  );
};

export default Calculator;
