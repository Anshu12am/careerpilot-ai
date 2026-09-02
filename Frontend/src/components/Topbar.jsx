import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';


export default function Topbar() {
  const { user, handleLogout } = useAuth();
  

  const [open, setOpen] = useState(false);

  const firstLetter = user?.email?.charAt(0)?.toUpperCase() || 'U';

  const handleLogoutClick = async () => {
    const success = await handleLogout();
    if (success) {
      window.location.href = '/';
    }
  };


  return (
    <header className="fixed left-72 md:left-64 lg:left-72 right-0 top-0 z-20 glass backdrop-blur border-b border-white/6 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-white font-bold text-lg">CareerPilot AI</div>
      </div>

      <div className="relative">
        {/* Avatar */}
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-600 flex items-center justify-center font-medium text-white"
        >
          {firstLetter}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#0b1020] shadow-xl backdrop-blur-md overflow-hidden">
            <div className="px-4 py-3 text-sm text-slate-300 border-b border-white/10">
              {user?.email}
            </div>

            <button
              onClick={handleLogoutClick}
              className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}