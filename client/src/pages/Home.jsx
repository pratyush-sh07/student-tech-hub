import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Share2
} from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';

const HOME_HERO_QUERIES = [
  'What is the annual PTO & wellness allowance for full-time employees?',
  'What are the compliance requirements for SOC-2 Type II AI data isolation?',
  'How do our microservices deploy to AWS EKS with Kubernetes Helm charts?',
  'What is the pricing tier for on-prem enterprise deployments?'
];

const ARCHITECTURE_STEPS = [
  {
    step: '01',
    title: 'Multi-Format Ingestion',
    desc: 'PDFs, Markdown, SOPs, and handbooks ingested without data leakage.',
    icon: FileText,
    glow: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    step: '02',
    title: 'Vector Embedding Space',
    desc: 'Dense embeddings generated and indexed for high-dimensional cosine similarity.',
    icon: Database,
    glow: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    step: '03',
    title: 'RAG Context Injection',
    desc: 'Top-k semantic passages retrieve strictly within tenant boundaries.',
    icon: Layers,
    glow: 'from-purple-500/20 to-pink-500/20'
  },
  {
    step: '04',
    title: 'Gemini 2.0 Reasoning & Citations',
    desc: 'Synthesizes enterprise-grade responses with verifiable source document badges.',
    icon: Bot,
    glow: 'from-cyan-500/20 to-emerald-500/20'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [activeQuery, setActiveQuery] = useState(HOME_HERO_QUERIES[0]);
  const [demoAnswer, setDemoAnswer] = useState({
    text: 'According to the Employee Onboarding & Benefits Guide: Full-time employees receive 25 days of annual paid time off (PTO) alongside standard corporate holidays. Comprehensive health, dental, and vision insurance begins on day 1 of employment with an annual wellness stipend of $1,200.',
    sources: ['Employee_Onboarding_Benefits_Guide.pdf (HR)', 'Corporate_Benefits_2026.pdf'],
    accuracy: '99.9% Citation Grounded'
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectQuery = (q) => {
    setActiveQuery(q);
    setIsSimulating(true);
    setTimeout(() => {
      if (q.includes('SOC-2') || q.includes('compliance')) {
        setDemoAnswer({
          text: 'According to Enterprise AI Security & Compliance Policy 2026: All copilot sessions adhere strictly to SOC-2 Type II standards. Data processed through large language models is never used for public retraining, and tenant isolation is cryptographically guaranteed.',
          sources: ['Enterprise_AI_Security_Policy_2026.pdf (Legal)', 'SOC2_TypeII_Audit.pdf'],
          accuracy: '100% Citation Grounded'
        });
      } else if (q.includes('AWS EKS') || q.includes('Kubernetes')) {
        setDemoAnswer({
          text: 'According to Microservices Deployment & Cloud Architecture: Services are deployed on AWS EKS using standardized Helm charts. Production release criteria require passing automated CI/CD suites with >=80% test coverage and JWT-bearer authenticated endpoints.',
          sources: ['Cloud_Architecture_Spec.pdf (Engineering)', 'EKS_Deployment_Manifest.yaml'],
          accuracy: '99.8% Citation Grounded'
        });
      } else if (q.includes('pricing') || q.includes('tier')) {
        setDemoAnswer({
          text: 'According to Q4 Enterprise Sales Playbook & Pricing Tiers: DocuSync AI enterprise tier is priced at $45/user/month billed annually. Custom on-premises vector database deployments require executive agreement sign-off.',
          sources: ['Q4_Enterprise_Sales_Playbook.pdf (Sales)', 'Master_Services_Agreement.pdf'],
          accuracy: '100% Citation Grounded'
        });
      } else {
        setDemoAnswer({
          text: 'According to the Employee Onboarding & Benefits Guide: Full-time employees receive 25 days of annual paid time off (PTO) alongside standard corporate holidays. Comprehensive health, dental, and vision insurance begins on day 1 of employment with an annual wellness stipend of $1,200.',
          sources: ['Employee_Onboarding_Benefits_Guide.pdf (HR)', 'Corporate_Benefits_2026.pdf'],
          accuracy: '99.9% Citation Grounded'
        });
      }
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative overflow-hidden bg-grid-pattern">
      {/* Floating Animated Cosmic Blobs & Glowing Aurora */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none animate-blob"></div>
      <div className="absolute top-[30%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[650px] h-[650px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none animate-blob animation-delay-4000"></div>

      {/* Floating Astra Orbital Rings */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[900px] h-[900px] border border-blue-500/10 rounded-full pointer-events-none animate-spin-slow"></div>
      <div className="absolute top-44 left-1/2 -translate-x-1/2 w-[700px] h-[700px] border border-indigo-500/10 rounded-full pointer-events-none animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>

      {/* Top Floating Glassmorphic Navigation Bar */}
      <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl glass-panel px-5 py-3.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight">DocuSync</span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  AI Astra
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Enterprise AI Knowledge Engine</p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#architecture" className="hover:text-blue-400 transition">Architecture</a>
            <a href="#departments" className="hover:text-blue-400 transition">Departments</a>
            <a href="#playground" className="hover:text-blue-400 transition">Live Copilot</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        {/* Floating Top Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-xl mb-8 animate-float-slow">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
          <span>Next-Generation Enterprise AI Knowledge Orchestration</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Main Astra Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Institutional Intelligence, Grounded in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 animate-pulse">
            Absolute Truth.
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          DocuSync AI synthesizes enterprise handbooks, compliance policies, and technical architectures into a verifiable conversational copilot. Zero hallucinations. Real-time citations.
        </p>

        {/* Floating Metrics Capsules around Hero */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          <div className="px-3.5 py-1.5 rounded-full glass-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-medium">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sub-Second Vector RAG</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full glass-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-slow">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOC-2 Type II Strict RBAC</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full glass-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-reverse">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Enterprise Multi-Tenant</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full glass-card text-xs text-slate-300 flex items-center gap-2 border border-slate-700/60 animate-float-fast">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini 2.0 Reasoning Core</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/chat"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Open AI Copilot</span>
          </Link>
          <Link
            to="/documents"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Browse Knowledge Base</span>
          </Link>
        </div>
      </section>

      {/* Interactive Live Playground Showcase */}
      <section id="playground" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative">
        <div className="rounded-3xl glass-panel border border-blue-500/30 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Live Copilot Grounding Simulation
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    Interactive
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Test how DocuSync cites internal documents in real-time</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 self-start sm:self-auto bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-800/40">
              {demoAnswer.accuracy}
            </span>
          </div>

          {/* Quick Query Picker */}
          <div className="py-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Select Sample Organizational Question:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HOME_HERO_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(q)}
                  className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                    activeQuery === q
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <span className="truncate pr-2">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Copilot Output Box */}
          <div className="mt-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                DocuSync Copilot Answer:
              </span>
              <span className="text-[10px] text-slate-500">Grounded via RAG</span>
            </div>

            {isSimulating ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs text-blue-400 animate-pulse">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Retrieving semantic chunks and synthesizing citations...</span>
              </div>
            ) : (
              <>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {demoAnswer.text}
                </p>

                {/* Source Citation Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-500" /> Verified Sources:
                  </span>
                  {demoAnswer.sources.map((src, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/60 font-semibold"
                    >
                      Source: {src}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* RAG Architecture Pipeline Visualizer */}
      <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Architecture Pipeline</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            How DocuSync AI Powers Institutional Knowledge
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            A deterministic pipeline engineered for enterprise zero-hallucination compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCHITECTURE_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card p-6 flex flex-col justify-between relative group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-400">{s.step}</span>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${s.glow} border border-slate-700/60 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Verified Pipeline</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Department Coverage Matrix */}
      <section id="departments" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Multi-Department Scope</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Unified Knowledge Across All Teams
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Scoped role-based access control allows HR, Engineering, Sales, and Legal to query isolated or cross-functional intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl glass-card p-5 border border-cyan-500/20 hover:border-cyan-500/50 transition">
            <span className="text-xs px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 font-bold inline-block mb-3">
              Engineering
            </span>
            <h4 className="text-sm font-bold text-white mb-1.5">Specs & Architecture</h4>
            <p className="text-xs text-slate-400">Kubernetes manifests, cloud configs, CI/CD procedures, and API documentation.</p>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-purple-500/20 hover:border-purple-500/50 transition">
            <span className="text-xs px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-400 border border-purple-800/60 font-bold inline-block mb-3">
              Human Resources
            </span>
            <h4 className="text-sm font-bold text-white mb-1.5">Benefits & Handbooks</h4>
            <p className="text-xs text-slate-400">Paid time off, health insurance policies, onboarding roadmaps, and wellness stipends.</p>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-amber-500/20 hover:border-amber-500/50 transition">
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-400 border border-amber-800/60 font-bold inline-block mb-3">
              Legal & Compliance
            </span>
            <h4 className="text-sm font-bold text-white mb-1.5">SOC-2 & Governance</h4>
            <p className="text-xs text-slate-400">Data retention mandates, GDPR clauses, customer privacy terms, and audit trails.</p>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-emerald-500/20 hover:border-emerald-500/50 transition">
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold inline-block mb-3">
              Sales & GTM
            </span>
            <h4 className="text-sm font-bold text-white mb-1.5">Playbooks & Pricing</h4>
            <p className="text-xs text-slate-400">Enterprise tiers, MSA guidelines, competitor analysis, and discount structures.</p>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-cyan-900/30 border border-blue-500/30 p-8 sm:p-12 text-center backdrop-blur-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to deploy DocuSync AI across your institution?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-3 mb-8">
            Experience real-time grounded intelligence with source badges. Fast setup, zero maintenance, and full compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
            >
              Launch Dashboard
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl glass-panel text-slate-200 font-semibold text-xs border border-slate-700 hover:border-slate-500 transition-all cursor-pointer"
            >
              Enterprise Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 DocuSync AI — Hackathon Enterprise AI Edition. Grounded RAG with strict tenant data isolation.</p>
      </footer>

      {/* Floating AI Chatbot Assistant for prospective customer & institutional questions */}
      <FloatingChatWidget />
    </div>
  );
};

export default Home;
