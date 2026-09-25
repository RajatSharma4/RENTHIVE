import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import UserHeader from './UserHeader'
import apiClient from '../../api/apiClient'
import { getImageUrl } from '../../utils/imageHelper'
import { useAuth } from '../../context/AuthContext'
import '../../css/UserHome.css'

const UserHome = () => {
    const { user, updateUser } = useAuth()
    const [profile, setProfile] = useState({ name: "", city: "", address: "", phone: "", pic: "" })
    const [loading, setLoading] = useState(true)

    const fetchProfile = async () => {
        try {
            const email = user?.email || localStorage.getItem('emailKey')
            if (email) {
                const res = await apiClient.get('/user/userProfile', { params: { email } })
                if (res.data.profileData) {
                    setProfile(res.data.profileData)
                    updateUser(res.data.profileData)
                }
            }
        } catch (err) {
            console.error("Error loading user profile:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            setProfile(user)
            setLoading(false)
        }
        fetchProfile()
    }, [])

    return (
        <>
            <UserHeader />
            <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Welcome Back, <span className="text-success">{profile.name || "Renter"}</span>!</h2>
                    <p className="text-muted">Manage your active rentals, discover new listings, and update your profile.</p>
                </div>

                <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="bg-success text-white p-4 text-center position-relative">
                        <img 
                            src={getImageUrl('userPics', profile.pic, 'avatar')} 
                            alt={profile.name} 
                            className="rounded-circle border border-4 border-white shadow"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
                        <h4 className="mt-3 mb-0 fw-bold">{profile.name || "User Profile"}</h4>
                        <span className="badge bg-light text-success mt-1">Verified Renter</span>
                    </div>

                    <div className="card-body p-4">
                        <div className="list-group list-group-flush mb-4">
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-envelope me-2 text-success"></i>Email</span>
                                <span className="fw-semibold">{profile.email || "N/A"}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-phone me-2 text-success"></i>Phone</span>
                                <span className="fw-semibold">{profile.phone || "N/A"}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-city me-2 text-success"></i>City</span>
                                <span className="fw-semibold">{profile.city || "Not Set"}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-map-marker-alt me-2 text-success"></i>Address</span>
                                <span className="fw-semibold">{profile.address || "Not Set"}</span>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <Link to="/viewProduct" className="btn btn-success fw-bold py-2 rounded-pill">
                                <i className="fas fa-search me-2"></i>Browse Available Rentals
                            </Link>
                            <Link to="/userInvoiceData" className="btn btn-outline-success py-2 rounded-pill">
                                <i className="fas fa-file-invoice me-2"></i>View My Invoices
                            </Link>
                            <Link to="/userEditProfile" className="btn btn-outline-secondary btn-sm py-2 rounded-pill">
                                <i className="fas fa-user-edit me-2"></i>Edit My Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHome
