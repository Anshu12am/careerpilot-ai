import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Mail, FileText, LayoutDashboard, Bot
} from 'lucide-react';

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-blue-400 to-purple-600 text-white shadow-neon"
            : "text-slate-200 hover:bg-white/5"
        }`
      }
    >
      {children}
    </NavLink>
  );
};


export default function Sidebar(){

const navigate = useNavigate();
  return (
    <aside className="fixed left-0 top-0 h-full w-72 md:w-64 lg:w-72 p-6 glass backdrop-blur border-r border-white/6">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-blue-400 to-purple-600 flex items-center justify-center  font-bold"><Sparkles className="w-4 h-4 text-white"/></div>
        <div>
          <div className="text-white font-bold">CareerPilot AI</div>
        </div>
      </div>

      <nav className="space-y-3">
        <NavItem to="/dashboard">
          <LayoutDashboard className="w-4 h-4"/>
          <span>Dashboard</span>
        </NavItem>

        <NavItem to="/resume-builder">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><FileText className="w-4 h-4"/></svg>
          <span >Resume Builder</span>
        </NavItem>

        <NavItem to="/cover-letter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90"><path stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><Mail className="w-4 h-4"/></svg>
          <span>Cover Letter</span>
        </NavItem>

        <NavItem to="/career-agent">
          <Bot className="w-4 h-4" />
          <span>Career Agent</span>
        </NavItem>
      </nav>


      <div className="mt-auto pt-6">
        <button onClick={()=>navigate('/resume-builder')} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 text-black font-semibold shadow-md hover:brightness-105 transition-all duration-300">+ Create New Resume</button>
      </div>
      
    </aside>
  )
}
