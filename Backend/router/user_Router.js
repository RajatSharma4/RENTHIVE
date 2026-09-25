import express from 'express'
import { 
    addFeedback, 
    allInvoice, 
    editProfile, 
    Logout, 
    profile, 
    setCategory, 
    userLogin, 
    userRegisteration, 
    viewProduct,
    bookProduct
} from '../controller/user_Controller.js'
import { imageUpload } from '../middleware/userPic_Middleware.js'

const userRouter = express.Router()

userRouter.post("/register", imageUpload, userRegisteration)
userRouter.post("/userLogin", userLogin)
userRouter.get("/userProfile", profile)
userRouter.get("/viewProduct", viewProduct)
userRouter.get("/setCategory", setCategory)
userRouter.put("/editProfile", editProfile)
userRouter.post("/feedback", addFeedback)
userRouter.get("/allInvoice", allInvoice)
userRouter.post("/book", bookProduct)
userRouter.get("/logout", Logout)

export default userRouter