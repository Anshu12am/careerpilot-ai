const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Field = ({label, placeholder, icon, value, onChange}) => (
  <div>
    <label className="block text-sm subtle mb-2">{label}</label>
    <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/6 px-3 py-2">
      {icon && <span className="text-slate-200 opacity-90">{icon}</span>}
      <input 
        placeholder={placeholder} 
        className="bg-transparent outline-none w-full placeholder:text-slate-400 text-white input-focus-glow" 
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
)

export default function PersonalInfo({resumeData, setResumeData}) {
 
  

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">PERSONAL INFO</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name" placeholder="John Doe" value={resumeData.PersonalInfo.name} onChange={(e) => setResumeData({...resumeData, PersonalInfo: {...resumeData.PersonalInfo, name: e.target.value}})} icon={<IconUser />} />
        <Field label="Email" placeholder="john@example.com" value={resumeData.PersonalInfo.email} onChange={(e) => setResumeData({...resumeData, PersonalInfo: {...resumeData.PersonalInfo, email: e.target.value}})} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />

        <Field label="Phone" placeholder="+1 234 567 8900" value={resumeData.PersonalInfo.phone} onChange={(e)=>setResumeData({
          ...resumeData,PersonalInfo: {...resumeData.PersonalInfo, phone: e.target.value}
        })} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92V21a1 1 0 0 1-1.11 1A19 19 0 0 1 3 5.11 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75c.12.62.37 1.95.55 2.56a1 1 0 0 1-.24 1L8.7 10.7a13 13 0 0 0 5.6 5.6l1.4-1.4a1 1 0 0 1 1-.24c.6.18 1.94.43 2.56.55a1 1 0 0 1 .75 1V21z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <Field label="Location" placeholder="New York, NY" value={resumeData.PersonalInfo.address} onChange={(e)=>setResumeData({
          ...resumeData,PersonalInfo: {...resumeData.PersonalInfo, address: e.target.value}
        })}  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />

        <Field label="LinkedIn" placeholder="linkedin.com/in/johndoe"  value={resumeData.PersonalInfo.linkedin} onChange={(e)=>setResumeData({
          ...resumeData,PersonalInfo: {...resumeData.PersonalInfo, linkedin: e.target.value}
        })} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-14h4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <Field label="Website" placeholder="johndoe.com"   
         value={resumeData.PersonalInfo.website} onChange={(e)=>setResumeData({
          ...resumeData,PersonalInfo: {...resumeData.PersonalInfo, website: e.target.value}
        })}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
      </div>

      <div>
        <label className="block text-sm subtle mb-2">Professional Summary</label>
        <textarea 
          placeholder="A brief professional summary..." 
          className="w-full bg-white/5 rounded-xl border border-white/6 p-3 placeholder:text-slate-400 text-white h-28 resize-none" 
          value={resumeData.PersonalInfo.summary}
          onChange={(e) => setResumeData({...resumeData, PersonalInfo: {...resumeData.PersonalInfo, summary: e.target.value}})}
        />
      </div>
    </div>
  )
}
