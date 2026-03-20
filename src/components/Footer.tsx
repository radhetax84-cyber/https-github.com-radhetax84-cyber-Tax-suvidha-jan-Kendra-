import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { CONTACT_DETAILS, NAV_LINKS } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        {/* Brand Info */}
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-brand-accent p-2.5 rounded-xl shadow-lg shadow-orange-500/20">
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
          <p className="text-slate-300 leading-relaxed text-sm">
            Your trusted partner for all tax and financial services. We provide professional, fast, and affordable solutions for ITR, GST, MSME, and more.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={CONTACT_DETAILS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 p-3 rounded-xl hover:bg-brand-accent transition-all duration-300 hover:-translate-y-1"
            >
              <Instagram size={20} />
            </a>
            <a
              href={CONTACT_DETAILS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 p-3 rounded-xl hover:bg-brand-accent transition-all duration-300 hover:-translate-y-1"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-white">Quick Links</h3>
          <ul className="space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-slate-300 hover:text-brand-accent transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/30 group-hover:bg-brand-accent transition-colors" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-white">Our Services</h3>
          <ul className="space-y-4">
            {['ITR Filing', 'GST Registration', 'GST Filing', 'MSME Registration', 'PAN Card Services', 'Business Registration'].map((service) => (
              <li key={service} className="text-slate-300 text-sm flex items-center gap-2 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/30 group-hover:bg-brand-accent transition-colors" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-white">Contact Us</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group">
              <div className="bg-brand-accent/10 p-2 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-300">
                <Phone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Phone</span>
                <a href={`tel:${CONTACT_DETAILS.phone}`} className="text-slate-300 hover:text-brand-accent transition-colors text-sm font-semibold">
                  {CONTACT_DETAILS.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="bg-brand-accent/10 p-2 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-300">
                <Mail size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Email</span>
                {CONTACT_DETAILS.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="text-slate-300 hover:text-brand-accent transition-colors text-sm font-semibold">
                    {email}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="bg-brand-accent/10 p-2 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-300">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Address</span>
                <span className="text-slate-300 text-sm font-semibold leading-relaxed">
                  {CONTACT_DETAILS.address}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24 pt-12 border-t border-white/5 text-center">
        <p className="text-slate-500 text-xs">© {currentYear} Tax Suvidha Jan Kendra. All rights reserved.</p>
        <p className="mt-4 tracking-[0.5em] uppercase text-[10px] text-brand-accent/50 font-black">taxsuvidhajankendra.online</p>
      </div>
    </footer>
  );
}
