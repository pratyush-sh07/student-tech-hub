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
  Sparkles
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
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
      case 'hr':
        return 'text-purple-400 bg-purple-950/60 border-purple-800/60';
      case 'sales':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'legal':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      default:
        return 'text-blue-400 bg-blue-950/60 border-blue-800/60';
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2.5 text-emerald-400 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Department scope preference updated successfully.</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-500/20">
              {user?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {user?.fullName || 'Enterprise Member'}
                </h1>
                <span className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold ${getDeptColor(user?.department)}`}>
                  {user?.department || 'Engineering'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{user?.email || 'user@docusync.corp'}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active Enterprise Session (Bearer Token Authorized)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 text-red-300 text-xs font-semibold rounded-xl transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Account Details & Department Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Details */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            Identity Details
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-500 font-medium">Full Name</label>
              <p className="text-slate-200 font-semibold mt-0.5">{user?.fullName || 'Enterprise Member'}</p>
            </div>
            <div>
              <label className="text-slate-500 font-medium">Corporate Email</label>
              <p className="text-slate-200 font-semibold mt-0.5">{user?.email || 'user@docusync.corp'}</p>
            </div>
            <div>
              <label className="text-slate-500 font-medium">Assigned Department</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {['Engineering', 'HR', 'Legal', 'Sales'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleUpdateDept(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      (user?.department || 'Engineering') === dept
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-950/50 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security & Authentication Tokens */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Security & Authentication
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-500 font-medium">Active JWT Token</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value={token || 'mock-jwt-token-active'}
                  className="flex-1 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-400 font-mono text-[11px]"
                />
                <button
                  onClick={handleCopyToken}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition flex items-center gap-1 cursor-pointer"
                  title="Copy Token"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Saved in localStorage for Bearer authorization across all REST requests.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Token Type:</span>
                <span className="font-mono text-slate-200">Bearer JWT (RFC 7519)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Encryption:</span>
                <span className="text-emerald-400 font-medium">HS256 Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Session Status:</span>
                <span className="text-emerald-400 font-medium">Authenticated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
