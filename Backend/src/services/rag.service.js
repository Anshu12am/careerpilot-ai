const index = require("./embedding.service");

module.exports.addCareerKnowledge  = async () => {
const records = [
  {
      id: "mern-001",
      text: "MERN stack consists of MongoDB, Express.js, React and Node.js. MongoDB is commonly used as the database, Express.js and Node.js handle backend APIs, and React is used to build the frontend."
    },
    {
      id: "mern-002",
      text: "For a MERN developer internship, important topics include JavaScript fundamentals, React, REST APIs, Node.js, Express.js, MongoDB, authentication, Git and deployment."
    },
    {
      id: "resume-001",
      text: "A good technical resume should clearly show skills, projects, technologies used, measurable achievements where possible, GitHub links and relevant experience."
    },
    {
      id: "interview-001",
      text: "MERN interviews commonly cover JavaScript fundamentals, React components and hooks, REST APIs, Express middleware, MongoDB queries, authentication using JWT and basic deployment concepts."
    }
];

await index.namespace("career").upsertRecords({records});

console.log("Career knowledge records added to Pinecone index.");
};


module.exports.searchCareerKnowledge = async (query) => {
  try{
    const result = await index.namespace("career").searchRecords({
      query:{
        topK: 3,
        inputs:{
          text: query
        }
      }
    });
    return result
  }catch(error){
    console.error("Pinecone search error:", error);
    throw error;
  }
}
