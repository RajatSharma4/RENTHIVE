import express from "express"
import commonRouter from "./router/common_Router.js";
import cors from "cors"
import { dbConnect } from "./database/dbInfo.js";
import userRouter from "./router/user_Router.js";
import adminRouter from "./router/admin_Router.js"
import ownerRouter from "./router/owner_Router.js";
import 'dotenv/config'


const serverApp = express()

const PORT = process.env.PORT || 4000

//database connection function calling here
dbConnect()

serverApp.use(cors()) //for communicating with front end (React)
serverApp.use(express.json())
serverApp.use(express.static("public")) //to tell the server that all docs

serverApp.use("/", commonRouter)
serverApp.use("/user", userRouter)
serverApp.use("/admin", adminRouter)
serverApp.use("/owner", ownerRouter)

// serverApp.use("/owner", ownerRouter)


serverApp.listen(PORT, ()=>{
    console.log(`server on http://localhost:${PORT}`);
    
})

