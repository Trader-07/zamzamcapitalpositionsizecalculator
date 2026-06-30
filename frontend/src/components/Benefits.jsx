import React from 'react';
import { BENEFITS } from '../lib/mock';
import Reveal from './Reveal';
import { Lightbulb, ShieldCheck, GitBranch, Calculator, Settings2, Sparkles, Quote } from 'lucide-react';

const ICONS = [ShieldCheck, GitBranch, Sparkles, Calculator, Settings2];

const Benefits = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/30 to-white" />
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-700 text-xs md:text-sm font-semibold">
            <Lightbulb className="w-3.5 h-3.5" /> Why Use This Tool
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Benefits of Using a{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Position Size Calculator</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={b.n} delay={i * 80}>
                <div
                  className="group relative rounded-2xl bg-white border border-slate-100 p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl group-hover:bg-emerald-200/60 transition-colors" />
                  <div className="relative flex items-center gap-3 mb-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white grid place-items-center font-bold text-base shadow-md shadow-emerald-500/20">
                      {b.n}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{b.title}</h3>
                    <Icon className="hidden md:block ml-auto w-5 h-5 text-emerald-500/60 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <p className="relative text-slate-600 leading-relaxed text-[15px]">{b.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 p-8 md:p-10 text-white shadow-xl shadow-emerald-600/20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          <div className="relative flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 rounded-xl bg-white/15 grid place-items-center flex-shrink-0">
              <Quote className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Conclusion</h3>
              <p className="text-emerald-50/95 leading-relaxed text-[15px] md:text-base">
                A position size calculator is utilised to efficiently manage your risk in the markets.
                It will show you exactly how many shares you should be trading, given your calculation of
                risk and the amount you have in your account. Remember to always set your stop-loss below
                your buy price and trade only within your available funds for a balanced and secure trading
                strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
