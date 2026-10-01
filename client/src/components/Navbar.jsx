import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bell, 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  Building2, 
  Cpu, 
  Activity,
  Layers
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return { title: 'Executive Overview', section: 'Analytics' };
      case '/documents':
        return { title: 'Enterprise Knowledge Base', section: 'Documents' };
      case '/chat':
        return { title: 'AI Copilot Orchestration', section: 'Copilot' };
      case '/profile':
        return { title: 'User Account & Security', section: 'Settings' };
      default:
        return { title: 'DocuSync AI', section: 'Workspace' };
    }
  };

  const { title, section } = getPageTitle(location.pathname);

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Breadcrumbs & Title */}
      <div className="flex items-center space-x-2.5">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{section}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <h2 className="text-sm font-bold text-white tracking-tight">{title}</h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Department Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-blue-400" />
          <span>Dept:</span>
          <span className="font-semibold text-white">{user?.department || 'General'}</span>
        </div>

        {/* Operational Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-[11px] text-emerald-400">
          <Activity className="w-3.5 h-3.5" />
          <span className="font-medium">All Systems Operational</span>
        </div>

        {/* User Quick Link */}
        <Link
          to="/profile"
          className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-inner">
            {user?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="text-xs font-medium text-slate-300 hidden lg:inline">
            {user?.fullName?.split(' ')[0] || 'User'}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
