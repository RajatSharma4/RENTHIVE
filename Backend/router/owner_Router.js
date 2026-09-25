import express from 'express'
import { 
    addProduct, 
    allInvoice, 
    editProfile, 
    myProducts, 
    ownerLogin, 
    ownerRegistration, 
    profile, 
    updateInventory,
    releaseProduct 
} from '../controller/owner_Controller.js'  
import { imageUpload } from '../middleware/imageUpload_Middleware.js'
import { productImageUpload } from '../middleware/productPic_Middleware.js'
import { idUpload } from '../middleware/idPic_Middleware.js'

const ownerRouter = express.Router()

ownerRouter.post("/ownerRegister", imageUpload, ownerRegistration)
ownerRouter.post("/addProduct", productImageUpload, addProduct)
ownerRouter.post("/ownerLogin", ownerLogin)
ownerRouter.get("/ownerProfile", profile)
ownerRouter.get("/myProduct", myProducts)
ownerRouter.post("/updateInventory", idUpload, updateInventory)
ownerRouter.post("/releaseProduct", releaseProduct)
ownerRouter.put("/editProfile", editProfile)
ownerRouter.get("/allInvoice", allInvoice)

export default ownerRouter