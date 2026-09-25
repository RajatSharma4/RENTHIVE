import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import apiClient from '../../api/apiClient'
import { getImageUrl } from '../../utils/imageHelper'
import Swal from 'sweetalert2'

const AllOwners = () => {
    const [owners, setOwners] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const serverResponse = await apiClient.get('/admin/allOwners')
            setOwners(serverResponse.data.profileData || [])
        } catch (err) {
            console.error("Error loading owners:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteOwner = async (id, name) => {
        Swal.fire({
            title: `Delete partner "${name}"?`,
            text: "This will also remove all products listed by this owner.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete owner"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await apiClient.delete(`/admin/owner/${id}`)
                    Swal.fire("Deleted!", "Owner and their listings have been removed.", "success")
                    fetchData()
                } catch (err) {
                    Swal.fire("Error", "Could not delete owner account.", "error")
                }
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <AdminHeader />
            <div className="container py-5 min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                    <div>
                        <h1 className="fw-bold mb-1">Rental Partners & Owners ({owners.length})</h1>
                        <p className="text-muted mb-0">Directory of registered equipment owners and rental businesses.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-success" role="status"></div>
                        <p className="mt-2 text-muted">Loading partner directory...</p>
                    </div>
                ) : owners.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
                        <i className="fas fa-store-slash fs-1 text-muted mb-3"></i>
                        <h4>No Registered Owners Found</h4>
                    </div>
                ) : (
                    <div className="row g-4">
                        {owners.map((o) => (
                            <div key={o._id} className="col-lg-4 col-md-6">
                                <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100 bg-white">
                                    <div className="bg-light p-3 text-center border-bottom">
                                        <img
                                            src={getImageUrl('profilePics', o.pic, 'avatar')}
                                            alt={o.fullname}
                                            className="rounded-circle shadow-sm"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                        <h5 className="mt-2 mb-0 fw-bold">{o.fullname}</h5>
                                        <small className="text-muted">{o.email}</small>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="small mb-3">
                                            <p className="mb-1"><strong>Phone:</strong> {o.phone || 'N/A'}</p>
                                            <p className="mb-1"><strong>Hub / City:</strong> {o.city || 'N/A'}</p>
                                            <p className="mb-1"><strong>Address:</strong> {o.address || 'N/A'}</p>
                                            <p className="mb-0 text-muted"><strong>Registered:</strong> {o.date ? new Date(o.date).toLocaleDateString() : 'N/A'}</p>
                                        </div>

                                        <button 
                                            onClick={() => handleDeleteOwner(o._id, o.fullname)}
                                            className="btn btn-outline-danger btn-sm w-100 rounded-pill"
                                        >
                                            <i className="fas fa-trash-alt me-1"></i> Remove Partner
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default AllOwners
