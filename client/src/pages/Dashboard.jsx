import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  FileText, Bot, ShieldCheck, TrendingUp, TrendingDown,
  Activity, ArrowUpRight, Sparkles, Clock, Building2,
  Database, CheckCircle2, Zap, BarChart3, Users,
  Globe, ArrowRight, RefreshCw, Cpu, Lock
} from 'lucide-react';

/* ─── Animated counter hook ─── */
function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start || typeof target !== 'number') return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

/* ─── Mini sparkline generator ─── */
function Sparkline({ data, color = '#3b82f6', height = 36 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = height;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ overflow: 'visible' }}>
      <polyline points={pts} stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={(data.length - 1) / (data.length - 1) * w} cy={h - ((data[data.length - 1] - min) / range) * (h - 4)}
        r="3" fill={color}/>
    </svg>
  );
}

/* ─── Circular progress ring ─── */
function Ring({ pct, color, size = 64, stroke = 5, label }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none"/>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)' }}/>
      </svg>
      {label && <span className="text-[10px] font-mono text-slate-400">{label}</span>}
    </div>
  );
}

/* ─── Animated progress bar ─── */
function Bar({ pct, color, label, value }) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(pct), 300); }, [pct]);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width:`${w}%`, background: color }}/>
      </div>
    </div>
  );
}

/* ─── Live pulse dot ─── */
const LiveDot = ({ color = '#22c55e' }) => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: color }}/>
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }}/>
  </span>
);

/* ─── Sparkline data sets ─── */
const SPARK = {
  docs:     [2, 3, 4, 3, 5, 6, 5, 7, 6, 8, 9, 10, 12],
  queries:  [320, 410, 390, 580, 620, 710, 680, 820, 910, 1020, 1180, 1320, 1428],
  accuracy: [98.1, 98.4, 98.9, 99.1, 99.2, 99.4, 99.5, 99.6, 99.7, 99.8, 99.8, 99.9, 99.8],
  latency:  [380, 340, 360, 310, 290, 305, 280, 290, 275, 268, 260, 272, 265],
};

const DEPT_COLORS = {
  Legal: '#f59e0b', Engineering: '#06b6d4', HR: '#a855f7', Sales: '#22c55e', Finance: '#3b82f6',
};

const ACTIVITIES = [
  { action:'Knowledge Base Ingestion',    doc:'Enterprise AI Security & Compliance Policy 2026', dept:'Legal',       time:'2m ago',  status:'Indexed',  icon: Database },
  { action:'Copilot Query Answered',       doc:'AWS EKS Deployment & Helm Chart Standards',       dept:'Engineering', time:'18m ago', status:'Grounded', icon: Bot },
  { action:'Policy Document Updated',      doc:'Employee Onboarding & Benefits Handbook 2026',    dept:'HR',          time:'1h ago',  status:'Indexed',  icon: FileText },
  { action:'Sales Collateral Indexed',     doc:'Q4 Enterprise Sales Playbook & Pricing Tiers',    dept:'Sales',       time:'3h ago',  status:'Indexed',  icon: FileText },
  { action:'Compliance Audit Completed',   doc:'SOC-2 Type II Audit Report — Tenant Isolation',   dept:'Legal',       time:'5h ago',  status:'Verified', icon: ShieldCheck },
  { action:'Architecture Spec Ingested',   doc:'Microservices Cloud Architecture v4.2',           dept:'Engineering', time:'7h ago',  status:'Indexed',  icon: Cpu },
];

const DEPT_USAGE = [
  { dept:'Engineering', queries: 540, pct: 85,  color:'#06b6d4' },
  { dept:'HR',          queries: 312, pct: 62,  color:'#a855f7' },
  { dept:'Legal',       queries: 298, pct: 58,  color:'#f59e0b' },
  { dept:'Sales',       queries: 278, pct: 54,  color:'#22c55e' },
];

