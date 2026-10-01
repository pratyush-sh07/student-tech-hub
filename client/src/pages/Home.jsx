import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Bot, FileText, ShieldCheck, ArrowRight, 
  Database, Cpu, Zap, CheckCircle2, Building2, 
  Search, ChevronRight, Play, X
} from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';

/* ─── Unsplash photo pool ─── */
const HERO_BG   = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80';
const BOOKS_BG  = 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80';
const DESK_BG   = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80';
const OFFICE_BG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';
const MEETING_BG= 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80';
const CODE_BG   = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80';
const DOCS_BG   = 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=900&q=80';

/* ─── Floating UI Mockup preview cards ─── */
const MockupCard = ({ img, title, tag, className }) => (
  <div className={`absolute rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950 ${className}`}
    style={{ backdropFilter: 'blur(8px)' }}>
    <div className="h-5 bg-slate-900/90 flex items-center gap-1.5 px-3 border-b border-white/5">
      <div className="w-2 h-2 rounded-full bg-red-500/70"/>
      <div className="w-2 h-2 rounded-full bg-amber-500/70"/>
      <div className="w-2 h-2 rounded-full bg-emerald-500/70"/>
      <span className="ml-2 text-[9px] font-mono text-slate-500">{title}</span>
    </div>
    <div className="relative">
      <img src={img} alt="" className="w-full h-full object-cover" style={{ maxHeight: '140px' }}/>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"/>
      <div className="absolute bottom-2 left-2.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300 font-mono">{tag}</span>
      </div>
    </div>
  </div>
);

/* ─── Department Queries ─── */
const QUESTIONS = [
  { dept: 'Legal',       query: 'What SOC-2 data residency policies apply to AI models?',     src: 'SOC2_Compliance_2026.pdf',    lat: '310ms' },
  { dept: 'Engineering', query: 'What are our EKS Helm deployment standards?',                 src: 'Cloud_Architecture_Spec.pdf', lat: '380ms' },
  { dept: 'HR',          query: 'What is our annual PTO and wellness stipend policy?',          src: 'Employee_Handbook_2026.pdf',  lat: '275ms' },
  { dept: 'Sales',       query: 'What are enterprise tier pricing thresholds?',                src: 'Sales_Playbook_Q4.pdf',        lat: '340ms' },
];

const ANSWERS = [
  'DocuSync AI enforces SOC-2 Type II standards. All enterprise tenant data is cryptographically isolated—your proprietary documents are never used to train external frontier models.',
  'Production microservices deploy via standardized Helm charts on AWS EKS. All inter-service comms require mTLS + JWT bearer authorization with 80% automated test coverage.',
  'Full-time employees receive 25 annual PTO days plus corporate holidays. Health, dental, and vision coverage begins Day 1 with a $1,200 annual wellness stipend.',
  'Standard SaaS tier is $45/user/month billed annually. Custom on-premises vector DB deployments require MSA countersigned by VP or C-level executive.',
];

