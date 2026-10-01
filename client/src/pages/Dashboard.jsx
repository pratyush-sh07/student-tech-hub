import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Bot, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  Building2, 
  Layers, 
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [docCount, setDocCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocStats = async () => {
      try {
        const res = await client.get('/api/documents');
        const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
        if (docs.length > 0) {
          setDocCount(docs.length);
        } else {
          const localSaved = localStorage.getItem('docusync_documents');
          if (localSaved) {
            setDocCount(JSON.parse(localSaved).length);
          }
        }
      } catch {
        const localSaved = localStorage.getItem('docusync_documents');
        if (localSaved) {
          setDocCount(JSON.parse(localSaved).length);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocStats();
  }, []);

  const metrics = [
    {
      title: 'Ingested Documents',
      value: loading ? '...' : docCount,
      change: '+12% this week',
      icon: FileText,
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
      description: 'Indexed in vector knowledge base'
    },
    {
      title: 'Copilot Queries Handled',
      value: '1,428',
      change: '+24% today',
      icon: Bot,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30',
      description: 'Grounded enterprise responses'
    },
    {
      title: 'Grounding Accuracy',
      value: '99.8%',
      change: 'Zero hallucinations',
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      description: 'Strict document citation verification'
    },
    {
      title: 'Active Departments',
      value: '4 / 4',
      change: 'HR, Eng, Sales, Legal',
      icon: Building2,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      description: 'Full organizational coverage'
    }
  ];

  const recentActivities = [
    {
      action: 'Knowledge Base Ingestion',
      doc: 'Enterprise AI Security & Compliance Policy 2026',
      dept: 'Legal',
      time: '12m ago',
      status: 'Indexed'
    },
    {
      action: 'Copilot Query Answered',
      doc: 'AWS EKS Deployment & Helm Standards',
      dept: 'Engineering',
      time: '34m ago',
      status: 'Grounded'
    },
    {
      action: 'Policy Update Ingested',
      doc: 'Employee Onboarding & Benefits Guide',
      dept: 'HR',
      time: '2h ago',
      status: 'Indexed'
    },
    {
      action: 'Sales Collateral Indexed',
      doc: 'Q4 Enterprise Sales Playbook & Pricing Tiers',
      dept: 'Sales',
      time: '5h ago',
      status: 'Indexed'
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/50 border border-blue-500/20 p-6 md:p-8 backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DocuSync Enterprise AI 2.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user?.fullName || 'Enterprise Leader'}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Your organizational intelligence copilot is synchronized with verified documents across {user?.department || 'Engineering'} and enterprise departments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/chat"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Copilot</span>
            </Link>
            <Link
              to="/documents"
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Document</span>
            </Link>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 hover:border-slate-700/90 transition shadow-sm backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">{m.title}</span>
                <div className={`p-2 rounded-xl bg-gradient-to-tr border ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-extrabold text-white tracking-tight">{m.value}</div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{m.description}</span>
                </div>
                <span className="inline-block text-[11px] font-medium text-emerald-400 mt-1">
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column layout: Recent Activity & Compliance Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Recent Knowledge Activity</h2>
              <p className="text-xs text-slate-400">Live feed of document ingestion and copilot answers</p>
            </div>
            <Link
              to="/documents"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivities.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-center justify-between hover:bg-slate-800/30 transition"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{item.doc}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-400">{item.action}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] text-blue-400 font-medium">{item.dept}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 font-medium">
                    {item.status}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & System Info */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md">
            <h2 className="text-base font-bold text-white tracking-tight mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Enterprise AI Guardrails
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Real-time enforcement of security & role boundaries
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Zero External Model Training</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Your queries are isolated in private tenant space.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Strict Source Citations</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Every AI response includes exact document badges.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Department Role-Based Access</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Scoping enabled for HR, Eng, Legal, and Sales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
