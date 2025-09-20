import mongoose from "mongoose"
import OwnerModel from "../model/Owner_Model.js"
import ProductModel from "../model/Product_Model.js"
import InventoryModel from "../model/Inventory_Model.js";




//.........all Invoices..........
export async function allInvoice(request, response){
  try{
  const invoiceDoc = await InventoryModel.find()
  console.log(`All Invoices ${invoiceDoc}`);

  response.json({"InvoiceDetail": invoiceDoc})
  
  }
  catch(err){
    console.log(err);
    
  }
}



//........Edit owner Profile.........
export async function editProfile(request, response) {
  const newData = request.body

  const email = request.query.email

  try {
    const { fullname, phone, city, address } = newData
    const filterCondition = { email: email }

    const modifiedData = {
      $set:
      {
        fullname: fullname,
        phone: phone,
        city: city,
        address: address
      }
    }

    const status = await OwnerModel.updateOne(filterCondition, modifiedData)
    console.log(`status is ${status}`);
    

   response.json({"updateStatus":status})

  }
  catch (err) {
    console.log(err);

  }

}




export async function updateInventory(request, response) {

  const inventoryUpdateData = request.body;
  const product = request.query.pid
  console.log(product);
  

  const {userPhone, ownerEmail, duration, returnDate, idProof, rentedDate } = inventoryUpdateData;

  const idPic = request.file.filename;

  console.log(`Id pic is ${idPic}`);

  try {

    const newDoc = new InventoryModel({
     product:product, userPhone, ownerEmail, duration, returnDate,idProof:idPic, rentedDate

    });

    await newDoc.save();

    response.json({ message: "Inventory Updated" });
  }
  catch (err) {
    console.error(err);
  }

}





export async function myProducts(request, response) {


  try {
    const email = request.query.email

    const ownerDoc = await OwnerModel.findOne({ email });
    // const productDoc = await ProductModel.findOne({ email: email })
    const productDoc = await ProductModel.find({ owner: ownerDoc._id })

    response.json({ "objectData": productDoc })
  }
  catch (err) {
    console.log(err);

  }

}  




export async function profile(request, response) {
  const email = request.query.email
  console.log(`Email of user is ${email}`)

  try {
    const UserDoc = await OwnerModel.findOne({ email: email })
    response.json({ "profileData": UserDoc })
  }
  catch (err) {
    console.log(err);

  }

}


//.............ownerLogin function.........
export async function ownerLogin(request, response) {

  const loginData = request.body
  const { email, password } = loginData

  try {
    const ownerLoginDoc = await OwnerModel.findOne({ email: email, password: password })  //left email is on the model

    if (ownerLoginDoc != null) {
      response.json({ "message": "Login Successfull", "token": email, "status": "success" })
    }
    else {
      response.json({ "message": "Invalid Credentials" })

    }
  }
  catch (err) {
    console.log(err);
  }
}


export async function ownerRegistration(request, response) {

  const registrationData = request.body

  const { email, password, fullname, phone, city, address } = registrationData


  const pic = request.file.filename

  console.log(`picname is ${pic}`);

  try {
    const regDOc = new OwnerModel({ email, password, fullname, phone, city, address, pic })
    await regDOc.save()

    response.json({ "message": "Registration done" })

  }
  catch (err) {

  }

}


export async function addProduct(request, response) {
  const productData = request.body;

  const { owner, productName, productCategory, productDescription, productPrice } = productData;

  const productPic = request.file.filename;

  console.log(`product pic is ${productPic}`);

  try {
    const newDoc = new ProductModel({
      owner,
      productName,
      productCategory,
      productDescription,
      productPrice,
      productPic,
      productStatus: 'available'

    });

    await newDoc.save();

    response.json({ message: "Product added successfull" });
  }
  catch (err) {
    console.error(err);
  }
}