export default function Home() {
  const [activeQ, setActiveQ]   = useState(0);
  const [sim, setSim]           = useState(false);
  const [mousePos, setMousePos] = useState({ x: 760, y: 400 });
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const pick = (idx) => {
    setActiveQ(idx); setSim(true);
    setTimeout(() => setSim(false), 450);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-slate-100 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ══════════════════════════════════════════
          FLOATING GLASS NAVBAR
      ══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
        <div className="max-w-7xl mx-auto rounded-2xl px-6 py-3.5 flex items-center justify-between"
          style={{ background:'rgba(8,10,18,0.85)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.07)', boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#2563eb,#06b6d4)' }}>
              <Sparkles className="w-4.5 h-4.5 text-white" size={18}/>
            </div>
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight">DocuSync AI</span>
              <span className="ml-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 uppercase tracking-widest">Astra</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#hero"    className="hover:text-white transition">Platform</a>
            <a href="#preview" className="hover:text-white transition">Live Demo</a>
            <a href="#arch"    className="hover:text-white transition">Architecture</a>
            <a href="#depts"   className="hover:text-white transition">Departments</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login"     className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition">Sign In</Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition hover:scale-[1.03]"
              style={{ background:'linear-gradient(90deg,#2563eb,#06b6d4)', boxShadow:'0 0 25px rgba(37,99,235,0.4)' }}>
              Launch Platform <ArrowRight size={13}/>
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO — Full Viewport Photo Background
      ══════════════════════════════════════════ */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Full-bleed background photograph */}
        <img src={HERO_BG} alt="Enterprise office"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter:'brightness(0.28) saturate(0.7)' }}/>

        {/* Dynamic cursor spotlight */}
        <div className="pointer-events-none absolute inset-0 z-[1] transition-all duration-200"
          style={{ background:`radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.18), transparent 70%)` }}/>

        {/* Gradient vignette */}
        <div className="absolute inset-0 z-[2]" style={{ background:'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 65%, rgba(10,11,15,1) 100%)' }}/>

        {/* ── Floating product mockup cards (Squarespace style) ── */}
        <div className="absolute inset-0 z-[3] pointer-events-none hidden lg:block">
          {/* Left card — Docs list */}
          <MockupCard img={DOCS_BG}    title="docusync://knowledge-base" tag="Knowledge Indexed"
            className="w-[220px] left-[7%] top-[28%] rotate-[-5deg] animate-float-slow"/>
          {/* Right card — Chat */}
          <MockupCard img={CODE_BG}    title="docusync://copilot-chat"   tag="AI Copilot Active"
            className="w-[220px] right-[7%] top-[26%] rotate-[5deg] animate-float-medium"/>
          {/* Small bottom-left — security badge */}
          <MockupCard img={MEETING_BG} title="docusync://compliance"     tag="SOC-2 Verified"
            className="w-[180px] left-[14%] bottom-[22%] rotate-[3deg] animate-float-fast"/>
        </div>

        {/* Hero text content */}
        <div className="relative z-[4] text-center max-w-4xl mx-auto px-4 pt-28 pb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-semibold text-cyan-300"
            style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/>
            ENTERPRISE AI HACKATHON — GEMINI 2.0 RAG ENGINE
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5.2rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Your company's memory,<br/>
            <span style={{ fontFamily:'Georgia, serif', fontStyle:'italic', fontWeight:400,
              background:'linear-gradient(90deg,#93c5fd,#818cf8,#67e8f9)', WebkitBackgroundClip:'text', color:'transparent' }}>
              finally searchable.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            DocuSync AI turns siloed HR manuals, legal policies, and architecture docs into one verified copilot. 
            <span className="text-white font-semibold"> Every answer cites its exact source.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat" className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.03] transition"
              style={{ background:'linear-gradient(90deg,#2563eb,#4f46e5,#06b6d4)', boxShadow:'0 0 40px rgba(37,99,235,0.45)', border:'1px solid rgba(255,255,255,0.15)' }}>
              <Bot size={16}/>  Engage AI Copilot
            </Link>
            <button onClick={() => setVideoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 hover:scale-[1.03] transition"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(10px)' }}>
              <Play size={14} className="text-cyan-300"/> Watch Platform Tour
            </button>
          </div>

          {/* Floating stat pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { icon: <Zap size={13} className="text-cyan-400"/>, label:'Sub-300ms RAG' },
              { icon: <ShieldCheck size={13} className="text-emerald-400"/>, label:'SOC-2 Type II' },
              { icon: <Building2 size={13} className="text-purple-400"/>, label:'RBAC Multi-Tenant' },
              { icon: <CheckCircle2 size={13} className="text-blue-400"/>, label:'Zero Hallucinations' },
            ].map((s,i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-slate-200 font-medium"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(12px)' }}>
                {s.icon} {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 text-slate-400 text-xs font-mono">
          <span>SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"/>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOOKS / LIBRARY PHOTO STRIP — trust bar
      ══════════════════════════════════════════ */}
      <section className="relative h-48 sm:h-64 overflow-hidden -mt-1">
        <img src={BOOKS_BG} alt="Knowledge library" className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter:'brightness(0.25) saturate(0.5)' }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to right, rgba(10,11,15,1) 0%, transparent 20%, transparent 80%, rgba(10,11,15,1) 100%)' }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, rgba(10,11,15,1) 0%, transparent 40%, rgba(10,11,15,1) 100%)' }}/>
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">Trusted by Enterprise Institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {['NEXUS AEROSPACE','AXIOM HEALTH','VERTEX GLOBAL','CHRONOS CAPITAL','SYNAPSE LABS','HORIZON AI'].map((c,i) => (
              <span key={i} className="font-mono text-xs font-bold tracking-widest text-slate-300 opacity-60">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTERACTIVE RAG PLAYGROUND
          (Dark panel + real desk photography)
      ══════════════════════════════════════════ */}
      <section id="preview" className="relative py-24 px-4 sm:px-6">
        {/* Background photo bleed behind the section */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={DESK_BG} alt="Desk workspace" className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter:'brightness(0.12) saturate(0.4)' }}/>
          <div className="absolute inset-0" style={{ background:'rgba(10,11,15,0.8)' }}/>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Interactive Terminal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">Verifiable Grounding, Live</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">Click any query to watch DocuSync retrieve and cite the exact document — no guessing, no hallucination.</p>
          </div>

          <div className="rounded-3xl overflow-hidden"
            style={{ background:'rgba(10,14,26,0.85)', border:'1px solid rgba(96,165,250,0.2)', backdropFilter:'blur(24px)', boxShadow:'0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            {/* Terminal chrome bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"/><div className="w-3 h-3 rounded-full bg-amber-500/70"/><div className="w-3 h-3 rounded-full bg-emerald-500/70"/>
                </div>
                <span className="ml-2 font-mono text-[11px] text-slate-400">docusync-rag://v2.0 · Gemini 2.0</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> RAG Active · {QUESTIONS[activeQ].lat}
                </span>
                <span className="text-cyan-300 px-2.5 py-0.5 rounded font-bold" style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.25)' }}>
                  99.9% Verified
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Query selector grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
                {QUESTIONS.map((q, i) => (
                  <button key={i} onClick={() => pick(i)}
                    className="p-3.5 rounded-xl text-left transition-all cursor-pointer text-xs"
                    style={{
                      background: activeQ===i ? 'rgba(37,99,235,0.18)' : 'rgba(255,255,255,0.03)',
                      border: activeQ===i ? '1px solid rgba(96,165,250,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: activeQ===i ? '0 8px 25px rgba(37,99,235,0.15)' : 'none',
                    }}>
                    <span className="font-mono text-[10px] uppercase tracking-wider mb-1.5 block"
                      style={{ color: activeQ===i ? '#67e8f9' : '#64748b' }}>{q.dept}</span>
                    <p className="font-medium leading-snug line-clamp-2" style={{ color: activeQ===i ? '#f1f5f9' : '#94a3b8' }}>{q.query}</p>
                  </button>
                ))}
              </div>

              {/* Output */}
              <div className="rounded-2xl p-5" style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3 pb-3 border-b border-white/5">
                  <Sparkles size={13} className="text-cyan-400"/> Copilot Answer Engine · Retrieval-Augmented Generation
                </div>
                {sim ? (
                  <div className="py-8 flex items-center justify-center gap-3 text-xs text-cyan-300 font-mono animate-pulse">
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"/>
                    Executing cosine similarity search across tenant vectors...
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-slate-200 leading-relaxed mb-4">{ANSWERS[activeQ]}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                        <FileText size={11} className="text-cyan-400"/> Verified Source:
                      </span>
                      <span className="text-[11px] px-3 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5"
                        style={{ background:'rgba(37,99,235,0.15)', border:'1px solid rgba(96,165,250,0.3)', color:'#93c5fd' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"/> {QUESTIONS[activeQ].src}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THREE-COLUMN PHOTO FEATURE PANELS
          (Squarespace-style image grid)
      ══════════════════════════════════════════ */}
      <section id="arch" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">RAG Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">Built for enterprises that cannot afford mistakes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: DOCS_BG,    icon:<Database size={20}/>, color:'text-cyan-300',   bg:'rgba(6,182,212,0.12)',   border:'rgba(6,182,212,0.25)',
                title:'Vector Knowledge Store', text:'Documents are chunked into high-density semantic vectors stored in isolated tenant partitions. Cosine similarity retrieval returns top-k chunks in under 300ms.' },
              { img: MEETING_BG, icon:<ShieldCheck size={20}/>, color:'text-emerald-300', bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.25)',
                title:'RBAC Scoped Filtering', text:'JWT tokens enforce department boundaries. HR records cannot cross into Sales queries without executive elevation. Zero cross-tenant data leakage.' },
              { img: CODE_BG,    icon:<Cpu size={20}/>, color:'text-indigo-300',  bg:'rgba(99,102,241,0.12)',  border:'rgba(99,102,241,0.25)',
                title:'Gemini 2.0 Reasoning Core', text:'The synthesis engine is constrained to retrieved context only. Every response ships with verifiable source document badges — no guessing, no hallucination.' },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2"
                style={{ border:`1px solid ${f.border}`, background:'rgba(10,14,26,0.7)', backdropFilter:'blur(16px)', boxShadow:'0 20px 50px rgba(0,0,0,0.4)' }}>
                {/* Photo top */}
                <div className="relative h-44 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, transparent 30%, rgba(10,14,26,1) 100%)' }}/>
                  <div className="absolute bottom-3 left-4 p-2 rounded-xl" style={{ background:f.bg, border:`1px solid ${f.border}` }}>
                    <span className={f.color}>{f.icon}</span>
                  </div>
                </div>
                {/* Text */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.text}</p>
                  <div className="mt-4 pt-4 flex items-center justify-between text-xs font-mono border-t border-white/5">
                    <span className="text-slate-500">Verified Pipeline</span>
                    <CheckCircle2 size={14} className="text-emerald-400"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-WIDTH PHOTO CTA SECTION
          (Office skyline — corporate prestige)
      ══════════════════════════════════════════ */}
      <section id="depts" className="relative py-32 px-4 sm:px-6 overflow-hidden">
        <img src={OFFICE_BG} alt="Enterprise office" className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter:'brightness(0.18) saturate(0.5)' }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(99,102,241,0.2), transparent)' }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, rgba(10,11,15,0.9) 0%, transparent 25%, transparent 75%, rgba(10,11,15,0.9) 100%)' }}/>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Headline */}
            <div>
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Department Coverage</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 leading-tight tracking-tight">
                Unified intelligence<br/>
                <span style={{ fontFamily:'Georgia,serif', fontStyle:'italic', fontWeight:400,
                  background:'linear-gradient(90deg,#93c5fd,#67e8f9)', WebkitBackgroundClip:'text', color:'transparent' }}>
                  across every team.
                </span>
              </h2>
              <p className="text-sm text-slate-300 mt-5 leading-relaxed max-w-md">
                Role-based scoping means HR queries stay inside HR. Engineering gets architecture docs. Legal sees compliance policies. No silos, no confusion.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link to="/dashboard" className="px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:scale-[1.03] transition"
                  style={{ background:'linear-gradient(90deg,#2563eb,#06b6d4)', boxShadow:'0 0 30px rgba(37,99,235,0.4)' }}>
                  Launch Enterprise Dashboard <ArrowRight size={15}/>
                </Link>
                <Link to="/login" className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white transition"
                  style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(10px)' }}>
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right — Department cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label:'Engineering',   color:'text-cyan-300',   bg:'rgba(6,182,212,0.08)',   border:'rgba(6,182,212,0.2)',   desc:'Architecture specs, cloud configs, CI/CD runbooks' },
                { label:'Human Resources',color:'text-purple-300', bg:'rgba(168,85,247,0.08)',  border:'rgba(168,85,247,0.2)',  desc:'PTO policies, benefits handbooks, onboarding docs' },
                { label:'Legal',         color:'text-amber-300',   bg:'rgba(251,191,36,0.08)',  border:'rgba(251,191,36,0.2)',  desc:'GDPR clauses, SOC-2 mandates, contract templates' },
                { label:'Sales',         color:'text-emerald-300', bg:'rgba(16,185,129,0.08)',  border:'rgba(16,185,129,0.2)',  desc:'Pricing tiers, playbooks, competitive analysis' },
              ].map((d,i) => (
                <div key={i} className="p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background:d.bg, border:`1px solid ${d.border}`, backdropFilter:'blur(10px)', boxShadow:'0 10px 30px rgba(0,0,0,0.3)' }}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${d.color}`}>{d.label}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6 text-center text-xs text-slate-500 font-mono" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
        © 2026 DocuSync AI · Enterprise AI Hackathon · Grounded RAG with strict tenant isolation
      </footer>

      {/* Video modal placeholder */}
      {videoOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center" style={{ background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)' }}
          onClick={() => setVideoOpen(false)}>
          <div className="relative rounded-2xl overflow-hidden w-full max-w-3xl mx-4 shadow-2xl" onClick={e=>e.stopPropagation()}
            style={{ border:'1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition">
              <X size={16}/>
            </button>
            <img src={DESK_BG} alt="Platform demo" className="w-full h-64 sm:h-96 object-cover"/>
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background:'rgba(37,99,235,0.8)', backdropFilter:'blur(10px)' }}>
                <Play size={24} className="text-white ml-1"/>
              </div>
              <p className="text-sm font-semibold text-white">DocuSync AI — Platform Tour</p>
              <p className="text-xs text-slate-300">Demo video coming soon — Backend integration in progress</p>
            </div>
          </div>
        </div>
      )}

      <FloatingChatWidget />
    </div>
  );
}
