import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Award, 
  MessageCircle,
  X,
  FileText
} from 'lucide-react';
import { SERVICES, Booking as BookingType } from '../types';
import { db, storage, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      let fileUrl = '';
      let fileName = '';

      if (file) {
        const fileRef = ref(storage, `bookings/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(uploadResult.ref);
        fileName = file.name;
      }

      const bookingData: Omit<BookingType, 'id'> = {
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        fileUrl,
        fileName,
        status: 'Pending',
        paymentStatus: 'Unpaid',
        createdAt: Date.now(),
      };

      const path = 'bookings';
      try {
        await addDoc(collection(db, path), bookingData);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', service: '', message: '' });
        setFile(null);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to submit booking. Please try again or contact us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 bg-white text-brand-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Form Section */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent" />
                
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="bg-emerald-500/20 text-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-primary mb-4">Booking Successful!</h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Thank you for choosing Tax Suvidha Jan Kendra. Our expert will contact you shortly on your phone number.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-primary"
                    >
                      Book Another Service
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-brand-primary mb-4">Book a Service</h1>
                    <p className="text-lg text-slate-600 mb-10">
                      Fill out the form below and our experts will get back to you within 24 hours.
                    </p>

                    {error && (
                      <div className="bg-red-500/20 text-red-500 p-4 rounded-xl mb-8 flex items-center gap-3 border border-red-500/30">
                        <X size={20} />
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                          <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                          <input
                            required
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Select Service</label>
                        <select
                          required
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all appearance-none"
                        >
                          <option value="" className="bg-white">Choose a service...</option>
                          {SERVICES.map(s => (
                            <option key={s.id} value={s.title} className="bg-white">{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Message (Optional)</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your requirements..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Upload Documents (Optional)</label>
                        <div className="relative">
                          <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="file"
                            className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-brand-accent hover:bg-brand-accent/5 transition-all"
                          >
                            {file ? (
                              <div className="flex items-center gap-4">
                                <div className="bg-brand-primary text-white p-3 rounded-lg">
                                  <FileText size={24} />
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-brand-primary">{file.name}</p>
                                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setFile(null);
                                  }}
                                  className="text-red-500 hover:bg-red-500/10 p-1 rounded-full"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-slate-400 mb-4" size={32} />
                                <p className="font-bold text-slate-600">Click to upload or drag and drop</p>
                                <p className="text-sm text-slate-500">PDF, JPG, PNG (Max 5MB)</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            Submit Booking
                            <Send size={20} />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm pt-4 border-t border-slate-100">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        Your data is safe and encrypted with us.
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

            {/* Info Section */}
            <div className="lg:w-1/3 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-brand-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
              >
                <h3 className="text-2xl font-bold mb-6 text-brand-accent">Our Process</h3>
                <div className="space-y-8">
                  {[
                    { icon: <CheckCircle2 size={24} />, title: 'Book Service', desc: 'Fill the form with your details.' },
                    { icon: <Upload size={24} />, title: 'Upload Documents', desc: 'Send us the required files.' },
                    { icon: <Clock size={24} />, title: 'Processing', desc: 'Our experts handle the rest.' },
                    { icon: <Award size={24} />, title: 'Completion', desc: 'Get your filed returns/certificates.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="bg-white/10 p-2 rounded-lg h-fit text-brand-accent">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{step.title}</h4>
                        <p className="text-sm text-slate-300">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-brand-primary">Need Help?</h3>
                <p className="text-slate-600 mb-8">
                  Not sure which service you need? Talk to our experts directly on WhatsApp for a free consultation.
                </p>
                <a
                  href="https://wa.me/919891769507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-brand-primary hover:text-white transition-all"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
