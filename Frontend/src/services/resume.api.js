import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
   withCredentials: true,
})



export async function createResume({resumeData, title, atsAnalysis}) {
  try {
    const response = await api.post('/api/resume/create', {
      resumeData,
      title,
      atsAnalysis
    });
    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error;
  }
};

export async function getAllResumes() {
  try{
    const response = await api.get('/api/resume/get');
    return response.data;
  }catch(error){
    console.error("Error fetching resumes:", error);
    throw error;
  }
}

export async function getResumeById(id){
  try{
    const response = await api.get(`/api/resume/get/${id}`);
    return response.data;
  }catch(error){
    console.error("Error fetching resume by ID:", error);
    throw error;
  }
}


export async function updateResumeById(id, {resumeData, title, atsAnalysis}){
  try{
    const response = await api.put(`/api/resume/update/${id}`,{
      resumeData,
      title,
      atsAnalysis
    })
    return response.data;
  }catch(error){
    console.error("Error updating resume:", error);
    throw error;
  }
}

export async function deleteResume(id) {
  try {
    const response = await api.delete(`/api/resume/delete/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
}