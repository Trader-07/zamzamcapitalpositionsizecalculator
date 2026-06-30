import React from 'react';
import { ABOUT_FEATURES } from '../lib/mock';
import Reveal from './Reveal';
import { ShieldCheck, HeartHandshake, BookOpen, Sparkles, Award, BadgeCheck } from 'lucide-react';

const FEATURE_ICONS = {
  sebi: ShieldCheck,
  ethical: HeartHandshake,
  shariah: Sparkles,
  education: BookOpen,
};

const About = () => {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-emerald-50/30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-700 text-xs md:text-sm font-semibold">
            <Award className="w-3.5 h-3.5" /> Who We Are
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            About <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Zamzam Capital</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6 lg:gap-8 items-stretch">
          {/* LEFT  intro + SEBI card */}
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            <div className="rounded-2xl md:rounded-3xl bg-white border border-slate-100 p-6 sm:p-7 md:p-8 shadow-[0_8px_40px_-20px_rgba(13,148,136,0.25)]">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-[15px] md:text-base">
                Zamzam Capital is a{' '}
                <span className="font-bold text-slate-900">SEBI-registered Research Analyst firm</span>{' '}
                that specializes in Shariah-compliant stock recommendations and portfolios in the Indian stock market.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-[15px] md:text-base">
                Our mission is to help investors make informed financial decisions through research, education, and
                ethical investment principles.
              </p>
            </div>

            {/* Pushed down to align with bottom of the 4 boxes */}
            <div className="mt-auto">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 sm:p-7 md:p-8 text-white shadow-xl shadow-emerald-600/20">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
                <div className="relative flex items-start gap-3 sm:gap-4">
                  <div className="h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 rounded-xl bg-white/15 grid place-items-center">
                    <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-emerald-100/90">SEBI Registered</div>
                    <div className="mt-1 text-lg sm:text-xl md:text-2xl font-extrabold">Research Analyst</div>
                    <div className="mt-1 text-xs sm:text-sm text-emerald-50/95 break-words">License No: <span className="font-bold">INH000016199</span></div>
                    <div className="mt-0.5 text-xs sm:text-sm text-emerald-50/95">BSE Enlistment No: <span className="font-bold">6158</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - 4 feature cards aligned in 2x2 grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 md:gap-6">
            {ABOUT_FEATURES.map((f, i) => {
              const Icon = FEATURE_ICONS[f.key];
              return (
                <Reveal key={f.key} delay={i * 90}>
                  <div className="group relative rounded-2xl bg-white border border-slate-100 p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-100/50 blur-2xl group-hover:bg-emerald-200/60 transition-colors" />
                    <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white grid place-items-center shadow-md shadow-emerald-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
                    <p className="relative mt-2 text-slate-600 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
