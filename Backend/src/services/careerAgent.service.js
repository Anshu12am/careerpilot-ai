const Resume = require('../models/resume.model');
const groq = require('../services/groq.service');
const { searchCareerKnowledge } = require('./rag.service');
const CareerAgentMessage = require('../models/careerAgent.model');


module.exports.askCareerAgentService = async (userId,resumeId, question) => {

  if (!question || !question.trim()) {
  throw new Error("Career question is required.");
}

if (question.length > 1000) {
  throw new Error("Question is too long.");
}


const resume = await Resume.findOne({_id:resumeId,userId})

if (!resume) {
  throw new Error("Selected resume not found.");
}

console.log(
  JSON.stringify(resume.resumeData, null, 2)
);


const ragResult = await searchCareerKnowledge(question);

const hits = ragResult?.result?.hits || [];

const relevantHits = hits.filter((hit) => hit._score >= 0.5).slice(0, 3);

const careerKnowledge =  relevantHits
    .map((hit, index) => {
      return `
Knowledge ${index + 1}:
${hit.fields.text}
`;
    })
    .join("\n");


  const resumeContext = {
  personalInfo: resume.resumeData?.PersonalInfo,
  education: resume.resumeData?.education,
  experience: resume.resumeData?.experience,
  skills: resume.resumeData?.skills,
  projects: resume.resumeData?.projects,
};

console.log("\n========== RESUME DEBUG ==========");

for (const [key, value] of Object.entries(resumeContext)) {
  const jsonValue = JSON.stringify(value);

  console.log(
    `${key}: ${jsonValue ? jsonValue.length : 0} characters`
  );
}

console.log(
  "Original resumeData:",
  JSON.stringify(resume.resumeData).length,
  "characters"
);

console.log(
  "Selected resumeContext:",
  JSON.stringify(resumeContext).length,
  "characters"
);

console.log("==================================\n");

const prompt = `
You are an AI Career Agent.
Use the user's resume information to give personalized career advice.

Resume:${JSON.stringify(resumeContext)}

Relevant career knowledge:${careerKnowledge || "No highly relevant career knowledge was found."}

User Question: ${question}

Instructions:
- Answer the user's actual question directly.
- Use the selected resume for personalization.
- Do not invent information.
- If the requested information exists in the resume, answer from it.
- If it does not exist, clearly say that it is not present.
- Use career knowledge only when relevant.
- Do not use tables unless the user explicitly asks for a table.
- Keep the answer concise and readable.
`;

console.log("Resume context length:", JSON.stringify(resume.resumeData).length);
console.log("Career knowledge length:", careerKnowledge.length);
console.log("Question length:", question.length);
console.log("Total prompt length:", prompt.length);

const completion = await groq.chat.completions.create({
  model: 'openai/gpt-oss-20b',
  messages: [{ role: 'user', content: prompt }],
  temperature: 0.3,
})


const answer = completion?.choices[0]?.message?.content;

if (!answer) {
  throw new Error("AI failed to generate a response.");
}

await CareerAgentMessage.create({
  userId,
  resumeId,
  sender: "user",
  text: question,
})

await CareerAgentMessage.create({
  userId,
  resumeId,
  sender: "ai",
  text: answer,
});

 return {
    answer,
    resumeId: resume._id,
  };
}


module.exports.getCareerAgentMessages = async(userId,resumeId)=>{
  const messages = await CareerAgentMessage.find({userId,resumeId}).sort({ createdAt: 1 }
  )

  return messages;
}

module.exports.createCareerAgentMessage = async(userId,resumeId,sender,text)=>{


   if (!text || !text.trim()) {
    throw new Error("Message text is required.");
  }

  const message = await CareerAgentMessage.create({
    userId,
    resumeId,
    sender,
    text:text.trim()
  });

  return message;
}