import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../../css/UpdateInventory.css'

 
const UpdateInventory = () => {
  const fileInputRef = useRef(null)

  // const product = JSON.parse(localStorage.getItem("product"));
  // const productId = product._id;


  const locationRef = useLocation()

  const { productInfo } = locationRef.state
  const ownerEmail=localStorage.getItem("emailKey")


  const [inventoryData, setInventoryData] = useState({
    userPhone: "",
    ownerEmail: ownerEmail,
    duration: "",
    returnDate: "",
    idProof: "",
    rentedDate: ""
  })

  const [idProof, setIdProof] = useState(null)



  function fetchData(e) {
    const { name, value, type, files } = e.target; //destructuring target object

    if (type === "file") {
      console.log(files[0]);
      setIdProof(files[0]);
      
    }
    else {
      setInventoryData({ ...inventoryData, [name]: value })
    }
  }

  async function submitData(e) {
    e.preventDefault()

    const formData = new FormData();

    for(const key in inventoryData){
      formData.append(key, inventoryData[key]) //to set all value from object
  }
  formData.append("product", productInfo._id)

    if (idProof) {
      formData.append("idProof", idProof);
    }

    for(let [key, value] of formData.entries()){
      console.log(`${key}:`, value);
      
  }

  const URL = "http://localhost:4000/owner/updateInventory"


    try {
      const params={pid:productInfo._id}
      const serverResponse = await axios.post(URL, formData,{params})
      console.log(serverResponse.data.message);


      Swal.fire({
        position: "top-end",
        icon: "success",
        title: serverResponse.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      setInventoryData({
        userPhone: "",
        ownerEmail: ownerEmail,
        duration: "",
        returnDate: "",
        idProof: "",
        rentedDate: ""
      })

      setIdProof(null)
      fileInputRef.current.value = null;

    }
    catch (err) {
      console.log(err);

    }

  }

  return (
    <>
      <div className='bg-dark min-vh-100'>
        <h1 className='text-success text-center'>UPDATE YOUR INVENTORY</h1>
        {/* <h1>ProductId is: {productInfo._id}</h1> */}

        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
          <form className="inventory-form" onSubmit={submitData}>
            <span className="input-span">
              <label htmlFor="userPhone" className="label">UserPhone</label>
              <input type="number" name="userPhone" id="userPhone" onChange={fetchData} value={inventoryData.userPhone} /></span>

            <span className="input-span">
              <label htmlFor="ownerEmail" className="label">OwnerEmail</label>
              <input type="email" name="ownerEmail" id="email" onChange={fetchData} value={inventoryData.ownerEmail} /></span>

            <span className="input-span">
              <label htmlFor="duration" className="label">Duration In Days</label>
              <input type="number" name="duration" id="duration" onChange={fetchData} value={inventoryData.duration}/></span>

            <span className="input-span">
              <label htmlFor="returnDate" className="label">ReturnDate</label>
              <input type="date" name="returnDate" id="returnDate" onChange={fetchData} value={inventoryData.returnDate} /></span>

            <span className="input-span">
              <label htmlFor="idProof" className="label">IdProof</label>
              <input type="file" name="idProof" id="file" accept='image/*,application/pdf' onChange={fetchData} ref={fileInputRef} /></span>

            <span className="input-span">
              <label htmlFor="rentedDate" className="label">RentedDate</label>
              <input type="date" name="rentedDate" id="rentedDate" onChange={fetchData} value={inventoryData.rentedDate}/></span>
            {/* <input className="submit" type="submit" defaultValue="Log in" /> */}
            <button className='submit' type='submit'>Submit </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateInventory
