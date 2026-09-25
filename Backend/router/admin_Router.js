import express from 'express'
import { 
    allContacts, 
    allFeedbacks, 
    adminLogin, 
    profile, 
    allOwners, 
    allUsers,
    deleteUser,
    deleteOwner 
} from '../controller/admin_Controller.js'

const adminRouter = express.Router()

adminRouter.post("/adminLogin", adminLogin)
adminRouter.get("/adminProfile", profile)
adminRouter.get("/allContacts", allContacts)
adminRouter.get("/allFeedbacks", allFeedbacks)
adminRouter.get("/allOwners", allOwners)
adminRouter.get("/allUsers", allUsers)
adminRouter.delete("/user/:id", deleteUser)
adminRouter.delete("/owner/:id", deleteOwner)

export default adminRouter    