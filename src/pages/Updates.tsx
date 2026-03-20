import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Bell, Tag, MessageCircle } from 'lucide-react';
import { Update } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const FALLBACK_UPDATES: Update[] = [
  {
    id: '1',
    title: 'GST Return Filing Deadline Extended',
    description: 'The government has extended the deadline for GSTR-3B filing for the current month. Ensure you file before the new due date to avoid penalties.',
    date: '20 Oct 2023',
    category: 'GST'
  },
  {
    id: '2',
    title: 'New ITR Forms for AY 2024-25',
    description: 'Income Tax Department has notified new ITR forms. Our experts are ready to help you navigate the changes and ensure accurate filing.',
    date: '15 Oct 2023',
    category: 'Income Tax'
  },
  {
    id: '3',
    title: 'MSME Registration Benefits Updated',
    description: 'New subsidies and credit schemes have been announced for MSMEs. Register your business today to avail these benefits.',
    date: '10 Oct 2023',
    category: 'Business'
  }
];

export default function Updates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'updates'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Update));
      setUpdates(updatesData.length > 0 ? updatesData : FALLBACK_UPDATES);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'updates');
      setUpdates(FALLBACK_UPDATES);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="pt-32 pb-24 bg-white text-brand-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold text-brand-primary mb-8"
          >
            Latest Updates & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Stay informed about GST/ITR deadlines, new government schemes, and our latest service announcements.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            updates.map((update, index) => (
              <motion.article
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="bg-brand-primary/10 text-brand-primary p-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px] h-[100px] group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 border border-brand-primary/20">
                    <Calendar size={24} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">{update.date.split(' ')[0]}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-accent/20">
                        <Tag size={12} />
                        {update.category || 'Announcement'}
                      </span>
                      <span className="text-slate-500 text-sm">{update.date}</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">
                      {update.title}
                    </h2>
                    
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      {update.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6">
                      <button className="inline-flex items-center gap-2 text-brand-primary font-bold group/link">
                        Read Full Update
                        <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                      </button>
                      <a
                        href="https://wa.me/919891769507"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-accent font-bold group/link"
                      >
                        <MessageCircle size={18} />
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* Newsletter/Alerts */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="bg-brand-primary rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl border border-white/5">
            <div className="relative z-10">
              <div className="bg-brand-accent/20 text-brand-accent w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-accent/30">
                <Bell size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-6">Never Miss a Deadline</h3>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Subscribe to our WhatsApp updates to receive timely alerts about GST returns, ITR deadlines, and new government schemes.
              </p>
              <a
                href="https://wa.me/919891769507"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 px-10 py-4 text-lg"
              >
                <MessageCircle size={24} />
                Subscribe on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
