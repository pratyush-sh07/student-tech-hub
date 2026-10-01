import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CosmicCanvas from './CosmicCanvas';

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#10131a] text-[#f4efe6] antialiased overflow-hidden selection:bg-amber-600 selection:text-white relative">
      {/* Subtle cosmic stars in entire app shell */}
      <CosmicCanvas />

      {/* Warm ambient radiance */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(217, 180, 130, 0.15), transparent 70%), radial-gradient(circle 600px at 90% 90%, rgba(180, 130, 80, 0.1), transparent)',
        }}
      />

      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent z-10">
        {/* Top Navbar */}
        <Navbar />

        {/* Viewport content */}
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
