import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import apiClient from '../../api/apiClient'
import { getImageUrl } from '../../utils/imageHelper'
import Swal from 'sweetalert2'

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const serverResponse = await apiClient.get('/admin/allUsers')
            setUsers(serverResponse.data.profileData || [])
        } catch (err) {
            console.error("Error loading users:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteUser = async (id, name) => {
        Swal.fire({
            title: `Delete user "${name}"?`,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await apiClient.delete(`/admin/user/${id}`)
                    Swal.fire("Deleted!", "User account has been removed.", "success")
                    fetchData()
                } catch (err) {
                    Swal.fire("Error", "Could not delete user account.", "error")
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
                        <h1 className="fw-bold mb-1">Registered Renters ({users.length})</h1>
                        <p className="text-muted mb-0">Directory of all client accounts registered on RentHive.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-danger" role="status"></div>
                        <p className="mt-2 text-muted">Loading user directory...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
                        <i className="fas fa-users-slash fs-1 text-muted mb-3"></i>
                        <h4>No Registered Users Found</h4>
                    </div>
                ) : (
                    <div className="row g-4">
                        {users.map((u) => (
                            <div key={u._id} className="col-lg-4 col-md-6">
                                <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100 bg-white">
                                    <div className="bg-light p-3 text-center border-bottom">
                                        <img
                                            src={getImageUrl('userPics', u.pic, 'avatar')}
                                            alt={u.name}
                                            className="rounded-circle shadow-sm"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                        <h5 className="mt-2 mb-0 fw-bold">{u.name}</h5>
                                        <small className="text-muted">{u.email}</small>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="small mb-3">
                                            <p className="mb-1"><strong>Phone:</strong> {u.phone || 'N/A'}</p>
                                            <p className="mb-1"><strong>City:</strong> {u.city || 'N/A'}</p>
                                            <p className="mb-1"><strong>Address:</strong> {u.address || 'N/A'}</p>
                                            <p className="mb-0 text-muted"><strong>Joined:</strong> {u.date ? new Date(u.date).toLocaleDateString() : 'N/A'}</p>
                                        </div>

                                        <button 
                                            onClick={() => handleDeleteUser(u._id, u.name)}
                                            className="btn btn-outline-danger btn-sm w-100 rounded-pill"
                                        >
                                            <i className="fas fa-trash-alt me-1"></i> Remove User
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

export default AllUsers
