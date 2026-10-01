import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, 
  FileText, 
  LogOut, 
  Sparkles, 
  User as UserIcon, 
  Building2, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDepartmentColor = (dept) => {
    switch (dept?.toLowerCase()) {
      case 'engineering':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hr':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sales':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'legal':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 shrink-0">
        {/* Brand */}
        <div className="p-5 flex items-center space-x-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-1.5">
              DocuSync <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">AI</span>
            </h1>
            <p className="text-xs text-slate-400">Enterprise AI Knowledge Hub</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </div>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span>AI Copilot</span>
          </NavLink>

          <NavLink
            to="/documents"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Knowledge Base</span>
          </NavLink>
        </nav>

        {/* System Status badge */}
        <div className="mx-3 mb-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Enterprise Engine
            </span>
            <span className="text-[10px] font-mono text-slate-400">Gemini 2.0</span>
          </div>
          <p className="text-[11px] text-slate-400">RAG Document Retrieval Active</p>
        </div>

        {/* User Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-inner">
                {user?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.fullName || 'Enterprise User'}
                </p>
                <span className={`inline-block text-[10px] px-1.5 py-0.2 rounded border font-medium mt-0.5 ${getDepartmentColor(user?.department)}`}>
                  {user?.department || 'General'}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
