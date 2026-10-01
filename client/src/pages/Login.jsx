import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { Sparkles, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Zap, Building2, Bot, ArrowLeft } from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';
import CosmicCanvas from '../components/CosmicCanvas';

/* Moody dark background photo behind the login card */
const LOGIN_BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80';

const Login = () => {
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
      const userData = res.data?.user || { email, fullName: email.split('@')[0], department: res.data?.department || 'Engineering' };
      localStorage.setItem('user', JSON.stringify(userData));
      if (setToken) setToken(token);
      if (setUser) setUser(userData);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        const tok = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', tok);
        const u = { email, fullName: email.split('@')[0], department: 'Engineering' };
        localStorage.setItem('user', JSON.stringify(u));
        if (setToken) setToken(tok);
        if (setUser) setUser(u);
        navigate('/dashboard', { replace: true });
        return;
      }
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (dept) => {
    const tok = 'demo-' + Date.now();
    const u = { email: `${dept.toLowerCase()}@docusync.corp`, fullName: `Enterprise ${dept} Lead`, department: dept };
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(u));
    if (setToken) setToken(tok);
    if (setUser) setUser(u);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background:'#06080e' }}>
      {/* Full-bleed background photograph */}
      <img src={LOGIN_BG} alt="Office background"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter:'brightness(0.22) saturate(0.5)' }}/>

      {/* Particle canvas */}
      <CosmicCanvas />

      {/* Cursor spotlight */}
      <div className="pointer-events-none fixed inset-0 z-[2]"
        style={{ background:`radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.16), transparent 70%)` }}/>

      {/* Gradient vignette */}
      <div className="absolute inset-0 z-[3]" style={{ background:'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 60%, rgba(99,102,241,0.15) 100%)' }}/>

      {/* Back to home */}
      <div className="absolute top-5 left-5 z-20">
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition"
          style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(12px)' }}>
          <ArrowLeft size={13}/> Back to Home
        </Link>
      </div>

      {/* Floating decorative capsules */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-cyan-200 absolute top-32 left-[10%] animate-float-slow"
        style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.25)', backdropFilter:'blur(12px)', boxShadow:'0 10px 30px rgba(6,182,212,0.1)' }}>
        <ShieldCheck size={13} className="text-cyan-400"/> End-to-End Encrypted
      </div>
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-indigo-200 absolute bottom-32 left-[12%] animate-float-reverse"
        style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)', backdropFilter:'blur(12px)' }}>
        <Bot size={13} className="text-indigo-300"/> Gemini 2.0 RAG Active
      </div>
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-purple-200 absolute top-40 right-[10%] animate-float-medium"
        style={{ background:'rgba(168,85,247,0.1)', border:'1px solid rgba(168,85,247,0.25)', backdropFilter:'blur(12px)' }}>
        <Building2 size={13} className="text-purple-300"/> Multi-Dept RBAC
      </div>
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-emerald-200 absolute bottom-28 right-[12%] animate-float-fast"
        style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', backdropFilter:'blur(12px)' }}>
        <Zap size={13} className="text-emerald-300"/> Sub-300ms Retrieval
      </div>

      {/* Login card */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        {/* Brand identity */}
        <Link to="/" className="flex items-center gap-3 mb-6 group">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform"
            style={{ background:'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow:'0 0 30px rgba(37,99,235,0.5)' }}>
            <Sparkles size={22} className="text-white"/>
          </div>
          <div>
            <span className="font-extrabold text-white text-xl tracking-tight">DocuSync AI</span>
            <p className="text-[11px] font-mono text-slate-400">Institutional Knowledge OS</p>
          </div>
        </Link>

        {/* Glass card */}
        <div className="w-full max-w-sm"
          style={{ background:'rgba(8,10,20,0.85)', backdropFilter:'blur(28px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'24px', boxShadow:'0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="px-8 pt-8 pb-7">
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-0.5">Welcome back</h2>
            <p className="text-xs text-slate-400 mb-6">Sign in to your enterprise workspace</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 text-red-200"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)' }}>
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400"/>{error}
              </div>
            )}

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Corporate Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="alex.chen@enterprise.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e=>e.target.style.borderColor='rgba(96,165,250,0.5)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
                  <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e=>e.target.style.borderColor='rgba(96,165,250,0.5)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] transition disabled:opacity-60"
                style={{ background:'linear-gradient(90deg,#2563eb,#4f46e5,#06b6d4)', boxShadow:'0 0 30px rgba(37,99,235,0.4)', border:'1px solid rgba(255,255,255,0.15)' }}>
                {loading ? <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"/> Authenticating...</>
                  : <><span>Sign in to Enterprise Hub</span><ArrowRight size={14}/></>}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
              <p className="text-center text-[11px] font-mono text-slate-500 mb-3">Hackathon Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                {[['Engineering','text-cyan-300'],['HR','text-purple-300']].map(([dept,cls]) => (
                  <button key={dept} onClick={()=>handleDemo(dept)}
                    className={`py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 ${cls} transition hover:scale-[1.03] cursor-pointer`}
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                    <ShieldCheck size={12}/> {dept} Lead
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-5">
              New to DocuSync?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">Create account</Link>
            </p>
          </div>
        </div>
      </div>

      <FloatingChatWidget/>
    </div>
  );
};

export default Login;
