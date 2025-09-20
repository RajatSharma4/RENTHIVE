import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'

const AllOwners = () => {

    const [profile, setProfile] = useState([])
    const URL = "http://localhost:4000/admin/allOwners"


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
            return (
            <>
                <AdminHeader />
                <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
                    <div className="row">
                        {profile.map((owner, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card-uiverse text-center">
                                    <div className="bg-uiverse">
                                        <img
                                            src={`http://localhost:4000/profilePics/${owner.pic}`}
                                            alt={owner.fullname}
                                            height={200}
                                            width={270}
                                        />
                                        <div className='pt-2'>
                                            <p><strong>FullName:</strong> {owner.fullname}</p>
                                            <p><strong>Phone:</strong> {owner.phone}</p>
                                            <p><strong>City:</strong> {owner.city}</p>
                                            <p><strong>Address:</strong> {owner.address}</p>
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

        </>
    )
}

export default AllOwners
