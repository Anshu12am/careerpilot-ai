import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PersonalInfo from './resumeForm/PersonalInfo'
import Education from './resumeForm/Education'
import Experience from './resumeForm/Experience'
import Skill from './resumeForm/Skill'
import Projects from './resumeForm/Projects'
import ResumePreview from './preview/ResumePreview'
import { analyzeATS } from './services/ats.api'
import { initialResumeData,useResume } from './context/resumeContext.jsx'
import { getResumeById } from './services/resume.api'
import { downloadResume } from './utils/downloadResume.js'


function Tabs(){


  const { resumeData, setResumeData, jobDescription, setJobDescription, setAnalysis, setResumeId } = useResume();

  const [tab, setTab] = useState('Edit')
  const [showExperience, setShowExperience] = useState(false)
  const [showEducation, setShowEducation] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [loading,setLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  const STORAGE_KEY = 'resume_builder_data';

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  },[resumeData]);

  useEffect(() => {
    if(!id){
      setResumeId(null);
      setAnalysis(null);
      const saved = localStorage.getItem(STORAGE_KEY);
      if(saved){
        setResumeData(JSON.parse(saved));
      }else{
      setResumeData(initialResumeData);
      }
      return;
    }

    setResumeId(id);

    const fetchResume = async () =>{
      try{
        const response = await getResumeById(id);

        setResumeData(response.data.resumeData);
        setAnalysis(response.data.atsAnalysis || null);
    }catch(error){
      console.error("Error fetching resume by ID:", error);
    }
  };
    fetchResume();

  },[id, setResumeData, setAnalysis, setResumeId]);


  const handleATSAnalysis = async () =>{
    setLoading(true);
    try{
      const result = await analyzeATS(resumeData, jobDescription);
 
      setAnalysis(result.data);
      navigate(`/ats-analysis/${id}`);
    }catch(error){
      console.error("Error during ATS analysis:", error);
    }finally{
      setLoading(false);
    }
  }

 

  return (
    <>
      <div className="mt-4">
        <div className="inline-flex items-center bg-white/4 rounded-xl p-1">
          <button
            onClick={() => setTab('Edit')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === 'Edit' ? 'bg-white text-black shadow' : 'text-white/80 hover:text-white'}`}
            aria-pressed={tab === 'Edit'}
          >
            Edit
          </button>

          <button
            onClick={() => setTab('Preview')}
            className={`ml-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === 'Preview' ? 'bg-white text-black shadow' : 'text-white/80 hover:text-white'}`}
            aria-pressed={tab === 'Preview'}
          >
            Preview
          </button>

          <button
            onClick={() => setTab('ATS')}
            className={`ml-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === 'ATS' ? 'bg-white text-black shadow' : 'text-white/80 hover:text-white'}`}
            aria-pressed={tab === 'ATS'}
          >
            ATS
          </button>
        </div>
      </div>

      <div className="pt-6">
        {tab === 'Edit' && (
          <div className="grid grid-cols-1 gap-6">
            <section className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6 shadow-neon">
               
                <div className="space-y-4">
                  <PersonalInfo resumeData={resumeData} setResumeData={setResumeData} />
                  <Experience isOpen={showExperience} onToggle={() => setShowExperience(prev => !prev)}
                  resumeData={resumeData}
                  setResumeData={setResumeData} />
                  <Education isOpen={showEducation} onToggle={() => setShowEducation(prev => !prev)}
                  resumeData={resumeData}
                  setResumeData={setResumeData} />
                  <Skill resumeData={resumeData}
                  setResumeData={setResumeData} />
                  <Projects isOpen={showProjects} onToggle={() => setShowProjects(prev => !prev)}
                  resumeData={resumeData}
                  setResumeData={setResumeData} />
                </div>
              </div>
            </section>
          </div>
        )}

        {tab === 'Preview' && <ResumePreview resumeData={resumeData} />}

        {tab === 'ATS' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#050816]/90 rounded-xl p-6 shadow-md text-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">ATS Optimization</h3>
              </div>
              <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here to analyze ATS compatibility..." className="w-full rounded-lg border border-white/10 bg-[#070b1f] p-3 h-28 resize-none text-white placeholder:text-slate-400" />
              <button disabled={loading} onClick={handleATSAnalysis} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl py-3 font-medium">{loading ? "Analyzing ATS..." : "Analyze ATS Score"}</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function ResumeBuilder(){

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] text-white overflow-x-hidden">
      <Sidebar />
      <Topbar />

      <main className="pt-16 md:ml-64 lg:ml-72 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-sm subtle hover:underline">←</button>
              <input className="bg-white/5 text-white rounded-full px-4 py-2 placeholder:text-slate-400" defaultValue="Untitled Resume" />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block bg-white/5 rounded-xl px-3 py-2">Modern</div>
              <button onClick={downloadResume} className="bg-white/5 rounded-xl px-3 py-2">Download PDF</button>
            </div>
          </header>

          {/* Segmented Tabs */}
          <Tabs />
        </div>
      </main>
    </div>
  )
}
