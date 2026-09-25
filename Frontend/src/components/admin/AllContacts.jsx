import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import ContactDetails from './ContactDetails'
import apiClient from '../../api/apiClient'

const AllContacts = () => {
    const [contact, setContact] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const serverResponse = await apiClient.get('/admin/allContacts')
            setContact(serverResponse.data.ContactDetails || [])
        } catch (err) {
            console.error("Error loading contacts:", err)
        } finally {
            setLoading(false)
        }
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
                        <h1 className='fw-bold mb-1'>Contact Form Messages ({contact.length})</h1>
                        <p className="text-muted mb-0">Inquiries submitted via the public contact us form.</p>
                    </div>
                    <button onClick={fetchData} className="btn btn-outline-info btn-sm rounded-pill">
                        <i className="fas fa-sync-alt me-1"></i> Refresh Messages
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-info" role="status"></div>
                        <p className="mt-2 text-muted">Loading messages...</p>
                    </div>
                ) : contact.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
                        <i className="fas fa-inbox fs-1 text-muted mb-3"></i>
                        <h4>No Inquiries Received Yet</h4>
                    </div>
                ) : (
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                        <ContactDetails contactArray={contact} />
                    </div>
                )}
            </div>
        </>
    )
}

export default AllContacts
