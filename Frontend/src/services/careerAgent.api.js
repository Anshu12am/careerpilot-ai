import axios from "axios";

const api = axios.create({
  baseURL: "http://13.60.166.0:3000",
  timeout: 120000,
   withCredentials: true,
})



export async function askCareerAgent({ question,resumeId }) {
 try{
  const response = await api.post('/api/career-agent/ask',{
    question,
    resumeId
  })

  return response.data;
 }catch(error){
  console.error("Career Agent API error:", error.response?.data || error.message);
    throw error;
 }
}

export async function getCareerAgentMessages(resumeId) {
  try{

    const response = await api.get(`/api/career-agent/messages/${resumeId}`);

    return response.data;
  }catch(error){
    console.error(
      "Error fetching Career Agent messages:",
      error
    );

    throw error;
  }
}


export async function createCareerAgentMessage({resumeId,sender,text}){
  try{
    const response = await api.post('/api/career-agent/message',{
       resumeId,
      sender,
      text
    })
    return response.data;
  }catch(error){
    console.error("Error saving Career Agent message:", error);
    throw error;
  }
}