import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { SERVICES } from '../types';

export default function Services() {
  return (
    <main className="pt-32 pb-24 bg-white text-brand-primary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold text-brand-primary mb-8"
          >
            Our Expert Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Professional tax and financial solutions tailored for individuals and businesses. We simplify complex regulations so you can focus on what matters most.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-4 space-y-24">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col lg:flex-row gap-16 items-center ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Placeholder */}
            <div className="flex-1 relative">
              <div className="p-12 bg-brand-primary/5 rounded-3xl border border-brand-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl font-bold text-brand-primary/10 mb-4 block">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-brand-primary">{service.title}</h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
                {service.title}
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {service.fullDescription}
              </p>
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-10">
                <h3 className="text-lg font-bold text-brand-accent uppercase tracking-wider mb-6">Key Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="text-brand-accent shrink-0" size={20} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/book"
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8"
                >
                  Book This Service
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="https://wa.me/919891769507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-8 py-3 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="bg-brand-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Don't Let Compliance Hold You Back
            </h2>
            <p className="text-xl text-slate-200 mb-12">
              Our experts are ready to handle all your tax and registration needs while you focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/book" className="bg-brand-accent text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-brand-primary transition-all w-full sm:w-auto shadow-lg">
                Book a Service Now
              </Link>
              <a
                href="https://wa.me/919891769507"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <MessageCircle size={24} />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
