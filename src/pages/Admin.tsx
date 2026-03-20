import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Upload,
  Send,
  User,
  Phone,
  CreditCard,
  X
} from 'lucide-react';
import { Booking, ServiceStatus, Message, Update } from '../types';
import { db, storage, handleFirestoreError, OperationType, auth, loginWithGoogle } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, where, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AdminProps {
  onLogout: () => void;
}

export default function Admin({ onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'chat'>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: '', description: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(bookingsData);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'bookings');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'updates'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Update));
      setUpdates(updatesData);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'updates');
    });
    return () => unsubscribe();
  }, []);

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

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const path = 'updates';
    try {
      await addDoc(collection(db, path), newUpdate);
      setShowAddUpdate(false);
      setNewUpdate({ title: '', description: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateStatus = async (id: string, status: ServiceStatus) => {
    const path = `bookings/${id}`;
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const updatePayment = async (id: string, paymentStatus: 'Unpaid' | 'Paid') => {
    const path = `bookings/${id}`;
    try {
      await updateDoc(doc(db, 'bookings', id), { paymentStatus });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const sendMessage = async (e?: FormEvent, fileUrl?: string, fileName?: string) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim() && !fileUrl && !fileName) return;
    if (!selectedBooking) return;

    const messageData: Omit<Message, 'id'> = {
      bookingId: selectedBooking.id,
      sender: 'Admin',
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
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 text-brand-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <div className="bg-brand-primary text-white p-2 rounded-lg">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-bold text-brand-primary">Admin Panel</p>
                  <p className="text-[10px] text-brand-accent uppercase tracking-widest font-bold">Tax Suvidha</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
                  { id: 'bookings', icon: <Users size={20} />, label: 'Bookings' },
                  { id: 'chat', icon: <MessageSquare size={20} />, label: 'Messages' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === item.id 
                        ? 'bg-brand-primary text-white shadow-lg' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-brand-primary'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all mt-8"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </nav>
            </div>

            {/* Stats Summary */}
            <div className="bg-brand-primary text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-4">Quick Stats</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Total Bookings</span>
                    <span className="text-2xl font-bold">{bookings.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Pending</span>
                    <span className="text-2xl font-bold text-brand-accent">{bookings.filter(b => b.status === 'Pending').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Leads', value: '1,248', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <Users size={24} /> },
                    { label: 'Active Projects', value: '42', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: <Clock size={24} /> },
                    { label: 'Revenue (MTD)', value: '₹45,200', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <CreditCard size={24} /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-brand-primary">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-4 rounded-2xl border shadow-sm`}>
                        {stat.icon}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-brand-primary">Latest Updates</h3>
                    <button 
                      onClick={() => setShowAddUpdate(true)}
                      className="btn-primary py-2 px-4 text-xs"
                    >
                      Add New Update
                    </button>
                  </div>
                  
                  {showAddUpdate && (
                    <div className="p-8 bg-slate-50 border-b border-slate-100">
                      <form onSubmit={handleAddUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            required
                            type="text"
                            placeholder="Update Title"
                            value={newUpdate.title}
                            onChange={(e) => setNewUpdate(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-brand-primary focus:border-brand-accent outline-none"
                          />
                          <input
                            required
                            type="text"
                            placeholder="Date (e.g. March 20, 2026)"
                            value={newUpdate.date}
                            onChange={(e) => setNewUpdate(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-brand-primary focus:border-brand-accent outline-none"
                          />
                        </div>
                        <textarea
                          required
                          placeholder="Update Description"
                          value={newUpdate.description}
                          onChange={(e) => setNewUpdate(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-brand-primary focus:border-brand-accent outline-none resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end gap-4">
                          <button 
                            type="button"
                            onClick={() => setShowAddUpdate(false)}
                            className="text-slate-500 font-bold text-sm hover:text-brand-primary transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            className="btn-primary py-2 px-6"
                          >
                            Post Update
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="p-8 space-y-4">
                    {updates.slice(0, 3).map((update) => (
                      <div key={update.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <h4 className="font-bold text-brand-primary">{update.title}</h4>
                          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">{update.date}</p>
                        </div>
                        <button 
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this update?')) {
                              try {
                                await deleteDoc(doc(db, 'updates', update.id!));
                              } catch (err) {
                                handleFirestoreError(err, OperationType.DELETE, `updates/${update.id}`);
                              }
                            }
                          }}
                          className="text-red-500 hover:text-red-600 text-sm font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {updates.length === 0 && (
                      <p className="text-center text-slate-500 py-4 italic">No updates posted yet.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-brand-primary">Recent Bookings</h3>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="text-brand-accent font-bold text-xs uppercase tracking-widest hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Service</th>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Payment</th>
                          <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bookings.slice(0, 5).map(booking => (
                          <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-6">
                              <p className="font-bold text-brand-primary">{booking.name}</p>
                              <p className="text-xs text-slate-500">{booking.phone}</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-brand-primary/10">
                                {booking.service}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-orange-100 text-orange-600 border border-orange-200'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                booking.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-red-100 text-red-600 border border-red-200'
                              }`}>
                                {booking.paymentStatus}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button 
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setActiveTab('bookings');
                                }}
                                className="text-slate-400 hover:text-brand-primary p-2 rounded-lg hover:bg-slate-100 transition-all"
                              >
                                <MoreVertical size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-12rem)]">
                {/* Bookings List */}
                <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-slate-100 space-y-4">
                    <h3 className="text-2xl font-bold text-brand-primary">Manage Bookings</h3>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search by name or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-primary focus:border-brand-accent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {filteredBookings.map(booking => (
                      <button
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`w-full text-left p-6 hover:bg-slate-50 transition-all flex items-center justify-between ${
                          selectedBooking?.id === booking.id ? 'bg-brand-primary/5 border-l-4 border-brand-primary' : ''
                        }`}
                      >
                        <div>
                          <p className="font-bold text-brand-primary">{booking.name}</p>
                          <p className="text-sm text-slate-500 mb-2">{booking.service}</p>
                          <div className="flex gap-2">
                            <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                              booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-orange-100 text-orange-600 border-orange-200'
                            }`}>
                              {booking.status}
                            </span>
                            <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                              booking.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-red-100 text-red-600 border-red-200'
                            }`}>
                              {booking.paymentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Detail */}
                <div className="lg:w-[400px] bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  {selectedBooking ? (
                    <div className="flex flex-col h-full">
                      <div className="p-8 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                          <div className="bg-brand-primary/10 text-brand-primary p-4 rounded-2xl border border-brand-primary/10">
                            <User size={32} />
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => updateStatus(selectedBooking.id, selectedBooking.status === 'Completed' ? 'Pending' : 'Completed')}
                              className={`p-2 rounded-xl border transition-all ${
                                selectedBooking.status === 'Completed' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`}
                              title="Toggle Status"
                            >
                              <CheckCircle2 size={24} />
                            </button>
                            <button 
                              onClick={() => updatePayment(selectedBooking.id, selectedBooking.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid')}
                              className={`p-2 rounded-xl border transition-all ${
                                selectedBooking.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`}
                              title="Toggle Payment"
                            >
                              <CreditCard size={24} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-1">{selectedBooking.name}</h3>
                        <p className="text-brand-accent font-bold text-[10px] uppercase tracking-widest">{selectedBooking.service}</p>
                      </div>

                      <div className="p-8 flex-1 overflow-y-auto space-y-8">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Information</p>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600">
                              <Phone size={18} className="text-brand-accent" />
                              <a href={`tel:${selectedBooking.phone}`} className="hover:text-brand-primary transition-colors">{selectedBooking.phone}</a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <MessageSquare size={18} className="text-brand-accent" />
                              <a href={`https://wa.me/${selectedBooking.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">WhatsApp Chat</a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Message</p>
                          <p className="text-slate-600 bg-slate-50 p-4 rounded-2xl text-sm leading-relaxed border border-slate-100">
                            {selectedBooking.message || "No message provided."}
                          </p>
                        </div>

                        {selectedBooking.fileName && (
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Documents</p>
                            <a 
                              href={selectedBooking.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-brand-primary transition-all bg-slate-50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-white text-slate-400 p-2 rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                  <FileText size={20} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-brand-primary truncate max-w-[150px]">{selectedBooking.fileName}</p>
                                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">View Document</p>
                                </div>
                              </div>
                              <Download size={18} className="text-slate-400 group-hover:text-brand-primary" />
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="p-8 border-t border-slate-100">
                        <button 
                          onClick={() => setActiveTab('chat')}
                          className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                          <MessageSquare size={20} />
                          Open Chat
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                      <div className="bg-slate-50 p-8 rounded-full mb-6 border border-slate-100">
                        <Users size={64} className="text-slate-300" />
                      </div>
                      <p className="text-xl font-bold text-brand-primary mb-2">No Booking Selected</p>
                      <p className="text-sm">Select a booking from the list to view details and manage status.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[calc(100vh-12rem)] flex overflow-hidden">
                {/* Chat List */}
                <div className="w-80 border-r border-slate-100 flex flex-col">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-brand-primary">Conversations</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {bookings.map(booking => (
                      <button
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`w-full p-6 text-left hover:bg-slate-50 transition-all flex items-center gap-4 ${
                          selectedBooking?.id === booking.id ? 'bg-brand-primary/5 border-l-4 border-brand-primary' : ''
                        }`}
                      >
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-brand-primary font-bold border border-slate-200">
                          {booking.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-brand-primary truncate">{booking.name}</p>
                          <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest font-bold">{booking.service}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {selectedBooking ? (
                    <>
                      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">
                            {selectedBooking.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-brand-primary">{selectedBooking.name}</p>
                            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              Active Session
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a href={`tel:${selectedBooking.phone}`} className="p-2 text-slate-400 hover:text-brand-primary hover:bg-white rounded-lg transition-all">
                            <Phone size={20} />
                          </a>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
                        {messages.length === 0 && (
                          <div className="text-center py-12 text-slate-400">
                            <p className="italic">No messages yet. Start the conversation!</p>
                          </div>
                        )}
                        
                        {messages.map((msg, i) => {
                          const isLastFromSender = i === messages.length - 1 || messages[i + 1].sender !== msg.sender;
                          
                          return (
                            <div 
                              key={msg.id} 
                              className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end ml-auto' : 'items-start'} max-w-[80%]`}
                            >
                              <div className={`p-4 shadow-sm border ${
                                msg.sender === 'Admin' 
                                  ? 'bg-brand-primary text-white rounded-2xl rounded-tr-none border-brand-primary/10' 
                                  : 'bg-white text-brand-primary rounded-2xl rounded-tl-none border-slate-200'
                              }`}>
                                {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                                {msg.fileUrl && (
                                  <a 
                                    href={msg.fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 mt-2 p-3 rounded-xl border ${
                                      msg.sender === 'Admin' ? 'bg-white/10 hover:bg-white/20 border-white/10' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                                    } transition-colors`}
                                  >
                                    <FileText size={16} className={msg.sender === 'Admin' ? 'text-white' : 'text-brand-primary'} />
                                    <span className="text-xs font-bold truncate max-w-[150px]">{msg.fileName || 'Attachment'}</span>
                                    <Download size={14} className="ml-auto" />
                                  </a>
                                )}
                              </div>
                              {isLastFromSender && (
                                <span className="text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-widest">
                                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>
                          );
                        })}
                        <div ref={chatEndRef} />
                      </div>

                      <div className="p-6 border-t border-slate-100 bg-white">
                        <form onSubmit={sendMessage} className="flex items-center gap-4">
                          <div className="relative">
                            <input
                              type="file"
                              id="admin-chat-file"
                              className="hidden"
                              onChange={handleFileUpload}
                              disabled={isUploading}
                            />
                            <label 
                              htmlFor="admin-chat-file"
                              className={`p-3 text-slate-400 hover:text-brand-primary hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200 ${isUploading ? 'animate-pulse' : ''}`}
                            >
                              {isUploading ? <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" /> : <Upload size={24} />}
                            </label>
                          </div>
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              placeholder="Type your message..."
                              className="w-full pl-6 pr-14 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                            />
                            <button 
                              type="submit"
                              disabled={!chatMessage.trim() || isUploading}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2.5 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                            >
                              <Send size={20} />
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                      <div className="bg-slate-50 p-8 rounded-full mb-6 border border-slate-100">
                        <MessageSquare size={64} className="text-slate-300" />
                      </div>
                      <p className="text-xl font-bold text-brand-primary mb-2">No Conversation Selected</p>
                      <p className="text-sm">Select a customer from the list to start a real-time chat.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
