const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

authRouter.post("/register",authController.register)

authRouter.post("/login",authController.login)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

// authRouter.post("/verify-otp",authController.verifyOTP)

authRouter.post("/logout",authController.logout)



module.exports = authRouter;