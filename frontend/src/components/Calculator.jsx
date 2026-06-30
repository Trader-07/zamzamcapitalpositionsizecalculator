import React from 'react';
import NumberInput from './ui/number-input';
import AnimatedNumber from './AnimatedNumber';
import { DEFAULT_VALUES } from '../lib/mock';
import { formatINR, formatNumber, formatPercent } from '../lib/format';
import {
  Wallet, Percent, IndianRupee, ShieldAlert, AlertTriangle,
  CheckCircle2, Coins, PieChart, Hash, TrendingDown, Sparkles,
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
  <div className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all">
    <div className={cn('h-8 w-8 md:h-9 md:w-9 flex-shrink-0 rounded-full grid place-items-center text-xs font-bold text-white shadow-sm', accent || 'bg-emerald-500')}>
      {n}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="text-xs text-slate-500 tabular-nums truncate">{expression}</div>
    </div>
    <div className="text-right font-bold text-slate-900 tabular-nums whitespace-nowrap text-sm md:text-base">{value}</div>
  </div>
);

const KPI = ({ icon: Icon, label, value, tone = 'emerald' }) => {
  const tones = {
    emerald: 'from-emerald-50 to-teal-50 text-emerald-700 ring-emerald-100',
    rose: 'from-rose-50 to-orange-50 text-rose-700 ring-rose-100',
    slate: 'from-slate-50 to-white text-slate-700 ring-slate-200',
    amber: 'from-amber-50 to-yellow-50 text-amber-700 ring-amber-100',
  };
  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-gradient-to-br ring-1 p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow', tones[tone])}>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-xl bg-white/70 grid place-items-center shadow-sm">
          <Icon className="w-4.5 h-4.5" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">{label}</div>
      </div>
      <div className="text-xl md:text-2xl font-extrabold tabular-nums text-slate-900">{value}</div>
    </div>
  );
};

const Calculator = () => {
  const [portfolioSize, setPortfolioSize] = React.useState(DEFAULT_VALUES.portfolioSize);
  const [riskPercent, setRiskPercent] = React.useState(DEFAULT_VALUES.riskPercent);
  const [entryPrice, setEntryPrice] = React.useState(DEFAULT_VALUES.entryPrice);
  const [mode, setMode] = React.useState('price'); // 'price' | 'percent'
  const [stopLossPrice, setStopLossPrice] = React.useState(DEFAULT_VALUES.stopLossPrice);
  const [stopLossPercent, setStopLossPercent] = React.useState(DEFAULT_VALUES.stopLossPercent);

  // Sync price <-> percent when entry changes
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

  // Validation
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
  const remaining = (portfolioSize || 0) - investment;
  const slDistance = riskPerShare;
  const slPercent = isValid && entryPrice > 0 ? (riskPerShare / entryPrice) * 100 : 0;

  const utilTone = utilization > 75 ? 'rose' : utilization > 50 ? 'amber' : 'emerald';
  const utilMsg =
    utilization > 75
      ? 'High capital utilization. Consider reducing position size.'
      : utilization > 50
      ? 'Moderate utilization. Stay disciplined with your risk plan.'
      : utilization > 0
      ? 'Healthy capital utilization. Stick to your plan.'
      : 'Enter valid inputs to see results.';

  return (
    <section id="calculator" className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/30 to-white" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <Pill className="bg-emerald-100/70 border border-emerald-200 text-emerald-700">
            <Sparkles className="w-3.5 h-3.5" /> Position Sizing
          </Pill>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Position Size <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Calculator</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Enter your trading parameters below and get instant calculations for optimal position sizing.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* INPUTS */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Trading Parameters</h3>
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
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    Stop Loss
                  </label>
                  <div className="inline-flex p-1 rounded-xl bg-slate-100">
                    <button
                      onClick={() => setMode('price')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
                        mode === 'price' ? 'bg-white text-emerald-700 shadow' : 'text-slate-500 hover:text-slate-700'
                      )}
                    >
                      Price (₹)
                    </button>
                    <button
                      onClick={() => setMode('percent')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
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

                <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Stop Loss Distance
                  </span>
                  <span className="text-sm font-bold text-emerald-700 tabular-nums">
                    {formatINR(slDistance, { decimals: 2 })} ({formatPercent(slPercent)})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="lg:col-span-7 space-y-6">
            {/* Steps */}
            <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                Calculation Steps
              </h3>
              <div className="space-y-3">
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

            {/* Utilization */}
            <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                    <PieChart className="w-4 h-4" />
                  </span>
                  Capital Utilization
                </h3>
                <div className="text-right">
                  <div className="text-xl md:text-2xl font-extrabold text-slate-900 tabular-nums">
                    <AnimatedNumber value={utilization} decimals={1} suffix="%" />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Utilized</div>
                </div>
              </div>

              <div className="relative h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-[width] duration-700 ease-out',
                    utilization > 75 ? 'bg-gradient-to-r from-rose-500 to-orange-500' :
                    utilization > 50 ? 'bg-gradient-to-r from-amber-400 to-orange-400' :
                    'bg-gradient-to-r from-emerald-500 to-teal-500'
                  )}
                  style={{ width: `${Math.min(100, Math.max(0, utilization))}%` }}
                />
              </div>

              <div className={cn(
                'mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium border',
                utilization > 75 ? 'bg-rose-50 text-rose-700 border-rose-100' :
                utilization > 50 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                'bg-emerald-50 text-emerald-700 border-emerald-100'
              )}>
                {utilization > 50 ? <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <span>{utilMsg}</span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 md:gap-4">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 md:p-4">
                  <div className="text-[10px] md:text-xs uppercase font-semibold tracking-wider text-slate-500">Capital Used</div>
                  <div className="mt-1 text-base md:text-xl font-bold text-slate-900 tabular-nums">
                    <AnimatedNumber value={investment} prefix="₹" />
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 md:p-4">
                  <div className="text-[10px] md:text-xs uppercase font-semibold tracking-wider text-emerald-700">Remaining</div>
                  <div className="mt-1 text-base md:text-xl font-bold text-emerald-700 tabular-nums">
                    <AnimatedNumber value={remaining} prefix="₹" />
                  </div>
                </div>
                <div className="rounded-xl bg-rose-50 border border-rose-100 p-3 md:p-4">
                  <div className="text-[10px] md:text-xs uppercase font-semibold tracking-wider text-rose-700">Risk Amount</div>
                  <div className="mt-1 text-base md:text-xl font-bold text-rose-700 tabular-nums">
                    <AnimatedNumber value={riskAmount} prefix="₹" />
                  </div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <KPI icon={Hash} label="Quantity to Buy" value={<AnimatedNumber value={quantity} suffix=" shares" />} tone="emerald" />
              <KPI icon={IndianRupee} label="Investment Amount" value={<AnimatedNumber value={investment} prefix="₹" />} tone="slate" />
              <KPI icon={ShieldAlert} label="Risk Amount" value={<AnimatedNumber value={riskAmount} prefix="₹" />} tone="rose" />
              <KPI icon={Percent} label="Capital Utilized" value={<AnimatedNumber value={utilization} decimals={1} suffix="%" />} tone={utilTone} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
