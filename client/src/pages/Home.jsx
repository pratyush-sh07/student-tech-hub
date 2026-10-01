import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Search, MessageSquare, CheckCircle } from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';

/* ─── Warm editorial photo pool ─── */
const HERO_BG   = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=85';
const COFFEE_BG = 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=80';
const DESK_BG   = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80';
const ARCH_BG   = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80';

/* ─── Color palette ─── */
const BEIGE  = '#e8dcc8';
const CREAM  = '#f5f0e8';
const TAN    = '#c4a882';
const COFFEE = '#6b4c2a';
const INK    = '#1a1714';
const WARM   = '#2c2420';

/* ─── Left floating card — Dashboard (dark) ─── */
const LeftCard = () => (
  <div className="w-full h-full flex flex-col" style={{ background: INK, color: BEIGE }}>
    {/* Mini navbar */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'rgba(232,220,200,0.08)', background: WARM }}>
      <span style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: TAN, letterSpacing: '0.05em' }}>DocuSync</span>
      <div className="flex gap-3 text-[9px]" style={{ color: 'rgba(196,168,130,0.6)' }}>
        <span>Dashboard</span><span>Docs</span><span>Chat</span>
      </div>
    </div>
    <div className="px-4 py-4 flex-1">
      <p style={{ fontSize: '9px', color: TAN, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Knowledge Base</p>
      {['HR Handbook 2026','Legal — GDPR Compliance','Engineering Architecture','Sales Playbook Q4'].map((t,i)=>(
        <div key={i} style={{ padding: '8px 0', borderBottom: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: TAN, opacity: 0.7, flexShrink: 0 }}/>
          <span style={{ fontSize: '10px', color: 'rgba(232,220,200,0.75)', fontFamily: 'Georgia, serif' }}>{t}</span>
        </div>
      ))}
      <div style={{ marginTop: '16px', padding: '10px 12px', background: 'rgba(232,220,200,0.05)', borderRadius: '8px', border: '1px solid rgba(232,220,200,0.1)' }}>
        <p style={{ fontSize: '8px', color: TAN, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Active Since</p>
        <p style={{ fontSize: '11px', color: BEIGE, fontFamily: 'Georgia, serif' }}>Monday – Friday</p>
        <p style={{ fontSize: '9px', color: 'rgba(232,220,200,0.5)' }}>Los Angeles, CA</p>
      </div>
    </div>
  </div>
);

/* ─── Center floating card — Search (light beige) ─── */
const CenterCard = () => (
  <div className="w-full h-full flex flex-col" style={{ background: CREAM, color: INK }}>
    <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(26,23,20,0.1)' }}>
      <span style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: COFFEE, letterSpacing: '0.05em' }}>DOCUSYNC AI</span>
      <div className="flex gap-4 text-[9px]" style={{ color: 'rgba(107,76,42,0.6)', fontFamily: 'Georgia, serif' }}>
        <span>Knowledge</span><span>Copilot</span><span>Vault</span><span style={{ padding: '3px 8px', border: '1px solid rgba(107,76,42,0.4)', borderRadius: '4px', color: COFFEE }}>Ask AI</span>
      </div>
    </div>
    <div className="flex-1 px-5 py-5">
      <p style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: '6px', letterSpacing: '-0.01em' }}>
        INSTITUTIONAL<br/>KNOWLEDGE
      </p>
      <p style={{ fontSize: '9px', color: COFFEE, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>BY DOCUSYNC AI</p>
      <div style={{ height: '1px', background: 'rgba(26,23,20,0.1)', marginBottom: '14px' }}/>
      <p style={{ fontSize: '10px', color: 'rgba(26,23,20,0.6)', lineHeight: 1.6, marginBottom: '16px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
        Instantly retrieve verified answers from your company's HR policies, legal documents, and architecture specs.
      </p>
      {/* Mini search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(26,23,20,0.05)', borderRadius: '6px', border: '1px solid rgba(26,23,20,0.12)' }}>
        <Search size={11} color={COFFEE}/>
        <span style={{ fontSize: '10px', color: 'rgba(26,23,20,0.4)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Search your documents...</span>
      </div>
    </div>
  </div>
);

/* ─── Right floating card — AI Chat (dark) ─── */
const RightCard = () => (
  <div className="w-full h-full flex flex-col" style={{ background: '#14110e', color: BEIGE }}>
    <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'rgba(232,220,200,0.06)', background: '#0f0d0a' }}>
      <span style={{ fontSize: '9px', color: TAN, fontFamily: 'Georgia, serif', letterSpacing: '0.06em' }}>COPILOT · ACTIVE</span>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7cbc7c' }}/>
    </div>
    <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* AI bubble */}
      <div style={{ padding: '10px 12px', background: 'rgba(232,220,200,0.06)', borderRadius: '0 10px 10px 10px', border: '1px solid rgba(232,220,200,0.08)' }}>
        <p style={{ fontSize: '9px', color: 'rgba(232,220,200,0.7)', lineHeight: 1.5, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          "Per the Employee Handbook §4.3, full-time employees receive 25 PTO days annually..."
        </p>
        <div style={{ marginTop: '6px', padding: '4px 8px', background: 'rgba(196,168,130,0.1)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <FileText size={8} color={TAN}/>
          <span style={{ fontSize: '8px', color: TAN, fontFamily: 'monospace' }}>Employee_Handbook.pdf</span>
        </div>
      </div>
      {/* User bubble */}
      <div style={{ alignSelf: 'flex-end', padding: '8px 12px', background: 'rgba(196,168,130,0.15)', borderRadius: '10px 0 10px 10px', border: '1px solid rgba(196,168,130,0.2)' }}>
        <p style={{ fontSize: '9px', color: BEIGE }}>What is our GDPR policy?</p>
      </div>
      {/* AI response */}
      <div style={{ padding: '10px 12px', background: 'rgba(232,220,200,0.06)', borderRadius: '0 10px 10px 10px', border: '1px solid rgba(232,220,200,0.08)' }}>
        <p style={{ fontSize: '9px', color: 'rgba(232,220,200,0.7)', lineHeight: 1.5, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          "All user data is cryptographically isolated per tenant. No cross-departmental access..."
        </p>
        <div style={{ marginTop: '6px', padding: '4px 8px', background: 'rgba(196,168,130,0.1)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <FileText size={8} color={TAN}/>
          <span style={{ fontSize: '8px', color: TAN, fontFamily: 'monospace' }}>Legal_GDPR_2026.pdf</span>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Browser Chrome Wrapper ─── */
const BrowserMockup = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-xl overflow-hidden shadow-2xl ${className}`}
    style={{ border: '1px solid rgba(255,255,255,0.06)', ...style }}>
    {/* Browser chrome bar */}
    <div style={{ height: '24px', background: '#2c2420', display: 'flex', alignItems: 'center', paddingLeft: '10px', gap: '5px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }}/>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }}/>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }}/>
    </div>
    <div style={{ flex: 1, overflow: 'hidden', height: 'calc(100% - 24px)' }}>
      {children}
    </div>
  </div>
);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const parallax = -scrollY * 0.3;

  return (
    <div style={{ background: INK, color: BEIGE, minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>

      {/* ══════════════════════════════════════════
          SLIM EDITORIAL NAVBAR
      ══════════════════════════════════════════ */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', background: 'rgba(26,23,20,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,220,200,0.06)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '28px', height: '28px', background: `linear-gradient(135deg, ${COFFEE}, ${TAN})`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px' }}>⬡</span>
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: BEIGE, letterSpacing: '0.04em' }}>DOCUSYNC AI</span>
        </Link>

        <nav style={{ display: 'flex', gap: '32px', fontSize: '11px', color: 'rgba(232,220,200,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <a href="#hero"     style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={e=>e.target.style.color=BEIGE} onMouseOut={e=>e.target.style.color='rgba(232,220,200,0.55)'}>Platform</a>
          <a href="#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={e=>e.target.style.color=BEIGE} onMouseOut={e=>e.target.style.color='rgba(232,220,200,0.55)'}>Features</a>
          <a href="#how"      style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={e=>e.target.style.color=BEIGE} onMouseOut={e=>e.target.style.color='rgba(232,220,200,0.55)'}>How It Works</a>
        </nav>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login"    style={{ fontSize: '11px', color: 'rgba(232,220,200,0.6)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Log In</Link>
          <Link to="/dashboard" style={{ fontSize: '11px', fontWeight: 600, color: INK, background: BEIGE, padding: '7px 18px', borderRadius: '4px', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background .2s' }}
            onMouseOver={e=>e.target.style.background=CREAM}
            onMouseOut={e=>e.target.style.background=BEIGE}>
            Get Started
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO — FULL VIEWPORT PHOTO + 3 FLOATING CARDS
          Exactly like Squarespace reference
      ══════════════════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: '700px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px' }}>
        {/* Background photograph — warm books/reading scene */}
        <img src={HERO_BG} alt="Books and knowledge"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'brightness(0.35) saturate(0.6) sepia(0.2)', transform: `translateY(${parallax}px)` }}/>

        {/* Warm dark overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,23,20,0.5) 0%, rgba(26,23,20,0.2) 35%, rgba(26,23,20,0.3) 65%, rgba(26,23,20,1) 100%)' }}/>

        {/* Hero text — top center */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '600px', padding: '0 24px' }}>
          <Link to="/dashboard"
            style={{ display: 'inline-block', fontSize: '13px', fontWeight: 600, color: INK, background: CREAM, padding: '14px 36px', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: '0 4px 24px rgba(0,0,0,0.4)', transition: 'transform .2s, background .2s', marginBottom: '16px' }}
            onMouseOver={e=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseOut={e=>{e.currentTarget.style.background=CREAM; e.currentTarget.style.transform='translateY(0)'}}>
            Get Started
          </Link>
          <p style={{ fontSize: '13px', color: 'rgba(232,220,200,0.65)', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginTop: '4px' }}>
            For enterprise teams. No setup fee required.
          </p>
        </div>

        {/* ── THREE FLOATING BROWSER MOCKUP CARDS ── */}
        {/* Squarespace style: left partially visible, center prominent, right partially visible */}
        <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px', padding: '0 16px', zIndex: 10 }}>

          {/* LEFT card — partially visible, tilted slightly */}
          <div style={{ flexShrink: 0, width: '240px', height: '280px', transform: 'rotate(-2deg) translateY(20px)', opacity: 0.85, position: 'relative', zIndex: 1 }}>
            <BrowserMockup style={{ width: '100%', height: '100%' }}>
              <LeftCard/>
            </BrowserMockup>
          </div>

          {/* CENTER card — largest, most prominent, upright */}
          <div style={{ flexShrink: 0, width: '380px', height: '320px', transform: 'translateY(0px)', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' }}>
            <BrowserMockup style={{ width: '100%', height: '100%' }}>
              <CenterCard/>
            </BrowserMockup>
          </div>

          {/* RIGHT card — partially visible, tilted slightly opposite */}
          <div style={{ flexShrink: 0, width: '240px', height: '280px', transform: 'rotate(2deg) translateY(20px)', opacity: 0.85, position: 'relative', zIndex: 1 }}>
            <BrowserMockup style={{ width: '100%', height: '100%' }}>
              <RightCard/>
            </BrowserMockup>
          </div>
        </div>
      </section>

      {/* Tagline strip below hero */}
      <section style={{ background: INK, padding: '60px 24px 50px', textAlign: 'center', borderTop: `1px solid rgba(232,220,200,0.06)` }}>
        <p style={{ fontSize: '14px', color: 'rgba(232,220,200,0.5)', fontFamily: 'Georgia, serif', fontStyle: 'italic', letterSpacing: '0.02em' }}>
          Trusted by{' '}
          <span style={{ color: TAN, fontStyle: 'normal' }}>enterprise institutions</span>{' '}
          that cannot afford knowledge gaps.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px', marginTop: '24px' }}>
          {['NEXUS CORP', 'AXIOM HEALTH', 'VERTEX LEGAL', 'HORIZON AI', 'SYNAPSE LABS'].map((b,i)=>(
            <span key={i} style={{ fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(232,220,200,0.3)', textTransform: 'uppercase' }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHOTO FEATURE SECTION — Coffee + Knowledge
      ══════════════════════════════════════════ */}
      <section id="features" style={{ background: WARM, padding: '100px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            {/* Left — photograph */}
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src={COFFEE_BG} alt="Knowledge and focus"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(0.7) sepia(0.3)' }}/>
              {/* Overlay caption card */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', padding: '16px 20px', background: 'rgba(26,23,20,0.88)', borderRadius: '8px', border: '1px solid rgba(232,220,200,0.08)', backdropFilter: 'blur(12px)' }}>
                <p style={{ fontSize: '11px', color: TAN, fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: '4px' }}>Sub-300ms retrieval</p>
                <p style={{ fontSize: '9px', color: 'rgba(232,220,200,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Semantic vector search · Gemini 2.0 RAG</p>
              </div>
            </div>
            {/* Right — editorial text */}
            <div>
              <p style={{ fontSize: '10px', color: TAN, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>Intelligent Retrieval</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '38px', fontWeight: 400, lineHeight: 1.2, color: BEIGE, letterSpacing: '-0.01em', marginBottom: '20px' }}>
                Your company's memory, finally searchable.
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(232,220,200,0.55)', lineHeight: 1.75, marginBottom: '28px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                DocuSync AI ingests HR handbooks, legal policies, and architecture docs into a semantic vector store — then returns verified answers in under 300ms.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Every answer cites its exact source document', 'RBAC scoping keeps departments isolated', 'Zero hallucination — grounded context only'].map((f,i)=>(
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '4px', height: '4px', background: TAN, borderRadius: '50%', marginTop: '7px', flexShrink: 0 }}/>
                    <span style={{ fontSize: '13px', color: 'rgba(232,220,200,0.7)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-BLEED DARK PHOTO — CTA PANEL
      ══════════════════════════════════════════ */}
      <section id="how" style={{ position: 'relative', padding: '140px 24px', overflow: 'hidden' }}>
        <img src={ARCH_BG} alt="Enterprise space"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.15) saturate(0.3) sepia(0.4)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(26,23,20,0.95) 0%, rgba(26,23,20,0.7) 60%, rgba(26,23,20,0.4) 100%)` }}/>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <p style={{ fontSize: '10px', color: TAN, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>How It Works</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '44px', fontWeight: 400, color: CREAM, lineHeight: 1.15, marginBottom: '32px', letterSpacing: '-0.01em' }}>
              Three steps to institutional intelligence.
            </h2>
            <Link to="/dashboard"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: INK, background: BEIGE, padding: '14px 28px', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background .2s, transform .2s' }}
              onMouseOver={e=>{e.currentTarget.style.background=CREAM; e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseOut={e=>{e.currentTarget.style.background=BEIGE; e.currentTarget.style.transform='translateY(0)'}}>
              Launch Platform <ArrowRight size={14}/>
            </Link>
          </div>
          {/* Right — steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { n:'01', title:'Ingest Documents', body:'Upload PDFs, DOCX, and policy files. They are chunked, embedded, and indexed into your private tenant vector store.' },
              { n:'02', title:'Ask Any Question', body:'Your team types a question in plain English. The AI retrieves top-k semantically similar chunks from your corpus.' },
              { n:'03', title:'Verified Answer + Source', body:'Gemini synthesizes a grounded response and returns the exact source file — no guessing, no hallucination.' },
            ].map((s,i)=>(
              <div key={i} style={{ padding: '24px 0', borderBottom: i < 2 ? `1px solid rgba(232,220,200,0.07)` : 'none', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: TAN, opacity: 0.6, flexShrink: 0, paddingTop: '3px' }}>{s.n}</span>
                <div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: BEIGE, marginBottom: '6px', fontWeight: 400 }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(232,220,200,0.5)', lineHeight: 1.65, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DEPARTMENT PHOTO GRID
      ══════════════════════════════════════════ */}
      <section style={{ background: INK, padding: '100px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '10px', color: TAN, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>Departmental Coverage</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: 400, color: BEIGE, letterSpacing: '-0.01em' }}>One platform, every team.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {[
              { label:'Engineering', photo:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=70', desc:'Architecture specs, cloud configs, CI/CD runbooks' },
              { label:'Human Resources', photo:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=70', desc:'PTO policies, benefits, onboarding documentation' },
              { label:'Legal', photo:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=70', desc:'GDPR mandates, SOC-2 compliance, contract templates' },
              { label:'Sales', photo:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=70', desc:'Pricing tiers, playbooks, competitive intelligence' },
            ].map((d,i)=>(
              <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(232,220,200,0.06)', position: 'relative', aspectRatio: '3/4', cursor: 'pointer' }}
                onMouseOver={e=>e.currentTarget.querySelector('img').style.filter='brightness(0.55) saturate(0.5) sepia(0.3)'}
                onMouseOut={e=>e.currentTarget.querySelector('img').style.filter='brightness(0.35) saturate(0.4) sepia(0.4)'}>
                <img src={d.photo} alt={d.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(0.4) sepia(0.4)', transition: 'filter 0.4s ease' }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.95) 0%, transparent 60%)' }}/>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px' }}>
                  <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: CREAM, marginBottom: '6px', fontWeight: 400 }}>{d.label}</h4>
                  <p style={{ fontSize: '11px', color: 'rgba(232,220,200,0.45)', lineHeight: 1.5, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA STRIP
      ══════════════════════════════════════════ */}
      <section style={{ background: WARM, padding: '80px 24px', textAlign: 'center', borderTop: `1px solid rgba(232,220,200,0.06)` }}>
        <p style={{ fontSize: '10px', color: TAN, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>DocuSync AI · Enterprise AI Hackathon</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '42px', fontWeight: 400, color: CREAM, marginBottom: '28px', letterSpacing: '-0.01em' }}>
          Begin your knowledge transformation.
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" style={{ fontSize: '12px', fontWeight: 600, color: INK, background: BEIGE, padding: '14px 32px', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Launch Platform
          </Link>
          <Link to="/login" style={{ fontSize: '12px', color: BEIGE, background: 'transparent', padding: '14px 32px', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', border: `1px solid rgba(232,220,200,0.2)` }}>
            Sign In
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#100e0b', padding: '24px', textAlign: 'center', borderTop: '1px solid rgba(232,220,200,0.04)' }}>
        <p style={{ fontSize: '11px', color: 'rgba(232,220,200,0.25)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          © 2026 DocuSync AI — Grounded Retrieval-Augmented Generation for Enterprise
        </p>
      </footer>

      <FloatingChatWidget />
    </div>
  );
}
