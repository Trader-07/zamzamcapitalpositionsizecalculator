import React from 'react';
import { SOCIAL_LINKS } from '../lib/mock';
import Reveal from './Reveal';
import { MessageCircle, Send, Instagram, Youtube, ArrowUpRight, Users } from 'lucide-react';
import { cn } from '../lib/utils';

const ICONS = {
  WhatsApp: MessageCircle,
  Telegram: Send,
  Instagram: Instagram,
  YouTube: Youtube,
};

const Connect = () => {
  return (
    <section id="connect" className="relative py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/30 via-white to-white" />
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-700 text-xs md:text-sm font-semibold">
            <Users className="w-3.5 h-3.5" /> Stay Connected
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Join Our <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
            Follow Zamzam Capital across our social media platforms for our latest research, Q&amp;A sessions,
            Shariah compliance knowledge and updates.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {SOCIAL_LINKS.map((s, i) => {
            const Icon = ICONS[s.name];
            return (
              <Reveal key={s.name} delay={i * 80}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block rounded-2xl bg-white border border-slate-100 p-4 sm:p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
                >
                  <div className={cn('absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity bg-gradient-to-br', s.color)} />
                  <div className={cn('relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl text-white grid place-items-center shadow-lg bg-gradient-to-br', s.color)}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="relative mt-4 sm:mt-5 flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{s.name}</h3>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="relative mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate-500">{s.description}</p>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Disclaimer below social icons */}
        <Reveal delay={400} className="mt-10 sm:mt-12">
          <p className="text-center max-w-4xl mx-auto italic text-[11px] sm:text-xs md:text-sm text-slate-500 leading-relaxed px-2">
            Disclaimer: This calculator is for educational and informational purposes only. Stock market investments are subject to market risks.
            Please read all related documents carefully before investing. Past performance is not indicative of future returns.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Connect;
