const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


module.exports.authUser = async(req, res, next) =>{

  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      error:"Unauthorized"
    })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id)

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }


    req.user = user
    
    return next()

  }catch(error){
    console.error("Error authenticating user:", error)
    return res.status(401).json({
    error: "Unauthorized"
  })
  }
}