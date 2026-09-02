import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
   withCredentials: true,
})



export async function generateCoverLetter({
  jobRole,
  companyName,
  tone,
  resumeId,
}){
  try{
    const response = await api.post("/api/coverLetter/generate",{  jobRole,
  companyName,
  tone,
  resumeId,
    });

    return response.data;
  }catch(error){
    console.error("Error generating Cover letter",error);
    throw error;
  }
}

export async function getAllCoverLetters(){
   try{
    const response = await api.get('/api/coverLetter/get');
    return response.data;
  }catch(error){
    console.error("Error fetching cover letters:", error);
    throw error;
  }
}

export async function getCoverLetterById(id){
  try{
    const response = await api.get(`/api/coverLetter/get/${id}`);
    return response.data;
  }catch(error){
    console.error("Error fetching cover letter by ID:", error);
    throw error;
  }
}

export async function deleteCoverLetter(id) {
  try {
    const response = await api.delete(`/api/coverLetter/delete/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting cover letter:", error);
    throw error;
  }
}