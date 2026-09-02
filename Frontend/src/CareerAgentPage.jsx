import { useState, useEffect,} from 'react';
import { Bot, SendHorizonal, ArrowUpRight, FileText, Info } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { askCareerAgent } from './services/careerAgent.api';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllResumes } from './services/resume.api';
import toast from "react-hot-toast";
import { getCareerAgentMessages,createCareerAgentMessage } from './services/careerAgent.api';

const suggestionQuestions = [
  'How can I improve my resume?',
  'What skills should I improve?',
  'How should I prepare for interviews?',
  'How can I get an internship?',
  'How can I improve my projects?',
];


export default function CareerAgentPage() {


  const [messages, setMessages] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectResumeById,setSelectResumeById] = useState('');
  const [resumes,setResumes] = useState([]);

  useEffect(()=>{

    if(!selectResumeById){
      return;
    }
    const fetchMessages = async() =>{

      try{
        const response = await getCareerAgentMessages(selectResumeById);


        setMessages(response.data || []);
      }catch(error){
        console.error("Error fetching Career Agent messages:", error);
      }
    };
    fetchMessages();
  },[selectResumeById])


   useEffect(() =>{
      const fetchResume = async () =>{
        try{
          const response = await getAllResumes();

          const resumeList = response.data || [];

          setResumes(resumeList);

           if (resumeList.length > 0) {
        setSelectResumeById(resumeList[0]._id);
      }
        }catch(error){
          console.error(error)
        }
      };
      fetchResume();
    },[])


  const handleSendMessage = async (questionText = inputValue)=> {

    const trimmedQuestion = questionText.trim();


    if (!trimmedQuestion || isLoading) {

    return;
  }

    if (!selectResumeById) {
    toast.error("Please select a resume");
    return;
  }



  setMessages((prev) =>[
    ...prev,
    {
      sender: 'user',
      text: trimmedQuestion,
    }
  ]) 

  
  setInputValue('');
  setIsLoading(true);

  try{

  await createCareerAgentMessage({
    resumeId: selectResumeById,
    sender: 'user',
    text: trimmedQuestion,
  })

  
    const response = await askCareerAgent({question:trimmedQuestion,resumeId:selectResumeById});


    setMessages((prev) =>[
      ...prev,
      {
        sender: 'ai',
        text: response.data.answer,
      }
    ]);


     await createCareerAgentMessage({
  resumeId: selectResumeById,
  sender: "ai",
  text: response.data.answer
});


  }catch(error){
    console.error("Career Agent error:", error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "Something went wrong. Please try again.",
      },
    ]);
  }finally{
    setIsLoading(false);
  }

};
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] text-white overflow-x-hidden">
      <Sidebar />
      <Topbar />

      <main className="pt-16 md:ml-64 lg:ml-72 p-6 sm:p-15">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Career Agent</h1>
            <p className="mt-1 text-sm subtle">Your AI career assistant</p>
          </header>

          <div className="mb-6 flex flex-col gap-3 rounded-[22px] border border-violet-400/40 bg-[#0d1325]/80 p-3 shadow-[0_0_30px_rgba(99,102,241,0.08)] backdrop-blur-sm md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-violet-400/35 bg-[#121a2f]/90 px-3 py-2.5 text-sm font-medium text-white/90 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 shadow-[0_0_18px_rgba(139,92,246,0.45)]">
                <FileText className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="whitespace-nowrap">Analyzing Resume</span>
            </div>

            <select
            value={selectResumeById}
            onChange={(e)=> setSelectResumeById(e.target.value)}
            className="flex flex-1 items-center justify-between rounded-xl border border-violet-400/35 bg-[#0f172a]/70 px-3.5 py-2.5 text-sm text-slate-200 shadow-[0_0_18px_rgba(99,102,241,0.06)]">
              <option className="text-slate-300">Select a resume</option>
              {
                resumes.map((resume)=>(
                  <option key={resume._id} value={resume._id}>{resume.title||"Untitled Resume"}</option>
                ))
              }
            
            </select>

            <div className="flex items-center gap-2 text-sm text-slate-300/90 md:ml-auto">
              <Info className="h-4 w-4 shrink-0 text-violet-300" />
              <span className="leading-5 text-slate-300/90">
                The AI will use the selected resume to give you personalized answers.
              </span>
            </div>
          </div>

          <section className="rounded-[28px] border border-white/10 bg-[#0b1020]/80 p-6 md:p-8 shadow-neon backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-[0_0_30px_rgba(129,140,248,0.55)]">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="mt-5 text-center text-2xl md:text-4xl font-bold tracking-tight text-white">
              Hi, I’m your AI Career Agent <span className="inline-block">🤖</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base md:text-lg text-slate-200/90">
              Ask me anything about your career, resume, skills, interviews or how to grow in your journey.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {suggestionQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSendMessage(question)}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-violet-400/40 bg-[#0d1330]/70 px-4 py-3 text-left text-sm font-medium text-white/90 transition-all duration-200 hover:border-violet-300/70 hover:bg-violet-500/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.12)]"
                >
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-violet-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span>{question}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1020]/80 shadow-neon backdrop-blur-sm">
            <div className="flex min-h-[420px] flex-col">
              <div className="flex-1 space-y-5 p-4 sm:p-6">
                {messages.map((message, index) => (
                  <div
                    key={`${message.sender}-${index}`}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ai' && (
                      <div className="mr-3 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-7 md:text-base ${
                        message.sender === 'user'
                          ? 'border-violet-400/40 bg-gradient-to-r from-blue-400 to-purple-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.2)]'
                          : 'border-white/10 bg-[#0d1325]/90 text-slate-200'
                      }`}
                    >
                     <div className="text-sm leading-6 text-white/90">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <h1 className="text-xl font-bold text-white mb-3">
          {children}
        </h1>
      ),

      h2: ({ children }) => (
        <h2 className="text-lg font-semibold text-white mt-5 mb-2">
          {children}
        </h2>
      ),

      h3: ({ children }) => (
        <h3 className="text-base font-semibold text-white mt-4 mb-2">
          {children}
        </h3>
      ),

      p: ({ children }) => (
        <p className="mb-3">
          {children}
        </p>
      ),

      ul: ({ children }) => (
        <ul className="list-disc pl-5 mb-3 space-y-1">
          {children}
        </ul>
      ),

      ol: ({ children }) => (
        <ol className="list-decimal pl-5 mb-3 space-y-1">
          {children}
        </ol>
      ),

      li: ({ children }) => (
        <li>{children}</li>
      ),

      strong: ({ children }) => (
        <strong className="font-semibold text-white">
          {children}
        </strong>
      ),

      table: ({ children }) => (
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            {children}
          </table>
        </div>
      ),

      th: ({ children }) => (
        <th className="border border-white/20 px-3 py-2 text-left font-semibold bg-white/10">
          {children}
        </th>
      ),

      td: ({ children }) => (
        <td className="border border-white/10 px-3 py-2">
          {children}
        </td>
      ),

      code: ({ children }) => (
        <code className="px-1.5 py-0.5 rounded bg-white/10 text-purple-200">
          {children}
        </code>
      ),
    }}
  >
    {message.text}
  </ReactMarkdown>
</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#0d1325]/90 px-4 py-3 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-violet-300" />
                        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-violet-300 [animation-delay:120ms]" />
                        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-violet-300 [animation-delay:240ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 bg-[#0b1020]/90 p-3 sm:p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-violet-400/30 bg-[#0d1325]/80 px-3 py-2 shadow-[0_0_25px_rgba(99,102,241,0.08)]">
                  <input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                    placeholder="Ask your career question..."
                    className="h-12 flex-1 border-0 bg-transparent px-2 text-sm text-white placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
                  />

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-600 text-white shadow-[0_0_18px_rgba(99,102,241,0.25)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
