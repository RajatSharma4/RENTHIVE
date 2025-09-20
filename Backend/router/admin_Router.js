import express from 'express'
import {allContacts, allFeedbacks, adminLogin, profile, allOwners, allUsers} from '../controller/admin_Controller.js'


const adminRouter = express.Router()

adminRouter.get("/allContacts", allContacts)

adminRouter.get("/allFeedbacks", allFeedbacks)

adminRouter.post("/adminLogin", adminLogin)

adminRouter.get("/adminProfile", profile)

adminRouter.get("/allOwners", allOwners)

adminRouter.get("/allUsers", allUsers)


export  default adminRouter    