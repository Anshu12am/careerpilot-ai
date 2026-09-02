require("dotenv").config();
const {
  getAllKnowledgeFiles,
  ingestKnowledgeFile,
} = require("./services/knowledgeIngestion.service");

const seed = async () => {
  try {
    const files = getAllKnowledgeFiles("knowledge");

    console.log("Knowledge files found:", files);

    for (const file of files) {
      const documentId = file
        .replace(/^knowledge[\\/]/, "")
        .replace(/[\\/]/g, "-")
        .replace(".md", "");

      console.log(`Ingesting: ${file}`);

      await ingestKnowledgeFile(file, documentId);
    }

    console.log("All knowledge files ingested successfully");
  } catch (error) {
    console.error("Knowledge ingestion failed:", error);
  }
};

seed();