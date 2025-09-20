import mongoose from "mongoose";
import ContactModel from "../model/Contact_Model.js";


export async function addContact(request,response){
   const contactObject = request.body

const{firstname, lastname, email, phone,message} = contactObject  //object destructuring 



// console.log(`FirstName is ${firstname}`);
// console.log(`LastName is ${lastname}`);
// console.log(`Email is ${email}`);
// console.log(`Phone is ${phone}`);


//--------------data insertion in contact collection -------------

try{

   const contactDoc = new ContactModel({firstname, lastname, email, phone,message})
   await contactDoc.save()
   console.log("Contact added");
   
   response.json({"message": "Contact added successfully"})
  
}
catch(err){
   console.log(err);
   
}


   
   
}

