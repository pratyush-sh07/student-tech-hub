import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { Sparkles, Lock, Mail, User, Building2, ArrowRight, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';
import CosmicCanvas from '../components/CosmicCanvas';

const REGISTER_BG = 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80';

const DEPARTMENTS = ['Engineering', 'HR', 'Sales', 'Legal'];

export default function Register() {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [department, setDept]     = useState('Engineering');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const { setToken, setUser }     = useAuth();
  const navigate                  = useNavigate();
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await client.post('/api/auth/register', { fullName, email, password, department });
      const token = res.data?.token || res.data?.access_token || 'demo-jwt-token';
      localStorage.setItem('token', token);
      const userData = res.data?.user || { fullName, email, department };
      localStorage.setItem('user', JSON.stringify(userData));
      if (setToken) setToken(token);
      if (setUser) setUser(userData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        const tok = 'mock-jwt-token-' + Date.now();
        const u = { fullName, email, department };
        localStorage.setItem('token', tok);
        localStorage.setItem('user', JSON.stringify(u));
        if (setToken) setToken(tok);
        if (setUser) setUser(u);
        navigate('/dashboard', { replace: true });
        return;
      }
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const DEPT_COLORS = {
    Engineering: 'rgba(6,182,212,0.15)',
    HR:          'rgba(168,85,247,0.15)',
    Sales:       'rgba(16,185,129,0.15)',
    Legal:       'rgba(251,191,36,0.15)',
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background:'#06080e' }}>
      {/* Full-bleed library background photograph */}
      <img src={REGISTER_BG} alt="Library background"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter:'brightness(0.2) saturate(0.4)' }}/>

      <CosmicCanvas />

      {/* Cursor spotlight */}
      <div className="pointer-events-none fixed inset-0 z-[2]"
        style={{ background:`radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.16), transparent 70%)` }}/>

      {/* Aurora overlay */}
      <div className="absolute inset-0 z-[3]"
        style={{ background:'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, transparent 50%, rgba(6,182,212,0.1) 100%)' }}/>

      {/* Back to Home */}
      <div className="absolute top-5 left-5 z-20">
        <Link to="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition"
          style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(12px)' }}>
          <ArrowLeft size={13}/> Back to Home
        </Link>
      </div>

      {/* Floating decorative tags */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-indigo-200 absolute top-28 left-[9%] animate-float-slow"
        style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)', backdropFilter:'blur(12px)' }}>
        <ShieldCheck size={13} className="text-indigo-300"/> SOC-2 Tenant Isolation
      </div>
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-cyan-200 absolute bottom-28 right-[10%] animate-float-reverse"
        style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.25)', backdropFilter:'blur(12px)' }}>
        <Building2 size={13} className="text-cyan-300"/> Departmental RBAC
      </div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 mb-6 group">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform"
            style={{ background:'linear-gradient(135deg,#4f46e5,#06b6d4)', boxShadow:'0 0 30px rgba(99,102,241,0.5)' }}>
            <Sparkles size={22} className="text-white"/>
          </div>
          <div>
            <span className="font-extrabold text-white text-xl tracking-tight">DocuSync AI</span>
            <p className="text-[11px] font-mono text-slate-400">Create Enterprise Account</p>
          </div>
        </Link>

        {/* Card */}
        <div className="w-full max-w-sm"
          style={{ background:'rgba(8,10,20,0.88)', backdropFilter:'blur(28px)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:'24px', boxShadow:'0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="px-8 pt-8 pb-7">
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-0.5">Create account</h2>
            <p className="text-xs text-slate-400 mb-6">Join your organization's knowledge hub</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 text-red-200"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)' }}>
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400"/>{error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input type="text" required value={fullName} onChange={e=>setFullName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.6)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Corporate Email</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="sarah@enterprise.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.6)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input type="password" required minLength={6} value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.6)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
                </div>
              </div>

              {/* Department pills */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                <div className="grid grid-cols-2 gap-2">
                  {DEPARTMENTS.map(d => (
                    <button key={d} type="button" onClick={() => setDept(d)}
                      className="py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                      style={{
                        background: department === d ? DEPT_COLORS[d] : 'rgba(255,255,255,0.03)',
                        border: department === d ? `1px solid ${DEPT_COLORS[d].replace('0.15','0.5')}` : '1px solid rgba(255,255,255,0.06)',
                        color: department === d ? '#f1f5f9' : '#94a3b8',
                      }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] transition disabled:opacity-60"
                style={{ background:'linear-gradient(90deg,#4f46e5,#2563eb,#06b6d4)', boxShadow:'0 0 30px rgba(99,102,241,0.4)', border:'1px solid rgba(255,255,255,0.15)' }}>
                {loading
                  ? <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"/> Creating Account...</>
                  : <><span>Complete Registration</span><ArrowRight size={14}/></>}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <FloatingChatWidget/>
    </div>
  );
}
