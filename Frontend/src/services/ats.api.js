import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
   withCredentials: true,
})



export const analyzeATS = async(resume, jobDescription)=>{
  try{
  const response = await api.post('/api/ats/analyze',{
    resume,
    jobDescription
  });

  return response.data;
}catch(error){
  console.error("ATS Analysis Error:", error);
  throw error;
}
}