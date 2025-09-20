import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserHeader from './UserHeader'
import '../../css/UserHome.css'


const UserHome = () => {

    const URL = "http://localhost:4000/user/userProfile"
    const navigate = useNavigate() 

    const [profile, setProfile] = useState({ name: "", city: "", address: "", phone: "", pic: "" })

    const emailId = localStorage.getItem("emailKey")

    const fetchData = async () => {

        if (emailId === null) {
            navigate("/userLogin")
        }

        else {

            try {

                const params = { "email": emailId }

                const serverResponse = await axios.get(URL, { params })
                console.log(serverResponse.data.profileData);
                setProfile(serverResponse.data.profileData) //to set value in profile object

                localStorage.setItem("user", JSON.stringify(serverResponse.data.profileData))


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
            <UserHeader />


            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card-uiverse text-center">
                    <div className="bg-uiverse">
                        <img src={`http://localhost:4000/userPics/${profile.pic}`} alt="" height={200} width={270} />
                        <div className='pt-2'>
                            <p> <strong>Name:</strong> {profile.name}</p>
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

export default UserHome
