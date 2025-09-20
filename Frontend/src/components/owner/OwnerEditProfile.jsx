import React from 'react'
import OwnerHeader from './OwnerHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/OwnerHome.css'

const OwnerEditProfile = () => {

  const storedData = JSON.parse(localStorage.getItem("owner"))

  const URL = "http://localhost:4000/owner/editProfile"
  const navigate = useNavigate()

  const [oldData, setOldData] = useState({ fullname: storedData.fullname, city: storedData.city, address: storedData.address, phone: storedData.phone })

  const emailId = localStorage.getItem("emailKey")

  const getData = (e) => {
    setOldData({ ...oldData, [e.target.name]: e.target.value })
  }



  const submitData = async (e) => {

    e.preventDefault()

    try {

      const params = { "email": emailId }

      const serverResponse = await axios.put(URL, oldData, { params })

      // console.log(serverResponse);

      const serverMsg = serverResponse.data.updateStatus.acknowledged
      console.log(serverMsg);

      if (serverMsg === true) {
        // alert("profile updated succesfully")
        navigate("/ownerHome")
      }


    }
    catch (err) {
      console.log(err);

    }

  }



  return (
    <>

      <OwnerHeader />


      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card-uiverse text-center">
          <div className="bg-uiverse">
            <form onSubmit={submitData}>
              {/* <img src={`http://localhost:4000/profilePics/${oldData.pic}`} alt="" height={200} width={270} /> */}
              <div className='pt-2'>
                <p> <strong>FullName:</strong> <input className='form-control' type="text" name='fullname' value={oldData.fullname} onChange={getData} required /></p>
                <p> <strong>Phone:</strong> <input className='form-control' type="number" name='phone' value={oldData.phone} onChange={getData} required /></p>
                <p> <strong>City:</strong> <input className='form-control' type="text" name='city' value={oldData.city} onChange={getData} required /></p>
                <p> <strong>Address:</strong> <input className='form-control' type="text" name="address" value={oldData.address} onChange={getData} required /></p>

                <div className='text-center'>
                  <button className='btn btn-danger' type='submit'>Edit Profile</button>
                </div>

              </div>
            </form>
          </div>
          <div className="blob-uiverse">
          </div>
        </div>

      </div>
    </>
  )
}

export default OwnerEditProfile
