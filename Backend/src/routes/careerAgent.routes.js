const express = require("express")
const careerAgentRouter = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const careerAgentController = require("../controllers/careerAgent.controller")

careerAgentRouter.post("/message",authMiddleware.authUser,careerAgentController.createCareerAgentMessage);

careerAgentRouter.post("/ask",authMiddleware.authUser,careerAgentController.askCareerAgent);

careerAgentRouter.get("/messages/:resumeId",authMiddleware.authUser,careerAgentController.getCareerAgentMessages);

module.exports = careerAgentRouter;