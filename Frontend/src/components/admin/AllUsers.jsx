import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'

const AllUsers = () => {

     const [profile, setProfile] = useState([])
    const URL = "http://localhost:4000/admin/allUsers"


    const fetchData = async () => {
        try {
            const serverResponse = await axios.get(URL)
            console.log(serverResponse)
            setProfile(serverResponse.data.profileData)
        }
        catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <>
     <AdminHeader />
                <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
                    <div className="row">
                        {profile.map((user, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card-uiverse text-center">
                                    <div className="bg-uiverse">
                                        <img
                                            src={`http://localhost:4000/userPics/${user.pic}`}
                                            alt={user.fullname}
                                            height={200}
                                            width={270}
                                        />
                                        <div className='pt-2'>
                                            <p><strong>FullName:</strong> {user.name}</p>
                                            <p><strong>Phone:</strong> {user.phone}</p>
                                            <p><strong>City:</strong> {user.city}</p>
                                            <p><strong>Address:</strong> {user.address}</p>
                                        </div>
                                    </div>
                                    <div className="blob-uiverse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    </>
  )
}

export default AllUsers
