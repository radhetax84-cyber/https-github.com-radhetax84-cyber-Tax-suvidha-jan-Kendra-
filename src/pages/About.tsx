import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INSPIRATION } from '../constants';

export default function About() {
  const values = [
    {
      icon: <ShieldCheck className="text-brand-accent" size={32} />,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of professional ethics and integrity in every transaction.'
    },
    {
      icon: <Target className="text-brand-accent" size={32} />,
      title: 'Customer Satisfaction',
      description: 'Our primary goal is to exceed client expectations through personalized and efficient service.'
    },
    {
      icon: <Award className="text-brand-accent" size={32} />,
      title: 'Professional Excellence',
      description: 'Our team stays updated with the latest financial regulations to provide expert guidance.'
    }
  ];

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
            About Tax Suvidha Jan Kendra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Empowering individuals and businesses with simplified financial compliance and expert tax services across India.
          </motion.p>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-24 bg-brand-primary mb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">About & Inspiration</h2>
            <h3 className="text-4xl font-bold text-white mb-6">
              Inspired by India's Vision
            </h3>
            <p className="text-lg text-slate-300">
              Our journey is fueled by the leadership and financial vision that is transforming India into a global economic powerhouse.
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

      {/* Detailed Introduction */}
      <section className="container mx-auto px-4 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="p-12 bg-brand-primary/5 rounded-3xl border border-brand-primary/10">
              <p className="text-brand-primary font-medium text-xl mb-6 leading-relaxed">
                "Our mission is to make tax compliance as simple as a click for every Indian citizen."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-accent rounded-full" />
                <div>
                  <p className="text-brand-primary font-bold">Founder</p>
                  <p className="text-brand-accent font-bold uppercase tracking-wider text-xs">Tax Suvidha Jan Kendra</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">Our Story</h2>
            <h3 className="text-4xl font-bold text-brand-primary mb-8">
              A Decade of Excellence in Financial Services
            </h3>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Tax Suvidha Jan Kendra was founded with a simple yet powerful vision: to bridge the gap between complex financial regulations and the common man. We understood that for many, tax filing and business registrations were daunting tasks filled with jargon and confusion.
              </p>
              <p>
                Over the years, we have evolved into a trusted digital service provider, helping thousands of clients navigate the intricacies of ITR, GST, MSME, and more. Our approach combines the reliability of traditional CA firms with the speed and convenience of modern technology.
              </p>
              <p>
                Whether you are a small business owner, a salaried professional, or an aspiring entrepreneur, we are here to ensure your financial compliance is handled with the utmost care and expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 text-brand-primary py-24 mb-32 relative overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="bg-brand-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-brand-primary">Our Mission</h3>
              <p className="text-xl text-slate-600 leading-relaxed">
                To provide accessible, affordable, and expert financial services to every corner of India, ensuring that no individual or business is left behind due to complex compliance requirements.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="bg-brand-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-brand-primary">Our Vision</h3>
              <p className="text-xl text-slate-600 leading-relaxed">
                To become India's most trusted and innovative digital financial service provider, recognized for our integrity, customer-centric approach, and excellence in tax and business solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="container mx-auto px-4 mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">The Problem & Solution</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
            Why Thousands Trust Us
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h4 className="text-2xl font-bold text-brand-primary border-l-4 border-red-500 pl-6">The Challenges You Face</h4>
            <ul className="space-y-4">
              {[
                'Complex tax laws and frequent changes in GST/ITR rules.',
                'Heavy penalties due to missed deadlines or incorrect filings.',
                'Difficulty in finding reliable and affordable expert advice.',
                'Time-consuming manual processes and physical documentation.',
                'Lack of transparency in service charges and processing status.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="bg-red-500/20 text-red-500 p-1 rounded-full shrink-0">
                    <CheckCircle2 size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8 p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h4 className="text-2xl font-bold text-brand-primary border-l-4 border-emerald-500 pl-6">Our Solution</h4>
            <ul className="space-y-4">
              {[
                'Expert team that stays updated with every new regulation.',
                'Automated reminders and fast processing to avoid penalties.',
                'Transparent, competitive pricing with no hidden costs.',
                '100% digital process—upload documents from anywhere.',
                'Real-time updates and dedicated support for every client.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="bg-emerald-500/20 text-emerald-500 p-1 rounded-full shrink-0">
                    <CheckCircle2 size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 mb-32 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, i) => (
              <div key={i} className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-brand-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-primary">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-bold text-brand-primary mb-4">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-brand-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Experience the Difference
            </h2>
            <p className="text-xl text-slate-200 mb-12">
              Join thousands of satisfied clients who have simplified their financial life with Tax Suvidha Jan Kendra.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/book" className="bg-brand-accent text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-brand-primary transition-all w-full sm:w-auto shadow-lg">
                Get Started Today
              </Link>
              <Link to="/services" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                Explore Services
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
