import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import OwnerHeader from './OwnerHeader'
import apiClient from '../../api/apiClient'
import { getImageUrl } from '../../utils/imageHelper'
import { useAuth } from '../../context/AuthContext'
import '../../css/OwnerHome.css'

const OwnerHome = () => {
    const { user, updateUser } = useAuth()
    const [profile, setProfile] = useState({ fullname: "", city: "", address: "", phone: "", pic: "" })
    const [loading, setLoading] = useState(true)

    const fetchProfile = async () => {
        try {
            const email = user?.email || localStorage.getItem('emailKey')
            if (email) {
                const res = await apiClient.get('/owner/ownerProfile', { params: { email } })
                if (res.data.profileData) {
                    setProfile(res.data.profileData)
                    updateUser(res.data.profileData)
                }
            }
        } catch (err) {
            console.error("Error loading owner profile:", err)
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
            <OwnerHeader />
            <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Welcome, Partner <span className="text-primary">{profile.fullname || "Owner"}</span>!</h2>
                    <p className="text-muted">Manage your inventory, monitor active rentals, and list new products.</p>
                </div>

                <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="bg-primary text-white p-4 text-center position-relative">
                        <img 
                            src={getImageUrl('profilePics', profile.pic, 'avatar')} 
                            alt={profile.fullname} 
                            className="rounded-circle border border-4 border-white shadow"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
                        <h4 className="mt-3 mb-0 fw-bold">{profile.fullname || "Owner Profile"}</h4>
                        <span className="badge bg-light text-primary mt-1">Verified Rental Partner</span>
                    </div>

                    <div className="card-body p-4">
                        <div className="list-group list-group-flush mb-4">
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-envelope me-2 text-primary"></i>Email</span>
                                <span className="fw-semibold">{profile.email || "N/A"}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-phone me-2 text-primary"></i>Phone</span>
                                <span className="fw-semibold">{profile.phone || "N/A"}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-city me-2 text-primary"></i>City</span>
                                <span className="fw-semibold">{profile.city || "Not Set"}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span className="text-muted"><i className="fas fa-map-marker-alt me-2 text-primary"></i>Address</span>
                                <span className="fw-semibold">{profile.address || "Not Set"}</span>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <Link to="/addProduct" className="btn btn-primary fw-bold py-2 rounded-pill">
                                <i className="fas fa-plus me-2"></i>Add New Product
                            </Link>
                            <Link to="/myProduct" className="btn btn-outline-primary py-2 rounded-pill">
                                <i className="fas fa-boxes me-2"></i>View My Listings
                            </Link>
                            <Link to="/invoiceData" className="btn btn-outline-secondary py-2 rounded-pill">
                                <i className="fas fa-file-invoice me-2"></i>Rental Invoices & History
                            </Link>
                            <Link to="/ownerEditProfile" className="btn btn-outline-secondary btn-sm py-2 rounded-pill">
                                <i className="fas fa-user-edit me-2"></i>Edit Partner Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerHome
