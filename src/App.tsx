/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CallButton from './components/CallButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Updates from './pages/Updates';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Status from './pages/Status';

const ADMIN_EMAIL = 'radhetax84@gmail.com';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/status" element={<Status />} />
            <Route 
              path="/admin" 
              element={isAdmin ? <Admin onLogout={() => auth.signOut()} /> : <Navigate to="/admin-login" />} 
            />
            <Route 
              path="/admin-login" 
              element={isAdmin ? <Navigate to="/admin" /> : <Login />} 
            />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
        <CallButton />
      </div>
    </Router>
  );
}
