import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_DETAILS } from '../constants';

export default function CallButton() {
  return (
    <motion.a
      href={`tel:${CONTACT_DETAILS.phone}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-20 right-4 z-40 bg-brand-accent text-white p-3 rounded-full shadow-lg flex items-center justify-center group md:hidden"
    >
      <Phone size={24} />
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
        Call Us
      </span>
    </motion.a>
  );
}
