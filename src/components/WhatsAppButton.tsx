import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_DETAILS } from '../constants';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={CONTACT_DETAILS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg flex items-center justify-center group"
    >
      <MessageCircle size={24} />
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
        WhatsApp Us
      </span>
    </motion.a>
  );
}
