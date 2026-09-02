import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles
} from 'lucide-react';


const Navbar = () => {

  const navigate = useNavigate()
  return (
    <nav className="w-full px-6 md:px-12 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="white" opacity="0.06"/>
            <path stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/><Sparkles />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">CareerPilot AI</span>
      </div>

      <div>
        <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-purple-600 shadow-neon transition-transform hover:scale-[1.02]">
          Dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="#062237" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
