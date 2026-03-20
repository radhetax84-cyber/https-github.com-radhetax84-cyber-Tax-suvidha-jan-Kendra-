import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Users, 
  MessageCircle,
  FileText,
  Settings,
  Zap,
  Check
} from 'lucide-react';
import Hero from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../types';
import { INSPIRATION } from '../constants';
import Counter from '../components/Counter';

export default function Home() {
  const whyChooseUs = [
    {
      icon: <Zap className="text-brand-accent" size={32} />,
      title: 'Fast Processing',
      description: 'We value your time. Our streamlined processes ensure your tax filings and registrations are completed in record time.'
    },
    {
      icon: <ShieldCheck className="text-brand-accent" size={32} />,
      title: 'Trusted Service',
      description: 'With over 1000+ happy clients, we have built a reputation for reliability and integrity in financial services.'
    },
    {
      icon: <Settings className="text-brand-accent" size={32} />,
      title: 'Affordable Pricing',
      description: 'Professional financial services shouldn\'t break the bank. We offer expert guidance at competitive, transparent rates.'
    },
    {
      icon: <Award className="text-brand-accent" size={32} />,
      title: 'Expert Support',
      description: 'Our team of experienced professionals is always available to answer your queries and guide you through complex regulations.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Book Service',
      description: 'Choose the service you need and fill out our simple booking form.'
    },
    {
      number: '02',
      title: 'Upload Documents',
      description: 'Securely upload the required documents through our portal or WhatsApp.'
    },
    {
      number: '03',
      title: 'Processing',
      description: 'Our experts review your documents and process your application/filing.'
    },
    {
      number: '04',
      title: 'Completion',
      description: 'Receive your confirmation, certificates, or filed returns directly.'
    }
  ];

  return (
    <main className="bg-brand-dark text-white">
      <Hero />

      {/* About & Inspiration Section */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">About & Inspiration</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Vision & Leadership
            </h3>
            <p className="text-lg text-slate-300">
              Inspired by India's leadership and financial vision, we strive to empower every citizen with professional tax and financial services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {INSPIRATION.map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <h4 className="text-2xl font-bold text-white mb-2">{person.name}</h4>
                <p className="text-brand-accent font-medium text-sm uppercase tracking-wider mb-4">{person.role}</p>
                <p className="text-slate-400 text-sm">"Inspired by India's leadership and financial vision"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="p-12 bg-brand-primary/5 rounded-3xl border border-brand-primary/10">
                <p className="text-6xl font-bold text-brand-primary mb-2"><Counter value={10} />+</p>
                <p className="text-lg font-bold uppercase tracking-wider text-brand-accent">Years Experience</p>
                <p className="mt-6 text-slate-600 leading-relaxed">
                  A decade of excellence in providing financial suvidha to thousands of satisfied clients across the nation.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">About Tax Suvidha</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
                Simplifying Financial Compliance for You
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Tax Suvidha Jan Kendra is your one-stop destination for all tax and government-related services. We believe that financial compliance should be accessible, easy, and stress-free for every individual and business owner in India.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Professional & Certified Experts',
                  'Transparent & Honest Guidance',
                  'End-to-End Digital Support',
                  'Customer-First Approach'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-brand-accent" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">Our Expertise</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
              Comprehensive Financial Services
            </h3>
            <p className="text-lg text-slate-600">
              We offer a wide range of services to help you stay compliant and grow your business without any legal hurdles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                benefits={service.benefits}
                index={index}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">Why Choose Us</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
                The Preferred Choice for Thousands
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                We combine technical expertise with a personalized approach to ensure every client receives the best possible service.
              </p>
              <div className="bg-brand-primary/5 p-8 rounded-2xl border border-brand-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand-primary text-white p-3 rounded-xl">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-primary"><Counter value={10000} />+</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Happy Clients</p>
                  </div>
                </div>
                <p className="text-slate-600">
                  "The most reliable tax service I have ever used. Fast, professional, and very helpful!"
                </p>
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="mb-6">{item.icon}</div>
                  <h4 className="text-2xl font-bold text-brand-primary mb-4">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">Our Process</h2>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              How It Works
            </h3>
            <p className="text-lg text-blue-100">
              Getting your tax and registrations done is easier than ever with our 4-step digital process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px border-t border-dashed border-white/10 -translate-x-8 z-0" />
                )}
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 relative z-10 h-full">
                  <span className="text-5xl font-bold text-brand-accent/20 mb-6 block group-hover:text-brand-accent transition-colors">
                    {step.number}
                  </span>
                  <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                  <p className="text-blue-100 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-brand-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 transition-all duration-500">
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <ShieldCheck size={32} className="text-brand-accent" />
              GST COUNCIL
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <FileText size={32} className="text-brand-accent" />
              INCOME TAX
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <Award size={32} className="text-brand-accent" />
              MSME UDYAM
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <Zap size={32} className="text-brand-accent" />
              DIGITAL INDIA
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-brand-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                Ready to Get Your Taxes in Order?
              </h2>
              <p className="text-xl text-slate-200 mb-12">
                Join <Counter value={10000} />+ satisfied clients and experience the most professional tax service in India.
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
                  Chat on WhatsApp
                </a>
              </div>
              <p className="mt-8 text-slate-300 text-sm flex items-center justify-center gap-2">
                <Check size={16} className="text-brand-accent" />
                No hidden charges. Transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
