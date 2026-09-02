import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCoverLetter } from '../services/coverLetter.api';
import toast from 'react-hot-toast';

export default function CoverLetterCard({ coverLetter,onDelete }) {

  const navigate = useNavigate();

  const handleAction = (actionKey) =>{
    switch(actionKey){
      // case 'edit':
      //   navigate(`/cover-letter/edit/${coverLetter._id}`);
      // break;

      case 'preview':
        navigate(`/cover-letter/preview/${coverLetter._id}`)
      break;


      case 'delete':
      handleDelete()
      break;

      default:
      break;
    }
  }

  const handleDelete = async() =>{

    try{
      await deleteCoverLetter(coverLetter._id);
      toast.success("Cover letter deleted");
      onDelete(coverLetter._id)
    }catch(error){
      toast.error("Delete failed");
    }
  }

  
 
  const actions = [
 
    {
      key: 'preview',
      label: 'Preview',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
        </svg>
      ),
    },

    {
      key: 'delete',
      label: 'Delete CoverLetter',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
          <path d="M4 7h16" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 7V4h6v3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7l1 13h6l1-13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      destructive: true,
    },
  ]

  return (
    <div className="rounded-xl border border-white/6 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:brightness-105">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{coverLetter.jobRole}</h3>
          <p className="mt-2 text-sm subtle">{new Date(coverLetter.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <button onClick={() => handleAction(action.key)}
                key={action.key}
                type="button"
                aria-label={action.label}
                className={`group relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white ${
                  action.destructive ? 'hover:bg-red-500/10 hover:text-red-300' : ''
                }`}
              >
                {action.icon}
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#050816]/95 px-2 py-1 text-[11px] text-white/80 opacity-0 shadow-lg shadow-black/30 transition-opacity duration-200 group-hover:opacity-100">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
