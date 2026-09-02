const { askCareerAgentService,getCareerAgentMessages,createCareerAgentMessage } = require("../services/careerAgent.service");

module.exports.askCareerAgent = async (req, res) =>{

  try{
    const { question, resumeId } = req.body;

    if(!question){
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }


    if (!resumeId) {
      return res.status(400).json({
      success: false,
      message: "Resume selection is required.",
  });
}

    const result = await askCareerAgentService(req.user._id, resumeId,question);
    
     return res.status(200).json({
      success: true,
      message: "Career Agent response generated successfully.",
      data: result,
    });
  }catch(error){
    console.error("Career Agent Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports.getCareerAgentMessages = async(req,res)=>{
  try{
    const { resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required.",
      });
    }

    const messages = await getCareerAgentMessages(req.user._id,resumeId);

    return res.status(200).json({
      success: true,
      data: messages,
    });
  }catch(error){
    console.error("Get Career Agent Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports.createCareerAgentMessage = async(req,res)=>{
  try{
    const { resumeId, sender, text } = req.body;

    if (!resumeId || !sender || !text) {
      return res.status(400).json({
        success: false,
        message: "resumeId, sender and text are required."
      });
    }
    
    const result = await createCareerAgentMessage(req.user._id,resumeId,sender,text);

     return res.status(201).json({
      success: true,
      message: "Career Agent message saved successfully.",
      data: result,
    });
  }catch (error) {
    console.error("Create Career Agent Message Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}