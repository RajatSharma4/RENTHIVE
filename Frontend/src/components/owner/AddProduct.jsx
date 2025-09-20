import React, { useState, useRef } from 'react'
import axios from 'axios'
import OwnerHeader from './OwnerHeader'
import '../../css/AddProduct.css'
import Swal from 'sweetalert2'



function AddProduct() {

  const fileInputRef = useRef(null)


  const URL = "http://localhost:4000/owner/addProduct"

  const owner = JSON.parse(localStorage.getItem("owner"));
  const ownerId = owner._id;



  const [productData, setProductData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: "",
  })
  const [pic, setPic] = useState(null)



  const fetchData = (e) => {
    const { name, value, type, files } = e.target; //destructuring target object

    if (type === "file") {
      console.log(files[0]);
      setPic(files[0]);

    }
    else {
      setProductData({ ...productData, [name]: value })
    }

  }; //fetch data close

  const submitData = async (e) => {

    e.preventDefault()

    //setting all data in formData object
    const formData = new FormData();

    for (const key in productData) {
      formData.append(key, productData[key]) //to set all value from object
    }
    formData.append("owner", ownerId)

    if (pic) {
      formData.append("pic", pic);
    }



    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);

    }


    try {

      const serverResponse = await axios.post(URL, formData)
      console.log(serverResponse);

      // alert(serverResponse.data.message)

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Added Successfull",
        showConfirmButton: false,
        timer: 1500
      });

      setProductData({
        productName: "",
        productCategory: "",
        productDescription: "",
        productPrice: "",
      })
      setPic(null)
      fileInputRef.current.value = null;   //it is use to clear file field 



    }
    catch (err) {
      console.log(err);

    }

  }  //submit data close


  return (
    <>
      <div>
        <div className='d-flex flex-column min-vh-100'>
          <OwnerHeader />
          <main className='flex-fill d-flex justify-content-center'>


            <div className='d-flex flex-wrap flex-md-nowrap' style={{ gap: "5vw" }}>

              <div className='my-auto mx-auto mt-5 mt-md-auto'>
                <div className='d-flex flex-column flex-wrap mt-5 mt-md-0 text-center'>
                  <h2 className="fw-bold display-6">Showcase Premium Listings</h2>
                  <p className="text-muted fs-5">
                    Unlock the spotlight for your high-end property or product. <br />
                    List with RentHive and attract quality renters who value luxury and reliability.
                  </p>
                  <ul className="list-unstyled fs-6">
                    <li>✔️ Verified, High-Intent Tenants</li>
                    <li>✔️ Enhanced Visibility for Premium Spaces</li>
                    <li>✔️ Easy, Secure Listing Management</li>
                  </ul>
                </div>
              </div>


              <div>
                <div className="container2 ">
                  <div className="heading">Add Products</div>
                  <form className="form2" onSubmit={submitData}>
                    <input className="input" type="productName" name="productName" value={productData.productName} onChange={fetchData} id="productName" placeholder="ProductName" required />

                    <select className='input itemSelect form-control' value={productData.productCategory} name="productCategory" id="" onChange={fetchData}>
                      <option className='text-secondary' value="" disabled>--Select Category--</option>
                      <option value="electronics">Electronics</option>
                      <option value="furniture">Furniture</option>
                    </select>

                    <textarea className='input' name="productDescription" id="productDescription" placeholder='ProductDescription' value={productData.productDescription} onChange={fetchData}  ></textarea>

                    <input className="input" type="number" name="productPrice" id="productPrice" value={productData.productPrice} onChange={fetchData} placeholder="RentPrice" required />

                    <label htmlFor="file">Upload Pic</label>
                    <input className='input' type="file" ref={fileInputRef} id='file' name='pic' onChange={fetchData} accept='images/*,application/pdf' placeholder='Upload Image or Document' required />


                    <input className="login-button" type="submit" value="Submit" />

                  </form>

                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}

export default AddProduct
