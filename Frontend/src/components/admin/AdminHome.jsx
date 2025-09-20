import React from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/AdminHome.css'

const AdminHome = () => {

  const URL = "http://localhost:4000/admin/adminProfile"

  const navigate = useNavigate()

  const [profile, setProfile] = useState({ name: "", phone: "" })

  const emailId = localStorage.getItem("emailKey")

  const fetchData = async () => {

    if(emailId === null){
      navigate("/adminLogin")
    }
    else{

    try {

      const params = { "email": emailId }

      const serverResponse = await axios.get(URL, { params })
      console.log(serverResponse.data.profileData);
      setProfile(serverResponse.data.profileData) //to set value in profile object


    }
    catch (err) {
      console.log(err);

    }
  }
  }  //fetchdata close

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <>
      <AdminHeader />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card-uiverse text-center">
          <div className="bg-uiverse">

            <div className='pt-5'>
              <p> <strong>Name:</strong> {profile.name}</p>
              <p> <strong>Phone:</strong> {profile.phone}</p>
            </div>

          </div>
          <div className="blob-uiverse">
          </div>
        </div>


      </div>
    </>
  )
}

export default AdminHome
