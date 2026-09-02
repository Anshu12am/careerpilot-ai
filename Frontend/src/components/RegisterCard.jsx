import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast';

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

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

export default function RegisterCard() {

  const { handleRegister } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsSubmitting(true);
    
    const success = await handleRegister({email, password, confirmPassword})
    if(success){
      toast.success("Registration successful");
      navigate("/dashboard");
    }else{
      toast.error('Registration failed');
    }
    setIsSubmitting(false);
  }
  return (
    <div className="w-full max-w-md mx-auto glass rounded-2xl p-8 shadow-neon hover-glow transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <Link to="/login" className="flex items-center gap-2 text-sm subtle hover:underline">
          <span className="text-slate-200 opacity-90"><BackIcon /></span>
          <span>Back to sign in</span>
        </Link>
      </div>

      <div className="text-left mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">Create your account</h2>
        <p className="mt-2 text-sm subtle">Start building your professional resume in minutes</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm subtle mb-2">Email</label>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/6 px-3 py-2">
              <span className="text-slate-200 opacity-90"><MailIcon /></span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-transparent outline-none w-full placeholder:text-slate-400 text-white input-focus-glow" />
            </div>
          </div>

          <div>
            <label className="block text-sm subtle mb-2">Password</label>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/6 px-3 py-2">
              <span className="text-slate-200 opacity-90"><LockIcon /></span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" type="password" className="bg-transparent outline-none w-full placeholder:text-slate-400 text-white input-focus-glow" />
            </div>
          </div>

          <div>
            <label className="block text-sm subtle mb-2">Confirm Password</label>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/6 px-3 py-2">
              <span className="text-slate-200 opacity-90"><LockIcon /></span>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" type="password" className="bg-transparent outline-none w-full placeholder:text-slate-400 text-white input-focus-glow" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 text-black font-semibold shadow-md hover:brightness-105 transition-all duration-300">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-sm text-center subtle">
        By creating an account you agree to our <a href="#" className="hover:underline text-white">Terms</a>.
      </div>
      </div>
    
  )
}
