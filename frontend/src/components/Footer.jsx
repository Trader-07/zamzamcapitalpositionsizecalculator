import React from 'react';
import { LOGO_URL } from '../lib/mock';
import { Mail, MapPin, Phone, Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.6)_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[60rem] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white grid place-items-center ring-1 ring-emerald-500/20">
                <img src={LOGO_URL} alt="Zamzam Capital" className="h-full w-full object-contain p-1" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">Zamzam Capital</div>
                <div className="text-[11px] font-semibold tracking-[0.18em] text-emerald-400">INDIA</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
              SEBI-registered Research Analyst firm offering Shariah-compliant research, education and ethical
              investment guidance for the Indian markets.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              SEBI RA • INH000016199
            </div>
          </div>

          {/* Columns - shifted right on lg via col-start */}
          <div className="lg:col-span-4 lg:col-start-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" /> SEBI Office Address
            </h4>
            <div className="text-sm text-slate-400 leading-relaxed space-y-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400/80 flex-shrink-0" />
                <span>
                  SEBI Bhavan BKC, Plot No. C7,<br />
                  G Block, Bandra Kurla Complex,<br />
                  Bandra (East), Mumbai – 400051
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400/80" />
                <span>+91 22 2644 9000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" /> Registered Address
            </h4>
            <div className="text-sm text-slate-400 leading-relaxed space-y-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400/80 flex-shrink-0" />
                <span>
                  Zamzam Capital,<br />
                  Hyderabad, Telangana,<br />
                  India
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-emerald-400/80" />
                <a href="mailto:contact@zamzamcapital.in" className="hover:text-emerald-300 transition-colors">contact@zamzamcapital.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 max-w-3xl text-center md:text-left leading-relaxed">
            Disclaimer: This calculator is for educational and informational purposes only. Stock market investments are subject to market risks; please read all related documents carefully before investing.
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Zamzam Capital India • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
