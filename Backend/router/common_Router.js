import express from "express"
import { addContact } from "../controller/common_Controller.js"


const commonRouter = express.Router()

commonRouter.post("/contact", addContact)

export default commonRouter