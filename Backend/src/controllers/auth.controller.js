const userModel = require("../models/user.model")
// const OTP = require("../models/otp.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const {sendOTPEmail} = require("../../config/email")


// const generateOTP = () =>{
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }


module.exports.register = async (req, res) =>{

  const { email, password, confirmPassword } = req.body

  if( !email || !password || !confirmPassword ){
   return res.status(400).json({
      message:"All fields are required"
    })
  }

  if(password !== confirmPassword){
    return res.status(400).json({
      message:"Passwords do not match"
    })
  }

  const isUserExist = await userModel.findOne({
    email
  })
  if(isUserExist){
    
    return res.status(400).json({
      message: "User already exists"
    })

  }

  // unverified user delete
  // await userModel.deleteOne({ email })
  


  const hashedPassword = await bcrypt.hash(password,10)

  const user = await userModel.create({
    email,
    password:hashedPassword,
    // isVerified:false
  })

  const token = jwt.sign({
    _id:user._id
  },process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });


  // await OTP.deleteMany({ email })

  // const otp = generateOTP()

  // await OTP.create({
  //   email,
  //   otp,
  //   expiresAt: new Date(Date.now() + 5 * 60 * 1000) 
  // })

  // await sendOTPEmail(user.email, otp);

  return res.status(201).json({
    message: "Registration successful",
    user: {
      _id: user._id,
      email: user.email
    }
  });


}


module.exports.login = async (req, res) => {

  const { email, password } = req.body
  
  const user = await userModel.findOne({
    email
  })

  if(!user){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  // if (!user.isVerified) {
  //     return res.status(403).json({
  //       message: "Please verify your email first"
  //     })
  //   }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const token = jwt.sign({
    _id:user._id
  },process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });


  // await OTP.deleteMany({ email })


  // const otp = generateOTP()
  //  await OTP.create({
  //   email,
  //   otp,
  //   expiresAt: Date.now() + 5 * 60 * 1000
  // });


  // await sendOTPEmail(user.email, otp);

 return res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      email: user.email
    }
  });


}


module.exports.getMe = async (req,res) =>{
  const user = await userModel.findById(req.user._id)
  res.status(200).json({
    message:"User fetched successfully",
    user:{
      id:user._id,
      email:user.email
    }
  })
}


// module.exports.verifyOTP = async (req, res) => {
//   const { email, otp } = req.body
//   const cleanOtp = otp.toString().trim()

 
//   const record = await OTP.findOne({
//     email,
//     otp: cleanOtp
//   })


//   if (!record) {
//     return res.status(400).json({ message: "Invalid OTP" })
//   }

//   if (record.expiresAt < Date.now()) {
//     return res.status(400).json({ message: "OTP has expired" })
//   }

//   const user = await userModel.findOne({ 
//     email
//   })
//   user.isVerified = true;
//   await user.save()


//   //Delete otp
//   await OTP.deleteMany({ email })


//   const token = jwt.sign({
//     _id:user._id
//   },process.env.JWT_SECRET)


//   res.status(200).json({
//     message:"Login successful",
//     token,
//     user:{
//       _id:user._id,
//       email:user.email
//     }
//   })

// }

module.exports.logout = async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return res.status(200).json({
    message: "Logged out successfully"
  });
}




