import React from 'react';
import NumberInput from './ui/number-input';
import AnimatedNumber from './AnimatedNumber';
import Reveal from './Reveal';
import { DEFAULT_VALUES, RR_RATIOS } from '../lib/mock';
import { formatINR, formatPercent } from '../lib/format';
import { Target, TrendingUp, BarChart3, IndianRupee, ShieldAlert, AlertTriangle, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

const RatioPill = ({ value, selected, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'relative px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-200',
      selected
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 -translate-y-0.5'
        : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
    )}
  >
    1:{value}
  </button>
);

const TargetCard = ({ ratio, targetPrice, profit, profitPct, isSelected, onClick, delay = 0 }) => (
  <Reveal delay={delay}>
    <button
      onClick={onClick}
      className={cn(
        'w-full group relative text-left rounded-2xl p-5 md:p-6 border transition-all duration-300 overflow-hidden h-full',
        isSelected
          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-500/15 -translate-y-1'
          : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5'
      )}
    >
      {isSelected && (
        <span className="absolute -top-2 left-5 inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          SELECTED
        </span>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'h-10 w-10 rounded-xl grid place-items-center transition-colors',
            isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200'
          )}>
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target {ratio}</div>
            <div className="text-base md:text-lg font-bold text-slate-900">1:{ratio} Ratio</div>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-emerald-600" />
      </div>
      <div className="mt-5 space-y-2.5">
        <Row label="Target Price" value={<AnimatedNumber value={targetPrice} decimals={2} prefix="₹" />} />
        <Row label="Potential Profit (per share)" value={<AnimatedNumber value={profit} decimals={2} prefix="+₹" />} highlight />
        <Row label="Profit %" value={<AnimatedNumber value={profitPct} decimals={2} prefix="+" suffix="%" />} highlight />
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            isSelected ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-emerald-300 to-teal-300'
          )}
          style={{ width: `${Math.min(100, ratio * 25)}%` }}
        />
      </div>
    </button>
  </Reveal>
);

const Row = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-slate-500">{label}</span>
    <span className={cn('font-bold tabular-nums', highlight ? 'text-emerald-700' : 'text-slate-900')}>{value}</span>
  </div>
);

// Risk vs Reward visualizer - vertical bars
const RRVisualizer = ({ riskPerShare, ratio }) => {
  const reward = riskPerShare * ratio;
  const max = Math.max(riskPerShare, reward, 1);
  const rh = (riskPerShare / max) * 100;
  const rwh = (reward / max) * 100;
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Scale className="w-4 h-4 text-emerald-600" />
          Risk vs Reward
        </div>
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-full px-2.5 py-1">
          1 : {ratio}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 items-end h-40">
        {/* Risk bar */}
        <div className="flex flex-col items-center justify-end h-full">
          <div className="text-[11px] font-bold text-rose-700 tabular-nums mb-1">
            <AnimatedNumber value={riskPerShare} decimals={2} prefix="₹" />
          </div>
          <div className="relative w-full max-w-[80px] bg-rose-100/60 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-lg transition-[height] duration-700 ease-out"
              style={{ height: `${rh}%` }}
            />
          </div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-rose-600 mt-2">Risk</div>
        </div>
        {/* Reward bar */}
        <div className="flex flex-col items-center justify-end h-full">
          <div className="text-[11px] font-bold text-emerald-700 tabular-nums mb-1">
            <AnimatedNumber value={reward} decimals={2} prefix="₹" />
          </div>
          <div className="relative w-full max-w-[80px] bg-emerald-100/60 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-[height] duration-700 ease-out"
              style={{ height: `${rwh}%` }}
            />
          </div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 mt-2">Reward</div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
        For every ₹1 risked, you stand to gain <span className="font-bold text-emerald-700">₹{ratio}</span> if the trade hits the target.
      </div>
    </div>
  );
};

