import express from 'express'
import { addFeedback, allInvoice, editProfile, profile, setCategory, userLogin, userRegisteration, viewProduct } from '../controller/user_Controller.js'
import { imageUpload } from '../middleware/userPic_Middleware.js'

const userRouter = express.Router()


userRouter.post("/feedback", addFeedback)

userRouter.post("/register",imageUpload, userRegisteration)

userRouter.post("/userLogin", userLogin)

userRouter.get("/userProfile", profile)

userRouter.get("/viewProduct", viewProduct)

userRouter.get("/setCategory", setCategory)

userRouter.put("/editProfile", editProfile)

userRouter.get("/allInvoice", allInvoice)



export default userRouter