import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NAV_LINKS, CONTACT_DETAILS } from '../constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass py-3 shadow-2xl shadow-black/50' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-brand-accent p-2.5 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-2xl tracking-tighter">TS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-xl leading-tight tracking-tight">
              Tax Suvidha
            </span>
            <span className="text-brand-accent text-[10px] font-black tracking-[0.3em] uppercase">
              Jan Kendra 🇮🇳
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-accent relative group',
                location.pathname === link.path ? 'text-brand-accent' : 'text-slate-300'
              )}
            >
              {link.name}
              <span className={cn(
                'absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full',
                location.pathname === link.path && 'w-full'
              )} />
            </Link>
          ))}
          <a
            href={CONTACT_DETAILS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 py-2.5 px-6 text-sm"
          >
            <MessageCircle size={18} className="animate-pulse" />
            WhatsApp
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'fixed inset-0 top-0 bg-brand-primary/95 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 ease-in-out',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex justify-end p-6">
           <button onClick={() => setIsOpen(false)} className="text-white p-2">
             <X size={40} />
           </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-20 gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-3xl font-bold transition-all duration-300',
                location.pathname === link.path ? 'text-brand-accent' : 'text-white'
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
            <a
              href={`tel:${CONTACT_DETAILS.phone}`}
              className="btn-outline flex items-center justify-center gap-3 py-4"
            >
              <Phone size={24} />
              Call Now
            </a>
            <a
              href={CONTACT_DETAILS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-3 py-4"
            >
              <MessageCircle size={24} />
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
