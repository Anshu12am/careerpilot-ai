import React from 'react'

export default function ResumePreview({resumeData}) {

  const hasData =
   resumeData?.PersonalInfo?.name ||
  resumeData?.PersonalInfo?.email ||
  resumeData?.PersonalInfo?.phone ||
  resumeData?.PersonalInfo?.address ||
  resumeData?.PersonalInfo?.linkedin ||
  resumeData?.PersonalInfo?.website ||
  resumeData?.PersonalInfo?.summary ||

  resumeData?.education?.some(
    edu =>
      edu.school ||
      edu.degree ||
      edu.field ||
      edu.startDate ||
      edu.endDate
  ) ||

  resumeData?.experience?.some(
    exp =>
      exp.company ||
      exp.position ||
      exp.startDate ||
      exp.endDate ||
      exp.description
  ) ||

  resumeData?.projects?.some(
    project =>
      project.projectName ||
      project.technologies ||
      project.description ||
      project.link
  ) ||

  resumeData?.skills?.length > 0;

  if(!hasData){
     return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] flex items-center justify-center text-white">

      <h1 className="text-4xl font-semibold text-cyan-300">
        No Preview Available
      </h1>

    </div>
  )
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] text-white overflow-x-hidden py-10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0f172a]/70 to-transparent pointer-events-none" />

        <div id="resume-preview" className="relative rounded-[32px] border border-white/10 bg-slate-950/95 shadow-neon overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-5xl">
<div className="mb-10 flex flex-col gap-6 text-center sm:text-left">
                <span className="inline-flex w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Resume Preview
                </span>
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                 <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-800 text-4xl font-semibold text-cyan-200 shadow-[0_0_30px_rgba(34,211,211,0.16)]">
  {getInitials(resumeData?.PersonalInfo?.name)}
