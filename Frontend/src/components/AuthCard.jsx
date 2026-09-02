import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function AuthCard() {
  
  const { handleLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("🔥 HANDLE SUBMIT CALLED");
    setIsSubmitting(true);
   const success = await handleLogin({email, password})
    
   if(success){
   navigate("/dashboard");
   }
   else{
    alert("Login failed. Please check your credentials and try again.")
   }
   setIsSubmitting(false);
  }

  return (
    <div className="w-full max-w-md mx-auto glass rounded-2xl p-8 shadow-neon hover-glow transition-all duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">Welcome to CareerPilot AI</h2>
        <p className="mt-2 text-sm subtle">Sign in to continue</p>
      </div>

     

       
<form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <label className="block text-sm subtle">Email</label>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/6 px-3 py-2">
            <span className="text-slate-200 opacity-90"><MailIcon /></span>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="you@example.com" className="bg-transparent outline-none w-full placeholder:text-slate-400 text-white input-focus-glow" />
          </div>

          <label className="block text-sm subtle">Password</label>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/6 px-3 py-2">
            <span className="text-slate-200 opacity-90"><LockIcon /></span>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="••••••••" type="password" className="bg-transparent outline-none w-full placeholder:text-slate-400 text-white input-focus-glow" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 text-black font-semibold shadow-md hover:brightness-105 transition-all duration-300">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
</form>
        <div className="flex items-center justify-between mt-4 text-sm">
          <a href="#" className="subtle hover:underline">Forgot password?</a>
          <Link to="/register" className="subtle hover:underline">Need an account? <span className="text-white font-medium">Sign up</span></Link>
        </div>
      </div>
    
  )
}
