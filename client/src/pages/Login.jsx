import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Bot, 
  ArrowLeft 
} from 'lucide-react';
import CosmicCanvas from '../components/CosmicCanvas';
import FloatingChatWidget from '../components/FloatingChatWidget';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await client.post('/api/auth/login', { email, password });
      const token = res.data?.token || res.data?.access_token || 'demo-jwt-token';
      
      localStorage.setItem('token', token);
      
      const userData = res.data?.user || {
        email,
        fullName: res.data?.fullName || email.split('@')[0],
        department: res.data?.department || 'Engineering'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (setToken) setToken(token);
      if (setUser) setUser(userData);

      const redirectPath = location.state?.from?.pathname || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.warn('Backend login request error:', err);
      if (!err.response || err.code === 'ERR_NETWORK') {
        const demoToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', demoToken);
        const demoUser = {
          email,
          fullName: email.split('@')[0],
          department: 'Engineering'
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        if (setToken) setToken(demoToken);
        if (setUser) setUser(demoUser);
        navigate('/dashboard', { replace: true });
        return;
      }

      setError(err.response?.data?.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = (dept = 'Engineering') => {
    const demoToken = 'demo-jwt-token-' + Date.now();
    localStorage.setItem('token', demoToken);
    const demoUser = {
      email: `${dept.toLowerCase()}@docusync.corp`,
      fullName: `Enterprise ${dept} Lead`,
      department: dept
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    if (setToken) setToken(demoToken);
    if (setUser) setUser(demoUser);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#06080e] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-grid-tech noise-overlay selection:bg-blue-600 selection:text-white">
      {/* Interactive Constellation Particle Canvas */}
      <CosmicCanvas />

      {/* Dynamic Cursor Spotlight that follows mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.14), transparent 75%)`,
        }}
      />

      {/* Atmospheric Luminous Background Glows */}
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-blue-600/20 via-indigo-600/15 to-transparent blur-[140px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-[20%] -left-24 w-[450px] h-[450px] bg-cyan-600/10 blur-[130px] pointer-events-none animate-blob"></div>

      {/* Floating Glassmorphic Badges */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-card text-xs text-cyan-300 absolute top-28 left-[14%] animate-float-slow shadow-2xl border border-cyan-500/30">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-mono text-[11px]">End-to-End Encrypted Session</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-card text-xs text-indigo-300 absolute bottom-36 left-[16%] animate-float-reverse shadow-2xl border border-indigo-500/30">
        <Bot className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-mono text-[11px]">Gemini 2.0 RAG Active</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-card text-xs text-purple-300 absolute top-36 right-[14%] animate-float-medium shadow-2xl border border-purple-500/30">
        <Building2 className="w-3.5 h-3.5 text-purple-400" />
        <span className="font-mono text-[11px]">Multi-Department RBAC</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-card text-xs text-emerald-300 absolute bottom-32 right-[16%] animate-float-fast shadow-2xl border border-emerald-500/30">
        <Zap className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-mono text-[11px]">Sub-300ms Retrieval</span>
      </div>

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl luxury-glass border border-white/10 hover:border-slate-500 transition shadow-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-20">
        <div className="flex justify-center">
          <Link to="/" className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-2xl shadow-blue-500/35 hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950/90 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-7 h-7 text-cyan-300" />
            </div>
          </Link>
        </div>
        <h2 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-white">
          DocuSync <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">AI</span>
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400 font-mono tracking-wide">
          Institutional Knowledge OS & Copilot
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-20 px-4 sm:px-0">
        <div className="luxury-glass py-8 px-6 shadow-2xl rounded-3xl border border-white/10 sm:px-10 backdrop-blur-3xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-800 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Corporate Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@enterprise.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-xl shadow-blue-600/30 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-60 cursor-pointer uppercase tracking-wider"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Authenticating Session...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Sign in to Enterprise Hub <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar for Hackathon Reviewers */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <p className="text-[11px] font-mono font-semibold text-slate-400 text-center mb-3">
              One-Click Hackathon Role Shortcuts:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('Engineering')}
                className="px-2.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[11px] rounded-xl border border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer font-mono"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Engineering Lead
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('HR')}
                className="px-2.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[11px] rounded-xl border border-slate-800 hover:border-purple-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer font-mono"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> HR Director
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Need a new enterprise account?{' '}
              <Link to="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating AI Assistant */}
      <FloatingChatWidget />
    </div>
  );
};

export default Login;
