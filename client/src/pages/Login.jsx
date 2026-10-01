import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { Sparkles, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await client.post('/api/auth/login', { email, password });
      const token = res.data?.token || res.data?.access_token || 'demo-jwt-token';
      
      // Save JWT token as required by Member 1 Guide
      localStorage.setItem('token', token);
      
      const userData = res.data?.user || {
        email,
        fullName: res.data?.fullName || email.split('@')[0],
        department: res.data?.department || 'Engineering'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (setToken) setToken(token);
      if (setUser) setUser(userData);

      const redirectPath = location.state?.from?.pathname || '/chat';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.warn('Backend login request error:', err);
      // Enterprise demo fallback if Member 3 backend is offline
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
        navigate('/chat', { replace: true });
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
    navigate('/chat', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-xl shadow-blue-500/25">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-white">
          DocuSync <span className="text-blue-400">AI</span>
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enterprise Knowledge Orchestration & Copilot
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-800/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-700 sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 flex items-start gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Corporate Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@enterprise.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Sign in to Enterprise Hub <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-slate-700/80">
            <p className="text-xs font-medium text-slate-400 text-center mb-3">
              One-Click Hackathon Fast-Demo Access:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('Engineering')}
                className="px-2.5 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs rounded-md border border-slate-600 transition flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Engineering
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('HR')}
                className="px-2.5 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs rounded-md border border-slate-600 transition flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> HR Dept
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Don't have an enterprise account?{' '}
              <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
