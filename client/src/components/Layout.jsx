import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 antialiased overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0e1322]">
        {/* Top Navbar */}
        <Navbar />

        {/* Viewport content */}
        <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-[#0e1322] to-[#090d16]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
