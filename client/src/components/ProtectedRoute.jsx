import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-2xl animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-200">Verifying enterprise session</p>
            <p className="text-xs text-slate-500 mt-0.5">Authorizing token credentials...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
