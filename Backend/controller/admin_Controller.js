import mongoose from "mongoose";
import ContactModel from "../model/Contact_Model.js";
// import UserModel from "../model/Feedback_Model.js";
import AdminModel from "../model/Admin_Model.js";
import OwnerModel from "../model/Owner_Model.js"
import FeedbackModel from "../model/Feedback_Model.js";
import UserRegModel from "../model/User_Model.js"



export async function allOwners(request, response) {
  try{
   const ownerDoc = await OwnerModel.find()
   console.log(`All Owners${ownerDoc}`);
   
   response.json({"profileData": ownerDoc})
  }
  catch(err){
    console.log(err);
    
  }
}
export async function allUsers(request, response) {
  try{
   const ownerDoc = await UserRegModel.find()
   console.log(`All Owners${ownerDoc}`);
   
   response.json({"profileData": ownerDoc})
  }
  catch(err){
    console.log(err);
    
  }
}


export async function profile(request, response){
const email = request.query.email
console.log(`Email of Admin is ${email}`);

try{
  const adminDoc = await AdminModel.findOne({email:email})
  response.json({"profileData": adminDoc})


}
catch(err){
  console.log(err);
  
}



}

//admin login code
export async function adminLogin(request, response){
  {
    const loginData = request.body    
    const{email, password} = loginData

    try{
    const adminDoc = await AdminModel.findOne({email:email, password:password})  //left email is on the model

    if(adminDoc!=null){
         response.json({"message": "Login Successfull", "token": email, "status":"success"})
    }
    else{
         response.json({"message": "Invalid Credentials"})
      
    }
    }
     catch(err){
      console.log(err);
      
     }
  }
}

export async function allContacts(request, response){

  try{
      const contactDocs = await ContactModel.find()   //just line select* from contact
      console.log(`All contacts ${contactDocs}`);

      response.json({"ContactDetails": contactDocs})
      
  }
  catch(err){
    console.log(err);
    
  }
  
}

export async function allFeedbacks(request, response) {
  try{
    const feedbackDocs = await FeedbackModel.find()
    console.log(`All feedbacks ${feedbackDocs}`)

    response.json({"FeedbackDetails": feedbackDocs})
    
  }
  catch(err){
    console.log(err);
    
  }
  
}