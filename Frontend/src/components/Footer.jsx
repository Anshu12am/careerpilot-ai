import React from 'react'
import {
  Sparkles,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-white/6 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" >
              <rect x="3" y="3" width="18" height="18" rx="4" fill="white" opacity="0.06"/><Sparkles />
            </svg>
          </div>
          <span className="text-white font-semibold">CareerPilot AI</span>
        </div>

        <div className="text-slate-400">© 2026 CareerPilot AI</div>
      </div>
    </footer>
  )
}

export default Footer
