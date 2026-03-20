import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  benefits?: string[];
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, benefits, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="mb-6">
        <div className="w-14 h-14 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
          <span className="text-2xl font-bold font-serif">{index + 1}</span>
        </div>
      </div>

      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
        {description}
      </p>

      {benefits && (
        <ul className="space-y-3 mb-8">
          {benefits.slice(0, 3).map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
              <CheckCircle2 size={16} className="text-brand-saffron shrink-0 mt-0.5" />
              {benefit}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/services#${id}`}
        className="inline-flex items-center gap-2 text-brand-blue font-bold group/link"
      >
        Learn More
        <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
