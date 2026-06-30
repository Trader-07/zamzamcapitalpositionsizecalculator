import React from 'react';
import { LOGO_URL } from '../lib/mock';
import { Menu, X, Calculator as CalcIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV = [
  { label: 'Calculator', href: '#calculator' },
  { label: 'Analysis', href: '#analysis' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#connect' },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_24px_-12px_rgba(13,148,136,0.25)] border-b border-emerald-100/60'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group min-w-0" onClick={(e) => { e.preventDefault(); goTo('#top'); }}>
          <div className="relative h-10 w-10 md:h-11 md:w-11 flex-shrink-0 rounded-xl overflow-hidden bg-white ring-1 ring-emerald-100 shadow-sm group-hover:ring-emerald-300 transition">
            <img src={LOGO_URL} alt="Zamzam Capital" className="h-full w-full object-contain p-1" />
          </div>
          <div className="leading-tight min-w-0">
            <div className="font-bold text-slate-900 text-sm sm:text-base md:text-lg tracking-tight whitespace-nowrap">Zamzam Capital</div>
            <div className="text-[10px] md:text-[11px] font-semibold text-emerald-600 tracking-[0.18em]">INDIA</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); goTo(item.href); }}
              className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors rounded-lg hover:bg-emerald-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => goTo('#calculator')}
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <CalcIcon className="w-4 h-4" />
            Calculate Now
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-emerald-50 text-slate-700"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-white/95 backdrop-blur-xl border-t border-emerald-100/60',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); goTo(item.href); }}
              className="px-3 py-3 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => goTo('#calculator')}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md shadow-emerald-600/20"
          >
            <CalcIcon className="w-4 h-4" />
            Calculate Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