</div>
                  {resumeData?.PersonalInfo?.name && (
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                      {resumeData.PersonalInfo.name}
                    </h1>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
                  <div className="space-y-10">
                    {
                      (
                      resumeData?.PersonalInfo?.email ||
                      resumeData?.PersonalInfo?.phone || 
                      resumeData?.PersonalInfo?.address ||
                      resumeData?.PersonalInfo?.linkedin ||
                      resumeData?.PersonalInfo?.website ||
                      resumeData?.PersonalInfo?.summary
                      )
&&
                    <section className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                         {resumeData?.PersonalInfo?.email && (
    <ContactItem
      title="Email"
      value={resumeData.PersonalInfo.email}
    />
  )}

  {resumeData?.PersonalInfo?.phone && (
    <ContactItem
      title="Phone"
      value={resumeData.PersonalInfo.phone}
    />
  )}

  {resumeData?.PersonalInfo?.address && (
    <ContactItem
      title="Location"
      value={resumeData.PersonalInfo.address}
    />
  )}

  {resumeData?.PersonalInfo?.linkedin && (
    <ContactItem
      title="LinkedIn"
      value={resumeData.PersonalInfo.linkedin}
    />
  )}

  {resumeData?.PersonalInfo?.website && (
    <ContactItem
      title="Website"
      value={resumeData.PersonalInfo.website}
    />
  )}
                      </div>
                      <div className="h-px bg-white/10" />
                     {resumeData?.PersonalInfo?.summary && (
  <>
    <SectionHeader title="Summary" />
    <p className="text-sm leading-7 text-slate-300 sm:text-base">
      {resumeData.PersonalInfo.summary}
    </p>
  </>
)}
                    </section>
                          
                    }
                    {
                      resumeData?.experience?.some(
                      exp =>
                      exp.company ||
                      exp.position ||
                      exp.startDate ||
                      exp.endDate ||
                      exp.description
) &&
(
                    <section className="space-y-4">
      <SectionHeader title="Experience" />

      {resumeData.experience
        .filter(
          exp =>
            exp.company ||
            exp.position ||
            exp.startDate ||
            exp.endDate ||
            exp.description
        )
        .map((job, index) => (
          <div
            key={index}
            className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/80 p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  {job.position}
                </p>

                <p className="text-sm text-slate-400">
                  {job.company}
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {job.startDate} - {job.endDate}
              </p>
            </div>

            <ul className="space-y-3 text-sm leading-7 text-slate-300 list-disc list-inside">
              {job.description
                ?.split("\n")
                .map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
            </ul>
          </div>
        ))}
    </section>

)
}
                    
                  </div>

                  <aside className="space-y-10">
                    {
resumeData?.education?.some(
edu =>
edu.school ||
edu.degree ||
edu.field  ||
edu.startDate ||
edu.endDate
) &&
                    <section className="space-y-4">
                      <SectionHeader title="Education" />
                     {resumeData.education
        .filter(
          edu =>
            edu.school ||
            edu.degree ||
            edu.field ||
            edu.startDate ||
            edu.endDate
        )
        .map((edu, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-slate-950/80 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-white">
                  {edu.degree}
                </p>

                <p className="text-sm text-slate-400">
                  {edu.school}
                </p>

                <p className="text-sm text-slate-400">
                  {edu.field}
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          </div>
        ))}

                    </section>
}
{
  resumeData?.skills?.length>0 &&(
                    <section className="space-y-4">
                      <SectionHeader title="Skills" />
                      <div className="flex flex-wrap gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-200">
                       {
                         resumeData?.skills?.map((skill,index)=>(
                         <span key={index}>
                          {skill}
                         </span>
                  ))
                        }</div>
                    
                    </section>
  )
}
{
resumeData?.projects?.some(
project =>
project.projectName ||
project.technologies ||
project.link ||
project.description
) &&
                     <section className="space-y-4">
                      <SectionHeader title="Projects" />
                      {
        resumeData.projects
          .filter(
            project =>
              project.projectName ||
              project.technologies ||
              project.link ||
              project.description
          )
          .map((project, index) => (

            <div
              key={index}
              className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/80 p-5"
            >

              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  {project.projectName && (
                    <p className="text-lg font-semibold text-white">
                      {project.projectName}
                    </p>
                  )}

                  {project.technologies && (
                    <p className="text-sm text-slate-400">
                      {project.technologies}
                    </p>
                  )}

                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    View Project
                  </a>
                )}

              </div>

              {project.description && (
                <p className="text-sm leading-7 text-slate-300">
                  {project.description}
                </p>
              )}

            </div>

          ))
      }

                    </section>
}
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

function getInitials(name) {
  if (!name) return "U"

  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"

  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || "")
  return initials.join("")
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300/90">{title}</h2>
      <div className="flex-1 border-t border-white/10" />
    </div>
  )
}

function ContactItem({ title, value }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          {title === 'Email' ? (
            <>
              <path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V7.5" />
              <path d="M21 7.5L12 13.5 3 7.5" />
            </>
          ) : null}
          {title === 'Phone' ? (
            <path d="M22 16.92v3a2.08 2.08 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2.08 2.08 0 0 1 5 3h3a2.08 2.08 0 0 1 2.18 1.72 12.13 12.13 0 0 0 .7 2.81 2.08 2.08 0 0 1-.47 2.27L9.4 10.6a16 16 0 0 0 4 4l1.8-1.8a2.08 2.08 0 0 1 2.27-.47 12.13 12.13 0 0 0 2.81.7A2.08 2.08 0 0 1 22 16.92z" />
          ) : null}
          {title === 'Location' ? (
            <>
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </>
          ) : null}
          {title === 'LinkedIn' ? (
            <>
              <path d="M4 4h16v16H4z" />
              <path d="M8 11v6" />
              <path d="M8 8.5a1.5 1.5 0 1 1 0 3" />
              <path d="M12 11v6" />
              <path d="M16 11v6" />
            </>
          ) : null}
          {title === 'Website' ? (
            <>
              <path d="M4 12h16" />
              <path d="M12 4a8 8 0 0 1 0 16" />
              <path d="M12 4a8 8 0 0 0 0 16" />
            </>
          ) : null}
        </svg>
      </span>
      <span className="whitespace-nowrap text-slate-300">{value}</span>
    </div>
  )
}
