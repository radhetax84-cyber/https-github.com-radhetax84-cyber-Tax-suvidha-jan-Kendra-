import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import Counter from './Counter';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-brand-primary">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            Trusted by <Counter value={10000} />+ Happy Clients
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            Your Trusted Tax & Financial Service Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-200 mb-10 max-w-2xl"
          >
            सभी टैक्स और सरकारी सेवाएं एक ही जगह। <br className="hidden md:block" />
            Expert assistance for ITR, GST, MSME, PAN, and Business Registration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="https://wa.me/919891769507"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-brand-primary transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg"
            >
              <MessageCircle size={22} />
              Contact on WhatsApp
            </a>
            <Link
              to="/services"
              className="bg-white text-brand-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg"
            >
              Explore Services
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10 w-full"
          >
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="text-brand-accent" size={28} />
              <span className="text-sm font-bold uppercase tracking-wider text-white">100% Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="text-brand-accent" size={28} />
              <span className="text-sm font-bold uppercase tracking-wider text-white">Fast Process</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="text-brand-accent" size={28} />
              <span className="text-sm font-bold uppercase tracking-wider text-white">Expert Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
