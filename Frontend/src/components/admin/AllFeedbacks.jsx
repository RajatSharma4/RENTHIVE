import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import FeedbackDetails from './FeedbackDetails'
import apiClient from '../../api/apiClient'

const AllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const serverResponse = await apiClient.get('/admin/allFeedbacks')
            setFeedbacks(serverResponse.data.FeedbackDetails || [])
        } catch (err) {
            console.error("Error loading feedbacks:", err)
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
                        <h1 className='fw-bold mb-1'>Customer Feedbacks ({feedbacks.length})</h1>
                        <p className="text-muted mb-0">Ratings and reviews submitted by registered renters.</p>
                    </div>
                    <button onClick={fetchData} className="btn btn-outline-warning btn-sm rounded-pill">
                        <i className="fas fa-sync-alt me-1"></i> Refresh Feedbacks
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-warning" role="status"></div>
                        <p className="mt-2 text-muted">Loading feedback reviews...</p>
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
                        <i className="fas fa-star-half-alt fs-1 text-muted mb-3"></i>
                        <h4>No Feedbacks Received Yet</h4>
                    </div>
                ) : (
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                        <FeedbackDetails feedbackArray={feedbacks} />
                    </div>
                )}
            </div>
        </>
    )
}

export default AllFeedbacks
