// import React from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
// import OtpInput from './OtpInput'

// const ArrowLeft = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
//     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// )

// const Shield = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" stroke="none" fill="white" opacity="0.08" />
//     <path d="M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" stroke="currentColor" strokeWidth="0.8" fill="none" />
//     <path d="M10 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// )

// export default function OtpCard() { 

//   const navigate = useNavigate()
//   const location = useLocation()
//   const { handleOTPVerification } = useAuth()

//   const [otp, setOtp] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false);


//   const handleSubmit = async() =>{
//     setIsSubmitting(true);
//   const email = location.state?.email
//   const success = await handleOTPVerification({
//      email,
//      otp: otp.toString().trim() })
//    if(success){
//     navigate("/dashboard")
//   } else {
//     alert("Invalid OTP")
//   }
//   setIsSubmitting(false);
//   }
//   return (
//     <div className="max-w-md w-full mx-auto glass rounded-2xl p-8 shadow-neon hover-glow transition-all duration-300">
//       <div className="flex items-start justify-between">
//         <Link to="/login" className="text-sm subtle hover:underline flex items-center gap-2">
//           <span className="text-slate-300"><ArrowLeft /></span>
//           <span>Back to sign in</span>
//         </Link>
//       </div>

//       <div className="text-center mt-6">
//         <div className="mx-auto w-20 h-20 rounded-full bg-white/5 border border-white/6 flex items-center justify-center">
//           <span className="text-green-400"><Shield /></span>
//         </div>

//         <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-6">Verify your email</h1>
//         <p className="mt-3 text-sm subtle">We've sent a 6-digit code to your email</p>
//         <div className="mt-2 text-sm font-medium text-white">{location.state?.email}</div>
//       </div>

//       <div className="mt-8">
//         <div className="flex items-center justify-center gap-3 md:gap-4">
//           <OtpInput ariaLabel="otp-1" value={otp[0] || ""}
//   onChange={(value) =>
//     setOtp((prev) => value + prev.slice(1))
//   } />
//           <OtpInput ariaLabel="otp-2" value={otp[1] || ""}
//   onChange={(value) =>
//     setOtp((prev) => prev.slice(0, 1) + value + prev.slice(2))
//   } />
//           <OtpInput ariaLabel="otp-3"  value={otp[2] || ""}
//   onChange={(value) =>
//     setOtp((prev) => prev.slice(0, 2) + value + prev.slice(3))
//   } />
//           <OtpInput ariaLabel="otp-4" value={otp[3] || ""}
//   onChange={(value) =>
//     setOtp((prev) => prev.slice(0, 3) + value + prev.slice(4))
//   } />
//           <OtpInput ariaLabel="otp-5"  value={otp[4] || ""}
//   onChange={(value) =>
//     setOtp((prev) => prev.slice(0, 4) + value + prev.slice(5))
//   } />
//           <OtpInput ariaLabel="otp-6"  value={otp[5] || ""}
//   onChange={(value) =>
//     setOtp((prev) => prev.slice(0, 5) + value)
//   } />
//         </div>

//         <p className="text-center text-sm subtle mt-4">Enter the verification code sent to your email</p>

//         <div className="mt-6">
//           <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-md transition-all duration-200" onClick={handleSubmit}>
//             {isSubmitting ? "Verifying email..." : "Verify email"}
//           </button>
//         </div>

//         <div className="mt-4 text-center text-sm subtle">
//           Didn't receive the code? <button className="text-emerald-400 font-medium hover:underline">Resend</button>
//         </div>
//       </div>
//     </div>
//   )
// }
