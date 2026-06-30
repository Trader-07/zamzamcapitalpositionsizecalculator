import React from 'react';
import { ArrowDown, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

const Hero = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      {/* Background ornaments */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-white" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl animate-pulse-slow" />
        <div className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl animate-pulse-slower" />
        <div className="absolute inset-0 opacity-[0.18] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,rgba(15,118,110,0.18)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/70 text-emerald-700 text-xs md:text-sm font-semibold animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" />
          Risk Management Tool
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          Position Size{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Calculator
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8 Q 75 0 150 6 T 298 6" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="mt-5 text-lg md:text-2xl text-slate-500 font-medium animate-fade-in-up" style={{ animationDelay: '160ms' }}>
          Manage Risk Like Professional Traders
        </p>

        <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-slate-600/90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '220ms' }}>
          Calculate your ideal position size based on capital, risk, entry price, and stop loss.
          Built for traders who value precision and ethical investing.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <button
            onClick={() => scrollTo('#calculator')}
            className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Calculating
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#about')}
            className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
          >
            Learn About Us
          </button>
        </div>

        {/* Stat ribbon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '380ms' }}>
          {[
            { icon: ShieldCheck, label: 'SEBI Registered', value: 'INH000016199' },
            { icon: TrendingUp, label: 'Built for', value: 'Indian Markets' },
            { icon: Sparkles, label: 'Compliance', value: 'Shariah Approved' },
          ].map((s, i) => (
            <div
              key={i}
              className="col-span-1 last:col-span-2 md:last:col-span-1 flex items-center gap-3 bg-white/70 backdrop-blur border border-emerald-100/70 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{s.label}</div>
                <div className="text-sm font-bold text-slate-800">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
