import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Bot, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Database, 
  ChevronRight, 
  Search, 
  Building2, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  Activity,
  Globe,
  Share2,
  Compass,
  Key,
  Shield,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import CosmicCanvas from '../components/CosmicCanvas';
import FloatingChatWidget from '../components/FloatingChatWidget';

const ENTERPRISE_CLIENTS = [
  'NEXUS AEROSPACE',
  'AXIOM HEALTH',
  'VERTEX GLOBAL',
  'CHRONOS CAPITAL',
  'SYNAPSE LABS',
  'HORIZON AI'
];

const SAMPLE_QUESTIONS = [
  {
    category: 'Legal & Governance',
    query: 'What are the SOC-2 Type II data residency and model training policies?',
    answer: 'DocuSync AI strictly enforces SOC-2 Type II guidelines. All processed queries, context chunks, and enterprise documents remain inside cryptographically isolated tenant partitions. Proprietary institutional data is never retained or utilized to train external frontier models.',
    sources: ['Enterprise_Security_Mandate_2026.pdf', 'SOC2_TypeII_Audit_Report.pdf'],
    latency: '340ms',
    precision: '99.9%'
  },
  {
    category: 'Engineering & DevOps',
    query: 'What are the microservices deployment standards for AWS EKS clusters?',
    answer: 'Production services must be deployed via standardized Helm charts on AWS EKS with minimum 80% automated unit test coverage. All inter-service communications require mTLS and JWT Bearer authorization.',
    sources: ['Cloud_Architecture_Standards.pdf', 'Kubernetes_Helm_Guidelines.yaml'],
    latency: '410ms',
    precision: '100%'
  },
  {
    category: 'Human Resources',
    query: 'What is our annual employee PTO and health insurance coverage policy?',
    answer: 'Full-time enterprise personnel receive 25 annual paid time off days alongside corporate holidays. Comprehensive health, dental, and vision insurance begins on day 1 with a $1,200 annual wellness stipend.',
    sources: ['Employee_Handbook_2026.pdf', 'Benefits_Enrollment_Guide.pdf'],
    latency: '290ms',
    precision: '99.8%'
  },
  {
    category: 'Sales & Commercial',
    query: 'What are the contract sign-off thresholds for custom on-premises deployments?',
    answer: 'Standard cloud SaaS is $45/user/month billed annually. Custom on-premises vector databases and private VPC deployments require commercial Master Services Agreements countersigned by a VP or C-level executive.',
    sources: ['Enterprise_Pricing_Matrix_Q4.pdf', 'Sales_Governance_Playbook.pdf'],
    latency: '380ms',
    precision: '100%'
  }
];

