import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Building2, 
  ShieldCheck, 
  Key, 
  Clock, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Layers,
  Sparkles,
  Lock,
  ExternalLink
} from 'lucide-react';

const Profile = () => {
  const { user, token, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [department, setDepartment] = useState(user?.department || 'Engineering');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpdateDept = (newDept) => {
    setDepartment(newDept);
    const updatedUser = { ...user, department: newDept };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    if (setUser) setUser(updatedUser);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDeptColor = (dept) => {
    switch (dept?.toLowerCase()) {
      case 'engineering':
        return 'text-[#38bdf8] bg-sky-950/40 border-sky-800/40';
      case 'hr':
        return 'text-[#c084fc] bg-purple-950/40 border-purple-800/40';
      case 'sales':
        return 'text-[#34d399] bg-emerald-950/40 border-emerald-800/40';
      case 'legal':
        return 'text-[#d9b482] bg-amber-950/40 border-amber-800/40';
      default:
        return 'text-[#d9b482] bg-amber-950/40 border-amber-800/40';
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 text-[#f7f2ea]">
      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 flex items-center gap-2.5 text-emerald-300 text-xs font-semibold animate-fade-in shadow-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Department scope preference updated successfully.</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div
        className="rounded-[24px] p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(20, 23, 33, 0.85)',
          border: '1px solid rgba(217, 180, 130, 0.22)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-[#14110d] shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #d9b482, #f5e4cc, #c4975f)',
                boxShadow: '0 0 30px rgba(217, 180, 130, 0.35)',
              }}
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-[#faf6ef]">{user?.fullName || 'Enterprise Member'}</h1>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${getDeptColor(user?.department)}`}>
                  {user?.department || 'General'}
                </span>
              </div>
              <p className="text-xs text-[#b8a692] mt-0.5">{user?.email || 'enterprise-member@docusync.corp'}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-[#34d399] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>RBAC Authenticated · Session Verified</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/40 transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Ambient glow in card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Account Settings & Department Scope Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Scope Switcher */}
        <div
          className="rounded-2xl p-6 backdrop-blur-md space-y-4"
          style={{
            background: 'rgba(20, 23, 33, 0.82)',
            border: '1px solid rgba(217, 180, 130, 0.18)',
          }}
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#d9b482]" />
            <h2 className="text-sm font-bold text-[#faf6ef]">Department Scope</h2>
          </div>
          <p className="text-xs text-[#b8a692] leading-relaxed">
            Changing your active department alters the default context filtering applied to the AI Copilot and Knowledge Base.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {['Engineering', 'HR', 'Sales', 'Legal'].map((d) => (
              <button
                key={d}
                onClick={() => handleUpdateDept(d)}
                className={`p-3 rounded-xl text-xs font-semibold border transition text-left cursor-pointer ${
                  department === d
                    ? 'border-[#d9b482] bg-amber-500/15 text-[#faf6ef] shadow-md'
                    : 'border-white/5 bg-black/30 text-[#c4b5a3] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{d}</span>
                  {department === d && <CheckCircle2 className="w-3.5 h-3.5 text-[#d9b482]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security & Token Info */}
        <div
          className="rounded-2xl p-6 backdrop-blur-md space-y-4"
          style={{
            background: 'rgba(20, 23, 33, 0.82)',
            border: '1px solid rgba(217, 180, 130, 0.18)',
          }}
        >
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#d9b482]" />
            <h2 className="text-sm font-bold text-[#faf6ef]">Active JWT Session</h2>
          </div>
          <p className="text-xs text-[#b8a692] leading-relaxed">
            Injected automatically into all authenticated backend requests via Axios Bearer authorization.
          </p>

          <div className="space-y-2 pt-1">
            <div className="p-3 rounded-xl bg-black/40 border border-[#d9b482]/20 font-mono text-[11px] text-[#eedfc8] flex items-center justify-between gap-3 overflow-hidden">
              <span className="truncate">
                {token ? `${token.slice(0, 36)}...` : 'Bearer demo-jwt-token'}
              </span>
              <button
                onClick={handleCopyToken}
                className="shrink-0 text-xs text-[#d9b482] hover:text-[#fff0dc] transition font-semibold cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#8c7b69] font-mono px-1">
              <span>Token Type: Bearer</span>
              <span className="text-[#34d399]">Valid (24h)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Tenant Isolation Status */}
      <div
        className="rounded-2xl p-6 backdrop-blur-md space-y-4"
        style={{
          background: 'rgba(20, 23, 33, 0.82)',
          border: '1px solid rgba(217, 180, 130, 0.18)',
        }}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-[#faf6ef]">Enterprise Security Architecture</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-black/30 border border-[#d9b482]/15 space-y-1">
            <p className="text-xs font-semibold text-[#faf6ef]">SOC-2 Type II</p>
            <p className="text-[11px] text-[#b8a692]">Cryptographic tenant separation enforced</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/30 border border-[#d9b482]/15 space-y-1">
            <p className="text-xs font-semibold text-[#faf6ef]">Zero LLM Training</p>
            <p className="text-[11px] text-[#b8a692]">Queries are strictly discarded after inference</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/30 border border-[#d9b482]/15 space-y-1">
            <p className="text-xs font-semibold text-[#faf6ef]">Grounding Verifier</p>
            <p className="text-[11px] text-[#b8a692]">Citations checked against vector indices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
