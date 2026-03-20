import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Upload, 
  FileText, 
  Download,
  X,
  Phone
} from 'lucide-react';
import { db, storage, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Booking, Message } from '../types';

export default function Status() {
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    const q = query(
      collection(db, 'bookings'),
      where('phone', '==', phone.trim()),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(bookingsData);
      setIsSearching(false);
      if (bookingsData.length === 1) {
        setSelectedBooking(bookingsData[0]);
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'bookings');
      setIsSearching(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    if (!selectedBooking) return;
    const q = query(
      collection(db, 'messages'),
      where('bookingId', '==', selectedBooking.id),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(messagesData);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'messages');
    });
    return () => unsubscribe();
  }, [selectedBooking]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e?: FormEvent, fileUrl?: string, fileName?: string) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim() && !fileUrl && !fileName) return;
    if (!selectedBooking) return;

    const messageData: Omit<Message, 'id'> = {
      bookingId: selectedBooking.id,
      sender: 'User',
      text: chatMessage,
      fileUrl,
      fileName,
      createdAt: Date.now(),
    };

    const path = 'messages';
    try {
      await addDoc(collection(db, path), messageData);
      setChatMessage('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !selectedBooking) return;
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      const fileRef = ref(storage, `chats/${selectedBooking.id}/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(uploadResult.ref);
      await sendMessage(undefined, url, file.name);
    } catch (err) {
      console.error('Chat file upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen bg-white text-brand-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-brand-primary mb-4"
            >
              Check Your Service Status
            </motion.h1>
            <p className="text-slate-600">Enter your phone number to track your booking and chat with us.</p>
          </div>

          {!selectedBooking ? (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-12">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="tel"
                    placeholder="Enter your 10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent outline-none text-lg transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="btn-primary py-4 px-8 flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search size={20} />
                      Find Booking
                    </>
                  )}
                </button>
              </form>

              {hasSearched && bookings.length === 0 && !isSearching && (
                <div className="mt-8 p-6 bg-red-50 text-red-500 rounded-2xl text-center border border-red-100">
                  No bookings found for this phone number. Please check the number or book a new service.
                </div>
              )}

              {bookings.length > 1 && (
                <div className="mt-12 space-y-4">
                  <h3 className="text-xl font-bold text-brand-primary mb-4">Multiple bookings found:</h3>
                  {bookings.map((booking) => (
                    <button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors text-left"
                    >
                      <div>
                        <p className="font-bold text-brand-primary">{booking.service}</p>
                        <p className="text-sm text-slate-500">{new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-accent/10 text-brand-accent'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex items-center gap-2 text-slate-500 font-bold hover:text-brand-primary transition-colors"
              >
                <X size={20} />
                Back to Search
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status Card */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <h3 className="text-xl font-bold text-brand-primary mb-6 pb-4 border-b border-slate-100">Booking Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Service</p>
                        <p className="font-bold text-brand-primary">{selectedBooking.service}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-2">
                          {selectedBooking.status === 'Completed' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : (
                            <Clock size={18} className="text-brand-accent" />
                          )}
                          <span className={`font-bold ${
                            selectedBooking.status === 'Completed' ? 'text-emerald-500' : 'text-brand-accent'
                          }`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Payment</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          selectedBooking.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {selectedBooking.paymentStatus}
                        </span>
                      </div>
                      {selectedBooking.fileName && (
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Uploaded Document</p>
                          <a 
                            href={selectedBooking.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-brand-primary font-bold hover:underline"
                          >
                            <FileText size={16} />
                            {selectedBooking.fileName}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-brand-primary p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                    <h4 className="font-bold mb-2">Need help?</h4>
                    <p className="text-slate-300 text-sm mb-6">Our experts are here to assist you with your tax filing.</p>
                    <a
                      href="https://wa.me/919891769507"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-white/10 text-white border border-white/20 py-3 rounded-xl text-center font-bold hover:bg-white/20 transition-colors"
                    >
                      WhatsApp Support
                    </a>
                  </div>
                </div>

                {/* Chat Section */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col h-[600px] overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-primary/10 p-2 rounded-xl text-brand-primary border border-brand-primary/10">
                          <MessageSquare size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-brand-primary">Expert Consultation</h3>
                          <p className="text-xs text-slate-500">Real-time chat with our tax experts</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.sender === 'User' 
                              ? 'bg-brand-primary text-white rounded-tr-none shadow-md' 
                              : 'bg-white text-brand-primary rounded-tl-none border border-slate-100 shadow-sm'
                          }`}>
                            {msg.text && <p className="text-sm">{msg.text}</p>}
                            {msg.fileUrl && (
                              <a 
                                href={msg.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 mt-2 p-2 rounded-lg text-xs font-bold ${
                                  msg.sender === 'User' ? 'bg-white/20' : 'bg-slate-100'
                                }`}
                              >
                                <Download size={14} />
                                {msg.fileName}
                              </a>
                            )}
                            <p className={`text-[10px] mt-1 opacity-60 ${
                              msg.sender === 'User' ? 'text-right' : 'text-left'
                            }`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-6 border-t border-slate-100 bg-white">
                      <form onSubmit={sendMessage} className="flex gap-4">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent outline-none transition-all"
                          />
                          <label className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-brand-accent transition-colors">
                            <input type="file" className="hidden" onChange={handleFileUpload} />
                            {isUploading ? (
                              <div className="h-5 w-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Upload size={20} />
                            )}
                          </label>
                        </div>
                        <button 
                          type="submit"
                          className="bg-brand-primary text-white p-3 rounded-xl hover:bg-brand-primary/90 transition-colors shadow-lg"
                        >
                          <Send size={20} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
