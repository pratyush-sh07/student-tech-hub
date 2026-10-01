import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import {
  Sparkles, Lock, Mail, ArrowRight, AlertCircle,
  ShieldCheck, Zap, Building2, Bot, ArrowLeft,
  FileText, Database, CheckCircle2, Star
} from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';
import CosmicCanvas from '../components/CosmicCanvas';

// High-end architectural and workspace photos with warm tones
const LOGIN_BG_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80',
];

// Interactive floating preview photo cards with hover animations
const FLOATING_PREVIEWS = [
  {
    title: 'Knowledge Intelligence',
    tag: 'RAG Core',
    normalImg: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    position: 'top-24 left-8 lg:left-14',
    rotation: '-rotate-3',
  },
  {
    title: 'Enterprise Security',
    tag: 'SOC-2 Ready',
    normalImg: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    position: 'bottom-20 left-8 lg:left-16',
    rotation: 'rotate-2',
  },
  {
    title: 'Copilot Terminal',
    tag: 'Gemini 2.0',
    normalImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    position: 'top-28 right-8 lg:right-14',
    rotation: 'rotate-3',
  },
  {
    title: 'Global Multi-Tenant',
    tag: 'Isolated DB',
    normalImg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
    position: 'bottom-24 right-8 lg:right-16',
    rotation: '-rotate-2',
  },
];

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [bgIndex, setBgIndex]   = useState(0);
  const { setToken, setUser }   = useAuth();
  const navigate                = useNavigate();
  const location                = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);

    // Subtle background cycling every 9 seconds
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % LOGIN_BG_IMAGES.length);
    }, 9000);

    return () => {
      window.removeEventListener('mousemove', h);
      clearInterval(interval);
    };
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
    const u   = { email: `${dept.toLowerCase()}@docusync.corp`, fullName: `Enterprise ${dept} Lead`, department: dept };
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(u));
    if (setToken) setToken(tok);
    if (setUser)  setUser(u);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#12151f] text-[#f7f2ea]">
      {/* Auto-cycling full-bleed background photographs */}
      {LOGIN_BG_IMAGES.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt="Enterprise background"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2500ms]"
          style={{
            opacity: bgIndex === idx ? 0.28 : 0,
            filter: 'brightness(0.3) saturate(0.65) sepia(0.2)',
          }}
        />
      ))}

      {/* Cosmic stars with warm golden twinkle */}
      <CosmicCanvas />

      {/* Cursor spotlight with warm amber/gold tone */}
      <div
        className="pointer-events-none fixed inset-0 z-[2] transition-all duration-200"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 180, 130, 0.16), transparent 70%)`,
        }}
      />

      {/* Warm beige / champagne ambient gradients */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(217,180,130,0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(18,21,31,0.5) 0%, rgba(18,21,31,0.85) 100%)',
        }}
      />

      {/* ── Fixed Back to Home button ── */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-[#eedfc8] hover:text-white transition-all hover:scale-105 shadow-xl"
          style={{
            background: 'rgba(30, 26, 22, 0.75)',
            border: '1px solid rgba(217, 180, 130, 0.3)',
            backdropFilter: 'blur(16px)',
            padding: '9px 16px',
            borderRadius: '12px',
          }}
        >
          <ArrowLeft size={14} className="text-[#d9b482]" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* ── Interactive floating photo cards that swap images on hover ── */}
      <div className="hidden xl:block pointer-events-auto">
        {FLOATING_PREVIEWS.map((card, i) => (
          <div
            key={i}
            className={`fixed ${card.position} z-20 w-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-110 hover:z-30 cursor-pointer group ${card.rotation}`}
            style={{
              background: 'rgba(25, 23, 20, 0.88)',
              border: '1px solid rgba(217, 180, 130, 0.25)',
              backdropFilter: 'blur(14px)',
            }}
          >
            {/* Header bar */}
            <div className="px-3 py-1.5 flex items-center justify-between border-b border-amber-900/20 bg-black/40">
              <span className="text-[9px] font-mono tracking-wider uppercase text-[#d9b482] font-semibold">
                {card.tag}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Photo with hover swap */}
            <div className="relative h-24 overflow-hidden">
              <img
                src={card.normalImg}
                alt={card.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
                style={{ filter: 'brightness(0.7) saturate(0.8)' }}
              />
              <img
                src={card.hoverImg}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                style={{ filter: 'brightness(0.85) saturate(1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2">
                <p className="text-[10px] font-medium text-[#f7f2ea] truncate">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Login Container ── */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center py-16 px-4">
        {/* Brand identity */}
        <Link to="/" className="flex items-center gap-3.5 mb-8 group">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #c4975f, #8c6032)',
              boxShadow: '0 0 35px rgba(196, 151, 95, 0.45)',
            }}
          >
            <Sparkles size={22} className="text-[#fffaf3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-2xl tracking-tight">DocuSync AI</span>
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold"
                style={{
                  background: 'rgba(217, 180, 130, 0.15)',
                  color: '#e6c89c',
                  border: '1px solid rgba(217, 180, 130, 0.3)',
                }}
              >
                Enterprise
              </span>
            </div>
            <p className="text-xs text-[#b8a692]">Institutional Intelligence Platform</p>
          </div>
        </Link>

        {/* Luxury Glass Form Card */}
        <div
          className="w-full max-w-sm rounded-[28px] overflow-hidden"
          style={{
            background: 'rgba(20, 22, 30, 0.88)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(217, 180, 130, 0.22)',
            boxShadow: '0 40px 90px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 245, 230, 0.12)',
          }}
        >
          <div className="px-8 pt-8 pb-8">
            <h2 className="text-2xl font-bold text-[#faf6ef] tracking-tight mb-1">Sign in</h2>
            <p className="text-xs text-[#b8a692] mb-6">Enter your enterprise credentials</p>

            {error && (
              <div
                className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 text-rose-200"
                style={{
                  background: 'rgba(225, 29, 72, 0.12)',
                  border: '1px solid rgba(225, 29, 72, 0.3)',
                }}
              >
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[11px] font-mono font-semibold text-[#cfbda9] uppercase tracking-wider mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7b69]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.chen@enterprise.com"
                    className="w-full pl-9 pr-3 py-3 text-xs text-[#faf6ef] placeholder-[#7d6f5e] rounded-xl outline-none transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(217, 180, 130, 0.16)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.16)')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold text-[#cfbda9] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7b69]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-3 text-xs text-[#faf6ef] placeholder-[#7d6f5e] rounded-xl outline-none transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(217, 180, 130, 0.16)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.16)')}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-[#14110d] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-60 mt-2 shadow-lg cursor-pointer"
                style={{
                  background: 'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)',
                  boxShadow: '0 0 25px rgba(217, 180, 130, 0.4)',
                }}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#14110d] border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span>Sign in to Enterprise Hub</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Welcome to enterprise quick shortcuts */}
            <div className="mt-6 pt-5 border-t" style={{ borderColor: 'rgba(217, 180, 130, 0.12)' }}>
              <p className="text-center text-[12px] font-semibold tracking-wide mb-3 bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                Welcome to the world of enterprise
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['Engineering', 'text-cyan-300', '#06b6d4'],
                  ['HR',          'text-purple-300', '#a855f7'],
                  ['Legal',       'text-amber-300', '#f59e0b'],
                  ['Sales',       'text-emerald-300', '#10b981'],
                ].map(([dept, cls, hex]) => (
                  <button
                    key={dept}
                    onClick={() => handleDemo(dept)}
                    className={`py-2.5 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 ${cls} hover:scale-[1.04] transition-all cursor-pointer`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(217, 180, 130, 0.12)',
                    }}
                  >
                    <ShieldCheck size={11} style={{ color: hex }} />
                    <span>{dept} Lead</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-[#a3927f] mt-5">
              New to DocuSync?{' '}
              <Link to="/register" className="text-[#e6c89c] hover:text-[#fff0dc] font-semibold transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <FloatingChatWidget />
    </div>
  );
}
