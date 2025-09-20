import React from 'react'
import OwnerHeader from './OwnerHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/OwnerHome.css'

const OwnerHome = () => {

   const URL = "http://localhost:4000/owner/ownerProfile"
   const navigate = useNavigate()

    const [profile, setProfile] = useState({ fullname: "", city: "", address: "", phone: "", pic: "" })

    const emailId = localStorage.getItem("emailKey")


     const fetchData = async () => {

      if(emailId === null){
        navigate("/ownerLogin")
      }
      else{
 
        try {

            const params = { "email": emailId }

            const serverResponse = await axios.get(URL, { params })
            console.log(serverResponse.data.profileData);
            setProfile(serverResponse.data.profileData) //to set value in profile object

            localStorage.setItem("owner", JSON.stringify(serverResponse.data.profileData))


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

  <OwnerHeader/>
  
  
          <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card-uiverse text-center">
        <div className="bg-uiverse">
            <img src={`http://localhost:4000/profilePics/${profile.pic}`} alt="" height={200} width={270} />  
            <div className='pt-2'>
               <p> <strong>FullName:</strong> {profile.fullname}</p>
             <p> <strong>Phone:</strong> {profile.phone}</p>
             <p> <strong>City:</strong> {profile.city}</p>
             <p> <strong>Address:</strong> {profile.address}</p>
            </div>
        </div>  
        <div className="blob-uiverse">    
        </div>
      </div>

    </div>
  </>
  )
}

export default OwnerHome