const Home = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectQuestion = (idx) => {
    setSelectedIdx(idx);
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
    }, 400);
  };

  const activeData = SAMPLE_QUESTIONS[selectedIdx];

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 relative overflow-hidden bg-grid-tech noise-overlay">
      {/* Interactive Constellation Particle Canvas */}
      <CosmicCanvas />

      {/* Dynamic Cursor Spotlight that follows mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.12), transparent 75%)`,
        }}
      />

      {/* Atmospheric Luminous Background Orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-blue-600/20 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] pointer-events-none animate-blob"></div>
      <div className="absolute top-[65%] -right-32 w-[650px] h-[650px] bg-purple-600/10 blur-[160px] pointer-events-none animate-blob animation-delay-3000"></div>

      {/* Top Floating Glass Navigation */}
      <header className="sticky top-5 z-40 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="luxury-glass rounded-2xl px-6 py-4 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-3xl">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-xl shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight">DocuSync</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30 uppercase tracking-widest font-semibold">
                  Astra
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Enterprise Intelligence OS</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-300">
            <a href="#overview" className="hover:text-cyan-300 transition tracking-wide">Platform</a>
            <a href="#playground" className="hover:text-cyan-300 transition tracking-wide">Live Copilot</a>
            <a href="#architecture" className="hover:text-cyan-300 transition tracking-wide">RAG Engine</a>
            <a href="#governance" className="hover:text-cyan-300 transition tracking-wide">Security</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3.5">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Luxury Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-20">
        {/* Floating Editorial Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full luxury-glass border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-2xl mb-8 animate-float-slow">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>ENTERPRISE AI HACKATHON EDITION</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-mono text-[11px]">GEMINI 2.0 RAG</span>
        </div>

        {/* High-Impact Editorial Luxury Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          Institutional memory,{' '}
          <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300">
            orchestrated with
          </span>{' '}
          mathematical precision.
        </h1>

        <p className="mt-6 text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          DocuSync AI synthesizes disparate organizational knowledge—SOPs, architecture manifests, legal policies, and handbooks—into an authoritative conversational copilot. <span className="text-white font-medium">100% cited. Zero hallucinations.</span>
        </p>

        {/* Floating Status Capsules */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          <div className="px-4 py-1.5 rounded-full luxury-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-medium">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-cyan-200 font-semibold">Sub-300ms</span>
            <span className="text-slate-400">RAG Vector Indexing</span>
          </div>
          <div className="px-4 py-1.5 rounded-full luxury-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-slow">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-emerald-200">SOC-2 Type II</span>
            <span className="text-slate-400">Guaranteed Tenant Isolation</span>
          </div>
          <div className="px-4 py-1.5 rounded-full luxury-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-reverse">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-purple-200">Multi-Department</span>
            <span className="text-slate-400">Scoped RBAC Architecture</span>
          </div>
        </div>

        {/* Hero Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/chat"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wider uppercase shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5 border border-white/20"
          >
            <Bot className="w-4 h-4" />
            <span>Engage AI Copilot</span>
          </Link>
          <Link
            to="/documents"
            className="w-full sm:w-auto px-8 py-4 rounded-xl luxury-glass hover:bg-slate-800/80 text-slate-200 font-semibold text-xs tracking-wider uppercase border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2.5"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Ingest Company Documents</span>
          </Link>
        </div>

        {/* Corporate Trust Ticker */}
        <div className="mt-16 pt-8 border-t border-slate-800/60">
          <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-5">
            Engineered For High-Stakes Institutional Knowledge & Governance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60">
            {ENTERPRISE_CLIENTS.map((client, idx) => (
              <span key={idx} className="font-mono text-xs font-bold tracking-widest text-slate-300">
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Holographic Copilot Playground */}
      <section id="playground" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-20 relative">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Interactive Terminal</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
            Verifiable Grounding Simulation
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
            Experience how DocuSync cites exact organizational records before delivering answers.
          </p>
        </div>

        <div className="luxury-glass rounded-3xl border border-blue-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="font-mono text-slate-400 text-[11px] pl-2">docusync-rag-core://v2.0</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Inference Latency: {activeData.latency}
              </span>
              <span className="text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/50">
                {activeData.precision} Confidence
              </span>
            </div>
          </div>

          {/* Department Question Tabs */}
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuestion(idx)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                  selectedIdx === idx
                    ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-blue-500/15'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {q.category}
                </span>
                <p className="text-xs font-medium line-clamp-2 leading-snug">{q.query}</p>
              </button>
            ))}
          </div>

          {/* Synthesized Output Display */}
          <div className="mt-2 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold font-mono text-xs">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Copilot Answer Engine</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Retrieval Augmented Generation</span>
            </div>

            {simulating ? (
              <div className="py-8 flex items-center justify-center gap-3 text-xs text-cyan-300 animate-pulse font-mono">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Cosine Similarity Vector Retrieval...</span>
              </div>
            ) : (
              <>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {activeData.answer}
                </p>

                {/* Source Citation Badges */}
                <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mr-1">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" /> Verified Sources:
                  </span>
                  {activeData.sources.map((src, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-blue-950/80 text-cyan-200 border border-blue-700/60 font-mono shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Source: {src}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* RAG Architecture Flow & Visual Matrix */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Architecture Stack</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Engineered for Zero Data Leakage
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Every step of our RAG pipeline ensures your proprietary enterprise intellectual property never exits the tenant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="luxury-card rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-5">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">High-Density Vector Storage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Documents are fragmented into semantic nodes with recursive chunking and embedded into private dimensional vectors.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>Cosine Distance Search</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">RBAC Scoped Filtering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tokens automatically enforce department partitions. HR records cannot cross into Sales scopes without administrative elevation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-indigo-400">
              <span>Tenant Boundary Locked</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Gemini 2.0 Reasoning Core</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Model synthesis is constrained to provided context only. The engine outputs verifiable citation badges for every claim.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>Grounded Determinism</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Call-to-Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-20 relative">
        <div className="luxury-glass rounded-3xl p-10 sm:p-14 text-center border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Bring clarity to your{' '}
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
              enterprise data.
            </span>
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
            Eliminate hours spent hunting for employee handbooks, architectural blueprints, or compliance policies. Experience sub-second grounded intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 transition cursor-pointer"
            >
              Launch Enterprise Dashboard
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl luxury-glass text-slate-200 font-semibold text-xs uppercase tracking-wider border border-slate-700 hover:border-slate-500 transition cursor-pointer"
            >
              Access Member Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900/90 py-10 px-6 text-center text-xs text-slate-500 z-20 relative">
        <p className="font-mono text-[11px]">
          © 2026 DocuSync AI • Enterprise Hackathon Platform • Inspired by Astra & Next-Gen Spatial Design
        </p>
      </footer>

      {/* 24/7 Floating Institutional AI Chatbot Assistant */}
      <FloatingChatWidget />
    </div>
  );
};

export default Home;
