import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import {
  Sparkles, Lock, Mail, ArrowRight, AlertCircle,
  ShieldCheck, Zap, Building2, Bot, ArrowLeft
} from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';
import CosmicCanvas from '../components/CosmicCanvas';

const LOGIN_BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { setToken, setUser }   = useAuth();
  const navigate                = useNavigate();
  const location                = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      const res = await client.post('/api/auth/login', { email, password });
      const token = res.data?.token || res.data?.access_token || 'demo-jwt-token';
      localStorage.setItem('token', token);
      const userData = res.data?.user || { email, fullName: email.split('@')[0], department: 'Engineering' };
      localStorage.setItem('user', JSON.stringify(userData));
      if (setToken) setToken(token);
      if (setUser)  setUser(userData);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        const tok = 'mock-jwt-token-' + Date.now();
        const u   = { email, fullName: email.split('@')[0], department: 'Engineering' };
        localStorage.setItem('token', tok);
        localStorage.setItem('user', JSON.stringify(u));
        if (setToken) setToken(tok);
        if (setUser)  setUser(u);
        navigate('/dashboard', { replace: true });
        return;
      }
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (dept) => {
    const tok = 'demo-' + Date.now();
    const u   = { email:`${dept.toLowerCase()}@docusync.corp`, fullName:`Enterprise ${dept} Lead`, department: dept };
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(u));
    if (setToken) setToken(tok);
    if (setUser)  setUser(u);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background:'#06080e' }}>
      {/* Full-bleed background photograph */}
      <img src={LOGIN_BG} alt="Enterprise office background"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter:'brightness(0.22) saturate(0.5)' }}/>

      {/* Particle constellation */}
      <CosmicCanvas />

      {/* Cursor spotlight */}
      <div className="pointer-events-none fixed inset-0 z-[2] transition-all duration-200"
        style={{ background:`radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.18), transparent 70%)` }}/>

      {/* Aurora gradient overlay */}
      <div className="absolute inset-0 z-[3]"
        style={{ background:'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, transparent 60%, rgba(99,102,241,0.12) 100%)' }}/>

      {/* ── Back to Home button (z-20, always on top) ── */}
      <div className="fixed top-5 left-5 z-50">
        <Link to="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white transition-all hover:scale-105"
          style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(14px)', padding:'8px 14px', borderRadius:'12px' }}>
          <ArrowLeft size={13}/> Back to Home
        </Link>
      </div>

      {/* Floating ambient capsules */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs text-cyan-200 fixed top-28 left-[8%]"
        style={{ background:'rgba(6,182,212,0.08)', border:'1px solid rgba(6,182,212,0.22)', backdropFilter:'blur(12px)', zIndex:20,
          animation:'floatUp 7s ease-in-out infinite' }}>
        <ShieldCheck size={13} className="text-cyan-400"/> End-to-End Encrypted
      </div>
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs text-indigo-200 fixed bottom-28 left-[10%]"
        style={{ background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.22)', backdropFilter:'blur(12px)', zIndex:20,
          animation:'floatDown 6s ease-in-out infinite' }}>
        <Bot size={13} className="text-indigo-300"/> Gemini 2.0 RAG Active
      </div>
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs text-purple-200 fixed top-36 right-[8%]"
        style={{ background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.22)', backdropFilter:'blur(12px)', zIndex:20,
          animation:'floatUp 5s ease-in-out infinite' }}>
        <Building2 size={13} className="text-purple-300"/> Multi-Dept RBAC
      </div>
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs text-emerald-200 fixed bottom-32 right-[10%]"
        style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.22)', backdropFilter:'blur(12px)', zIndex:20,
          animation:'floatDown 4s ease-in-out infinite' }}>
        <Zap size={13} className="text-emerald-300"/> Sub-300ms Retrieval
      </div>

      {/* ── Login card ── */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center py-16 px-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background:'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow:'0 0 30px rgba(37,99,235,0.5)' }}>
            <Sparkles size={20} className="text-white"/>
          </div>
          <div>
            <span className="font-extrabold text-white text-xl tracking-tight">DocuSync AI</span>
            <p className="text-[11px] font-mono text-slate-400">Institutional Knowledge OS</p>
          </div>
        </Link>

        {/* Glass card */}
        <div className="w-full max-w-sm"
          style={{ background:'rgba(8,10,20,0.87)', backdropFilter:'blur(30px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'24px', boxShadow:'0 40px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="px-8 pt-8 pb-8">
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">Welcome back</h2>
            <p className="text-xs text-slate-400 mb-6">Sign in to your enterprise workspace</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 text-red-200"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)' }}>
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400"/>{error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="alex.chen@enterprise.com"
                    className="w-full pl-9 pr-3 py-3 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition-all"
                    style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)' }}
                    onFocus={e  => e.target.style.borderColor = 'rgba(96,165,250,0.6)'}
                    onBlur={e   => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}/>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input
                    type="password" required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-3 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition-all"
                    style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)' }}
                    onFocus={e  => e.target.style.borderColor = 'rgba(96,165,250,0.6)'}
                    onBlur={e   => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}/>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-60 mt-2"
                style={{ background:'linear-gradient(90deg,#2563eb,#4f46e5,#06b6d4)', boxShadow:'0 0 30px rgba(37,99,235,0.45)', border:'1px solid rgba(255,255,255,0.15)' }}>
                {loading
                  ? <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"/> Authenticating...</>
                  : <><span>Sign In to Enterprise Hub</span><ArrowRight size={14}/></>}
              </button>
            </form>

            {/* Demo quick-access */}
            <div className="mt-6 pt-5 border-t" style={{ borderColor:'rgba(255,255,255,0.07)' }}>
              <p className="text-center text-[11px] font-mono text-slate-500 mb-3">Hackathon Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['Engineering', 'text-cyan-300'],
                  ['HR',          'text-purple-300'],
                  ['Legal',       'text-amber-300'],
                  ['Sales',       'text-emerald-300'],
                ].map(([dept, cls]) => (
                  <button
                    key={dept}
                    onClick={() => handleDemo(dept)}
                    className={`py-2.5 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 ${cls} hover:scale-[1.04] transition-all cursor-pointer`}
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                    <ShieldCheck size={11}/> {dept}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-5">
              New to DocuSync?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <FloatingChatWidget/>

      <style>{`
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(12px)}  }
      `}</style>
    </div>
  );
}
