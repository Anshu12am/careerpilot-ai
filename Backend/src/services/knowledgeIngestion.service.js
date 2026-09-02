const fs = require('fs');
const path = require('path');
const index = require("./embedding.service");

const readKnowledgeFile = (filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);

  const content = fs.readFileSync(fullPath, "utf-8");

  return content;
} 

const chunkText = (text, chunkSize = 300) =>{
  const words = text.split(/\s+/);
  const chunks = [];
  
  for(let i =0;i<words.length;i+=chunkSize){
    chunks.push(words.slice(i,i+chunkSize).join(" "));
  }

  return chunks;
}


const ingestKnowledgeFile = async(filePath, documentId) => {
  const text = readKnowledgeFile(filePath);
  const chunks = chunkText(text);

  const records = chunks.map((chunk, index) => ({
    id: `${documentId}-${index}`,
    text: chunk,
  }))

  await index.namespace("career").upsertRecords({records});
}


const getAllKnowledgeFiles = (directory) => {
  const fullPath = path.join(__dirname, "..", directory);
  
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  let files = [];

  for(const entry of entries){
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getAllKnowledgeFiles(entryPath));
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files;
}


module.exports = {
  readKnowledgeFile,
  chunkText,
  ingestKnowledgeFile,
  getAllKnowledgeFiles,

}