const ProfitTargets = () => {
  const [entryPrice, setEntryPrice] = React.useState(DEFAULT_VALUES.entryPrice);
  const [stopLossPrice, setStopLossPrice] = React.useState(DEFAULT_VALUES.stopLossPrice);
  const [selectedRatio, setSelectedRatio] = React.useState(3);

  const errors = {
    entryPrice: entryPrice !== null && entryPrice <= 0 ? 'Entry price must be greater than 0' : '',
    stopLossPrice:
      stopLossPrice !== null && entryPrice !== null && (stopLossPrice <= 0 || stopLossPrice >= entryPrice)
        ? 'Stop loss must be below entry price'
        : '',
  };

  const isValid = entryPrice && stopLossPrice && entryPrice > 0 && stopLossPrice > 0 && stopLossPrice < entryPrice;
  const riskPerShare = isValid ? entryPrice - stopLossPrice : 0;
  const downsidePct = isValid ? (riskPerShare / entryPrice) * 100 : 0;

  const targets = RR_RATIOS.map((r) => {
    const target = isValid ? entryPrice + r * riskPerShare : 0;
    const profit = isValid ? target - entryPrice : 0;
    const pct = isValid && entryPrice > 0 ? (profit / entryPrice) * 100 : 0;
    return { ratio: r, targetPrice: target, profit, profitPct: pct };
  });

  return (
    <section id="analysis" className="relative py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-teal-50/40 to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <Reveal className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-700 text-xs md:text-sm font-semibold">
            <Target className="w-3.5 h-3.5" /> Profit Planning
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Potential <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Profit Targets</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Set your risk-reward ratio and discover optimal profit targets for your trades.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* LEFT - Params + RR + Visualizer */}
          <Reveal className="lg:col-span-5" delay={80}>
            <div className="h-full rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-5 sm:p-6 md:p-7 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-5">Trade Parameters</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" /> Entry Price
                  </label>
                  <NumberInput value={entryPrice} onChange={setEntryPrice} prefix="₹" placeholder="1500.00" />
                  {errors.entryPrice && (
                    <div className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" />{errors.entryPrice}</div>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" /> Stop Loss Price
                  </label>
                  <NumberInput value={stopLossPrice} onChange={setStopLossPrice} prefix="₹" placeholder="1450.00" />
                  {errors.stopLossPrice && (
                    <div className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" />{errors.stopLossPrice}</div>
                  )}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100 p-5">
                <div className="text-[11px] uppercase font-bold tracking-wider text-rose-700">Risk Per Share</div>
                <div className="mt-1 text-2xl md:text-3xl font-extrabold text-rose-700 tabular-nums">
                  <AnimatedNumber value={riskPerShare} decimals={2} prefix="₹" />
                </div>
                <div className="text-xs text-rose-600/80 mt-1">
                  {formatPercent(downsidePct)} downside from entry
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Select Risk : Reward Ratio</h4>
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {RR_RATIOS.map((r) => (
                    <RatioPill key={r} value={r} selected={selectedRatio === r} onClick={() => setSelectedRatio(r)} />
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Selected: Risk 1 unit for <span className="font-semibold text-emerald-700">{selectedRatio} units</span> of reward
                </p>
              </div>

              {/* Visualizer fills remaining height */}
              <div className="mt-5 flex-1 flex">
                <div className="w-full">
                  <RRVisualizer riskPerShare={riskPerShare} ratio={selectedRatio} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT - Targets + Summary */}
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5 auto-rows-fr">
              {targets.map((t, i) => (
                <TargetCard
                  key={t.ratio}
                  ratio={t.ratio}
                  targetPrice={t.targetPrice}
                  profit={t.profit}
                  profitPct={t.profitPct}
                  isSelected={selectedRatio === t.ratio}
                  onClick={() => setSelectedRatio(t.ratio)}
                  delay={120 + i * 80}
                />
              ))}
            </div>

            <Reveal delay={400} className="flex-1">
              <div className="h-full rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)] p-5 sm:p-6 md:p-7 flex flex-col">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                    <BarChart3 className="w-4 h-4" />
                  </span>
                  Profit Target Summary
                </h3>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        <th className="py-2 pr-4">Ratio</th>
                        <th className="py-2 pr-4">Target Price</th>
                        <th className="py-2 pr-4">Profit (₹)</th>
                        <th className="py-2">Profit (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {targets.map((t) => (
                        <tr
                          key={t.ratio}
                          onClick={() => setSelectedRatio(t.ratio)}
                          className={cn(
                            'transition-colors hover:bg-emerald-50/40 cursor-pointer',
                            selectedRatio === t.ratio && 'bg-emerald-50/60'
                          )}
                        >
                          <td className="py-3 pr-4 font-bold text-slate-700">1:{t.ratio}</td>
                          <td className="py-3 pr-4 tabular-nums text-slate-800">{formatINR(t.targetPrice, { decimals: 2 })}</td>
                          <td className="py-3 pr-4 tabular-nums font-semibold text-emerald-700">+{formatINR(t.profit, { decimals: 2 })}</td>
                          <td className="py-3 tabular-nums font-semibold text-emerald-700">
                            <span className="inline-flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5" /> +{formatPercent(t.profitPct)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitTargets;
