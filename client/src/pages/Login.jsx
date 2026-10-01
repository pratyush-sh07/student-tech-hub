import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';

const LOGIN_BG  = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=85';
const LOGIN_SIDE = 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80';

const BEIGE = '#e8dcc8';
const CREAM = '#f5f0e8';
const TAN   = '#c4a882';
const COFFEE= '#6b4c2a';
const INK   = '#1a1714';
const WARM  = '#2c2420';

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { setToken, setUser } = useAuth();
  const navigate              = useNavigate();
  const location              = useLocation();

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
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (dept) => {
    const tok = 'demo-' + Date.now();
    const u = { email: `${dept.toLowerCase()}@docusync.corp`, fullName: `${dept} Lead`, department: dept };
    localStorage.setItem('token', tok); localStorage.setItem('user', JSON.stringify(u));
    if (setToken) setToken(tok); if (setUser) setUser(u);
    navigate('/dashboard', { replace: true });
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: '13px',
    background: 'rgba(26,23,20,0.04)', border: '1px solid rgba(26,23,20,0.15)',
    borderRadius: '4px', color: INK, outline: 'none',
    fontFamily: 'Georgia, serif', boxSizing: 'border-box',
    transition: 'border-color .2s',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: INK, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── LEFT PANEL: full-height photograph ── */}
      <div style={{ flex: '0 0 48%', position: 'relative', overflow: 'hidden' }} className="hidden lg:block">
        <img src={LOGIN_SIDE} alt="Knowledge and focus"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.5) saturate(0.6) sepia(0.35)' }}/>
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,23,20,0.4) 0%, rgba(26,23,20,0.85) 100%)' }}/>

        {/* Brand on top of photo */}
        <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: `linear-gradient(135deg, ${COFFEE}, ${TAN})`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '14px' }}>⬡</span>
            </div>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: BEIGE, letterSpacing: '0.06em' }}>DOCUSYNC AI</span>
          </Link>
        </div>

        {/* Quote block */}
        <div style={{ position: 'absolute', bottom: '60px', left: '40px', right: '40px' }}>
          <div style={{ width: '32px', height: '1px', background: TAN, marginBottom: '20px', opacity: 0.6 }}/>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 400, lineHeight: 1.35, color: CREAM, marginBottom: '12px', fontStyle: 'italic' }}>
            "Every answer, traced back to its source."
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(232,220,200,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Grounded RAG · Gemini 2.0 · Enterprise AI
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL: login form on warm beige ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px', background: CREAM, position: 'relative', overflowY: 'auto' }}>

        {/* Back to home — mobile */}
        <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: COFFEE, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
            <ArrowLeft size={12}/> Home
          </Link>
        </div>

        <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
          {/* Mobile brand */}
          <div className="lg:hidden" style={{ marginBottom: '32px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: INK, letterSpacing: '0.06em' }}>DOCUSYNC AI</span>
          </div>

          <p style={{ fontSize: '10px', color: TAN, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Welcome back</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 400, color: INK, marginBottom: '4px', letterSpacing: '-0.01em' }}>Sign in</h1>
          <p style={{ fontSize: '13px', color: 'rgba(26,23,20,0.5)', marginBottom: '36px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Access your enterprise knowledge hub</p>

          {error && (
            <div style={{ padding: '12px 16px', marginBottom: '20px', background: 'rgba(180,60,40,0.08)', border: '1px solid rgba(180,60,40,0.2)', borderRadius: '4px', fontSize: '12px', color: '#8b2a1a', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: COFFEE, marginBottom: '6px', fontFamily: 'Georgia, serif' }}>Corporate Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@enterprise.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = COFFEE}
                onBlur={e => e.target.style.borderColor = 'rgba(26,23,20,0.15)'}/>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: COFFEE, marginBottom: '6px', fontFamily: 'Georgia, serif' }}>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••" style={inputStyle}
                onFocus={e => e.target.style.borderColor = COFFEE}
                onBlur={e => e.target.style.borderColor = 'rgba(26,23,20,0.15)'}/>
            </div>

            <button type="submit" disabled={loading}
              style={{ padding: '14px', fontSize: '12px', fontWeight: 600, color: CREAM, background: INK, border: 'none', borderRadius: '4px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background .2s', marginTop: '6px', opacity: loading ? 0.7 : 1, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onMouseOver={e => !loading && (e.target.style.background = WARM)}
              onMouseOut={e => e.target.style.background = INK}>
              {loading ? 'Authenticating...' : <><span>Sign In</span><ArrowRight size={14}/></>}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(26,23,20,0.1)' }}/>
            <span style={{ fontSize: '10px', color: 'rgba(26,23,20,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>Hackathon Demo Access</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(26,23,20,0.1)' }}/>
          </div>

          {/* Demo buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['Engineering', 'HR', 'Legal', 'Sales'].map(dept => (
              <button key={dept} onClick={() => handleDemo(dept)}
                style={{ padding: '10px', fontSize: '11px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: COFFEE, background: 'transparent', border: `1px solid rgba(107,76,42,0.25)`, borderRadius: '4px', cursor: 'pointer', transition: 'background .2s, border-color .2s' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(107,76,42,0.07)'; e.currentTarget.style.borderColor = 'rgba(107,76,42,0.5)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(107,76,42,0.25)'; }}>
                {dept} Lead →
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(26,23,20,0.45)', marginTop: '28px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            New to DocuSync?{' '}
            <Link to="/register" style={{ color: COFFEE, textDecoration: 'none', fontStyle: 'normal', fontWeight: 600 }}>Create account</Link>
          </p>
        </div>
      </div>

      <FloatingChatWidget/>
    </div>
  );
}
