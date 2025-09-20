import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserHeader from './UserHeader'
import '../../css/UserHome.css'


const UserEditProfile = () => {

    const storedData = JSON.parse(localStorage.getItem("user"))

    const URL = "http://localhost:4000/user/editProfile"
    const navigate = useNavigate()

    const [oldData, setOldData] = useState({ name: storedData.name, city: storedData.city, address: storedData.address, phone: storedData.phone })

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
                navigate("/userHome")
            }


        }
        catch (err) {
            console.log(err);

        }

    }


    return (
        <>
            <UserHeader />


            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card-uiverse text-center">
                    <div className="bg-uiverse">

                        <form onSubmit={submitData}>
                            <div className='pt-2'>
                                <p> <strong>Name:</strong> <input className='form-control' type="text" name='name' value={oldData.name} onChange={getData} required /></p>
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

export default UserEditProfile