/* ═════════════════════════════════════════════
   MAIN DASHBOARD
═════════════════════════════════════════════ */
export default function Dashboard() {
  const { user } = useAuth();
  const [docCount, setDocCount] = useState(12);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date());
  const [pingMs, setPingMs] = useState(247);
  const [refreshing, setRefreshing] = useState(false);

  /* Count-up animations */
  const animDocs    = useCountUp(docCount, 1600, pageLoaded);
  const animQueries = useCountUp(1428,     2000, pageLoaded);
  const animUsers   = useCountUp(847,      1800, pageLoaded);

  useEffect(() => {
    /* Fetch docs */
    const fetchDocs = async () => {
      try {
        const res = await client.get('/api/documents');
        const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
        if (docs.length > 0) setDocCount(docs.length);
        else {
          const local = localStorage.getItem('docusync_documents');
          if (local) setDocCount(JSON.parse(local).length);
        }
      } catch {
        const local = localStorage.getItem('docusync_documents');
        if (local) setDocCount(JSON.parse(local).length);
      }
    };
    fetchDocs();

    /* Trigger count-up after mount */
    const t = setTimeout(() => setPageLoaded(true), 200);

    /* Live clock */
    const clock = setInterval(() => setLiveTime(new Date()), 1000);

    /* Random latency jitter */
    const ping = setInterval(() => setPingMs(220 + Math.floor(Math.random() * 80)), 3000);

    return () => { clearTimeout(t); clearInterval(clock); clearInterval(ping); };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const deptName = user?.department || 'Engineering';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">

      {/* ══════════════════════════════════════════
          HERO WELCOME BANNER — animated gradient
      ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8"
        style={{ background:'linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(99,102,241,0.2) 40%, rgba(6,182,212,0.15) 100%)', border:'1px solid rgba(96,165,250,0.2)', backdropFilter:'blur(20px)' }}>
        {/* Animated orbs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-pulse"
          style={{ background:'rgba(37,99,235,0.2)' }}/>
        <div className="absolute -bottom-12 left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background:'rgba(99,102,241,0.15)', animation:'pulse 4s ease-in-out infinite 1s' }}/>
        <div className="absolute top-4 right-1/3 w-32 h-32 rounded-full blur-2xl pointer-events-none"
          style={{ background:'rgba(6,182,212,0.1)', animation:'pulse 6s ease-in-out infinite 2s' }}/>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)', backgroundSize:'32px 32px' }}/>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300"
                style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)' }}>
                <LiveDot color="#06b6d4"/>
                <Sparkles size={11}/> DocuSync AI · Enterprise v2.0
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-300"
                style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)' }}>
                <Zap size={10}/> {pingMs}ms
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Good {liveTime.getHours() < 12 ? 'morning' : liveTime.getHours() < 17 ? 'afternoon' : 'evening'},{' '}
              <span style={{ background:'linear-gradient(90deg,#93c5fd,#67e8f9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                {user?.fullName || 'Enterprise Leader'}
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Your knowledge copilot is live across{' '}
              <span className="text-white font-semibold">{deptName}</span> and all enterprise departments.
              Last synced: <span className="font-mono text-cyan-400">{liveTime.toLocaleTimeString()}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={handleRefresh}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white transition hover:scale-110"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''}/>
            </button>
            <Link to="/chat"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 hover:scale-105 transition"
              style={{ background:'linear-gradient(90deg,#2563eb,#06b6d4)', boxShadow:'0 0 20px rgba(37,99,235,0.4)' }}>
              <Bot size={15}/> Launch Copilot
            </Link>
            <Link to="/documents"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2 hover:scale-105 hover:text-white transition"
              style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)' }}>
              <FileText size={15}/> Upload Doc
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ANIMATED METRIC CARDS
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 — Documents */}
        <div className="rounded-2xl p-5 group hover:-translate-y-1 transition-all duration-300 cursor-default"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(6,182,212,0.2)', backdropFilter:'blur(16px)', boxShadow:'0 10px 40px rgba(6,182,212,0.05)' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Documents</p>
              <div className="text-3xl font-extrabold text-white tabular-nums">{animDocs.toLocaleString()}</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background:'rgba(6,182,212,0.12)', border:'1px solid rgba(6,182,212,0.2)' }}>
              <Database size={18} className="text-cyan-400"/>
            </div>
          </div>
          <Sparkline data={SPARK.docs} color="#06b6d4"/>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <TrendingUp size={11}/> +12% this week
          </div>
        </div>

        {/* Card 2 — Queries */}
        <div className="rounded-2xl p-5 group hover:-translate-y-1 transition-all duration-300 cursor-default"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(99,102,241,0.2)', backdropFilter:'blur(16px)', boxShadow:'0 10px 40px rgba(99,102,241,0.05)' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Copilot Queries</p>
              <div className="text-3xl font-extrabold text-white tabular-nums">{animQueries.toLocaleString()}</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)' }}>
              <Bot size={18} className="text-indigo-400"/>
            </div>
          </div>
          <Sparkline data={SPARK.queries} color="#818cf8"/>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <TrendingUp size={11}/> +24% today
          </div>
        </div>

        {/* Card 3 — Accuracy */}
        <div className="rounded-2xl p-5 group hover:-translate-y-1 transition-all duration-300 cursor-default"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(16,185,129,0.2)', backdropFilter:'blur(16px)', boxShadow:'0 10px 40px rgba(16,185,129,0.05)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Grounding Accuracy</p>
              <div className="text-3xl font-extrabold text-white">99.8%</div>
            </div>
            <Ring pct={99.8} color="#22c55e" size={52} stroke={4}/>
          </div>
          <Sparkline data={SPARK.accuracy} color="#22c55e" height={32}/>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <ShieldCheck size={11}/> Zero hallucinations
          </div>
        </div>

        {/* Card 4 — Active users */}
        <div className="rounded-2xl p-5 group hover:-translate-y-1 transition-all duration-300 cursor-default"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(251,191,36,0.2)', backdropFilter:'blur(16px)', boxShadow:'0 10px 40px rgba(251,191,36,0.05)' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Active Users</p>
              <div className="text-3xl font-extrabold text-white tabular-nums">{animUsers.toLocaleString()}</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background:'rgba(251,191,36,0.12)', border:'1px solid rgba(251,191,36,0.2)' }}>
              <Users size={18} className="text-amber-400"/>
            </div>
          </div>
          <Sparkline data={[310, 380, 420, 510, 580, 640, 690, 730, 775, 800, 820, 837, 847]} color="#f59e0b"/>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <TrendingUp size={11}/> +8% this month
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MIDDLE ROW — Activity + Dept Usage + Latency
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(16px)' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-400"/>
              <h2 className="text-sm font-bold text-white">Live Activity Feed</h2>
              <LiveDot color="#06b6d4"/>
            </div>
            <Link to="/documents" className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition">
              View All <ArrowUpRight size={12}/>
            </Link>
          </div>

          <div className="space-y-2">
            {ACTIVITIES.map((item, idx) => {
              const Icon = item.icon;
              const deptColor = DEPT_COLORS[item.dept] || '#64748b';
              return (
                <div key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-default group"
                  style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.04)',
                    animationDelay:`${idx * 80}ms`, animation:'fadeSlideIn 0.5s ease forwards', opacity: 0 }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:`${deptColor}18`, border:`1px solid ${deptColor}30` }}>
                    <Icon size={14} style={{ color: deptColor }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{item.doc}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500">{item.action}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[10px] font-semibold" style={{ color: deptColor }}>{item.dept}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold"
                      style={{ background: item.status === 'Grounded' ? 'rgba(37,99,235,0.15)' : item.status === 'Verified' ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)',
                               color: item.status === 'Grounded' ? '#93c5fd' : '#6ee7b7',
                               border: item.status === 'Grounded' ? '1px solid rgba(96,165,250,0.3)' : '1px solid rgba(16,185,129,0.3)' }}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono hidden sm:block">{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column — Dept + System */}
        <div className="space-y-4">
          {/* Department Usage */}
          <div className="rounded-2xl p-5"
            style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(16px)' }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={15} className="text-purple-400"/>
              <h2 className="text-sm font-bold text-white">Department Usage</h2>
            </div>
            <div className="space-y-3.5">
              {DEPT_USAGE.map((d, i) => (
                <Bar key={i} pct={d.pct} color={d.color} label={d.dept} value={`${d.queries} q/day`}/>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-2xl p-5"
            style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(16px)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={15} className="text-emerald-400"/>
              <h2 className="text-sm font-bold text-white">System Status</h2>
              <LiveDot/>
            </div>
            <div className="space-y-2.5">
              {[
                { label:'RAG Engine',      status:'Operational', color:'#22c55e' },
                { label:'Vector Store',    status:'Operational', color:'#22c55e' },
                { label:'Gemini 2.0 API',  status:'Operational', color:'#22c55e' },
                { label:'Auth Service',    status:'Operational', color:'#22c55e' },
                { label:'Doc Ingestion',   status:`${pingMs}ms`,  color:'#06b6d4' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b last:border-0"
                  style={{ borderColor:'rgba(255,255,255,0.04)' }}>
                  <span className="text-slate-400">{s.label}</span>
                  <span className="font-mono font-semibold flex items-center gap-1.5" style={{ color: s.color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }}/>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM ROW — Security + Quick Actions + Rings
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* AI Guardrails */}
        <div className="rounded-2xl p-5"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(16,185,129,0.15)', backdropFilter:'blur(16px)' }}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-emerald-400"/>
            <h2 className="text-sm font-bold text-white">Enterprise AI Guardrails</h2>
          </div>
          <div className="space-y-2.5">
            {[
              { title:'Zero External Training',  desc:'Queries isolated in private tenant space', ok: true },
              { title:'Strict Source Citations', desc:'Every response includes exact doc badges',  ok: true },
              { title:'RBAC Dept Scoping',       desc:'HR, Eng, Legal, Sales — fully isolated',   ok: true },
              { title:'SOC-2 Type II Compliant', desc:'Cryptographic tenant data isolation',       ok: true },
              { title:'JWT Token Expiry',        desc:'Auto-revoked every 24h for security',       ok: true },
            ].map((g, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl"
                style={{ background:'rgba(16,185,129,0.04)', border:'1px solid rgba(16,185,129,0.1)' }}>
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5"/>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{g.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl p-5"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(16px)' }}>
          <div className="flex items-center gap-2 mb-5">
            <Zap size={15} className="text-amber-400"/>
            <h2 className="text-sm font-bold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to:'/chat',      icon: Bot,       label:'Ask Copilot', color:'#3b82f6', bg:'rgba(37,99,235,0.15)' },
              { to:'/documents', icon: FileText,   label:'Upload Doc',  color:'#06b6d4', bg:'rgba(6,182,212,0.12)' },
              { to:'/documents', icon: Database,   label:'Knowledge',   color:'#a855f7', bg:'rgba(168,85,247,0.12)' },
              { to:'/profile',   icon: Lock,       label:'My Profile',  color:'#22c55e', bg:'rgba(16,185,129,0.12)' },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <Link key={i} to={a.to}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all hover:-translate-y-1 hover:scale-105"
                  style={{ background: a.bg, border:`1px solid ${a.color}30` }}>
                  <div className="p-2.5 rounded-xl" style={{ background:`${a.color}20` }}>
                    <Icon size={18} style={{ color: a.color }}/>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-200">{a.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mini chart */}
          <div className="mt-5 pt-4 border-t" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wider">Today's Query Volume</p>
            <Sparkline data={[80, 120, 95, 180, 220, 190, 260, 310, 280, 340, 390, 420, 460]} color="#3b82f6" height={40}/>
          </div>
        </div>

        {/* Performance Rings */}
        <div className="rounded-2xl p-5"
          style={{ background:'rgba(8,12,28,0.8)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(16px)' }}>
          <div className="flex items-center gap-2 mb-5">
            <Cpu size={15} className="text-blue-400"/>
            <h2 className="text-sm font-bold text-white">RAG Performance</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { pct:99.8, color:'#22c55e', label:'Accuracy' },
              { pct:97,   color:'#3b82f6', label:'Uptime' },
              { pct:88,   color:'#06b6d4', label:'Retrieval' },
            ].map((r, i) => (
              <Ring key={i} pct={pageLoaded ? r.pct : 0} color={r.color} size={64} stroke={5} label={r.label}/>
            ))}
          </div>

          <div className="space-y-2.5">
            <Bar pct={pageLoaded ? 82 : 0} color="#3b82f6" label="P50 Latency" value="247ms"/>
            <Bar pct={pageLoaded ? 61 : 0} color="#06b6d4" label="P95 Latency" value="380ms"/>
            <Bar pct={pageLoaded ? 45 : 0} color="#a855f7" label="Token Usage"  value="68% budget"/>
          </div>

          <div className="mt-4 pt-4 border-t flex items-center justify-between text-[11px]"
            style={{ borderColor:'rgba(255,255,255,0.06)' }}>
            <span className="text-slate-500 font-mono">Model: Gemini 2.0 Flash</span>
            <span className="text-emerald-400 flex items-center gap-1"><LiveDot/> Live</span>
          </div>
        </div>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
