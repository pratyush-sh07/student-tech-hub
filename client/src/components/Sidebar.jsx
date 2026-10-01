import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  User, 
  Sparkles, 
  LogOut, 
  Server,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Knowledge Base', path: '/documents', icon: FileText, badge: null },
    { name: 'AI Copilot', path: '/chat', icon: Bot, badge: 'Live' },
    { name: 'Profile & Security', path: '/profile', icon: User, badge: null },
  ];

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
    <aside className="w-64 bg-[#141722]/90 backdrop-blur-xl border-r border-[#d9b482]/20 flex flex-col justify-between shrink-0 select-none z-30">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center space-x-3 border-b border-[#d9b482]/15">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d9b482] via-[#c4975f] to-[#8c6032] flex items-center justify-center shadow-lg shadow-amber-900/30">
            <Sparkles className="w-5 h-5 text-[#fffaf3]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#faf6ef] text-base tracking-tight">DocuSync</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-[#d9b482] border border-amber-500/30">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspace Hub
          </div>

          <nav className="space-y-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#d9b482] to-[#c4975f] text-[#12151f] shadow-lg shadow-amber-900/30 font-bold'
                        : 'text-[#c4b5a3] hover:text-[#fff0dc] hover:bg-white/[0.04]'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 shrink-0 transition group-hover:scale-110" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Area: System Status & User Section */}
      <div className="p-3 space-y-3 border-t border-slate-800/80">
        {/* Backend API status */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Backend API Contract
            </span>
            <span className="text-[10px] font-mono text-slate-400">REST v1</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
            <span>RAG Grounding</span>
            <span className="text-emerald-400 font-medium">Ready</span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-800/50">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-md">
              {user?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {user?.fullName || 'Enterprise Member'}
              </p>
              <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${getDeptColor(user?.department)}`}>
                {user?.department || 'General'}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/80 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
