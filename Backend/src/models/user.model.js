const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },

  // isVerified: {
  //   type: Boolean,
  //   default: false
  // }
})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel;