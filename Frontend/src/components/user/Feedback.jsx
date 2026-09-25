import React, { useState, useEffect } from 'react'
import '../../css/Feedback.css'
import Footer from '../Footer'
import apiClient from '../../api/apiClient'
import Swal from 'sweetalert2'
import UserHeader from './UserHeader'
import { useAuth } from '../../context/AuthContext'

const Feedback = () => {
    const { user } = useAuth()
    const [feedback, setFeedback] = useState({
        fullname: "",
        email: "",
        rating: "5",
        remarks: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setFeedback((prev) => ({
                ...prev,
                fullname: user.name || "",
                email: user.email || ""
            }))
        }
    }, [user])

    function fetchData(e) {
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
    }

    async function submitData(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const serverResponse = await apiClient.post('/user/feedback', feedback)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: serverResponse.data.message || "Feedback submitted successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            setFeedback({
                fullname: user?.name || "",
                email: user?.email || "",
                rating: "5",
                remarks: ""
            })
        } catch (err) {
            console.error("Feedback submit error:", err)
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: err.response?.data?.message || "Could not submit feedback."
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='d-flex flex-column min-vh-100'>
                <UserHeader />
                <main className='flex-fill py-5'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-md-7 col-lg-5'>
                                <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
                                    <div className="text-center mb-4">
                                        <div className="rounded-circle bg-warning text-dark d-inline-flex p-3 mb-2 shadow-sm">
                                            <i className="fas fa-star fs-3"></i>
                                        </div>
                                        <h3 className="fw-bold">Platform Feedback</h3>
                                        <p className="text-muted small">Help us improve your rental experience on RentHive.</p>
                                    </div>

                                    <form onSubmit={submitData}>
                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold">Your Name</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="fullname" 
                                                value={feedback.fullname} 
                                                onChange={fetchData} 
                                                required 
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold">Email</label>
                                            <input 
                                                className="form-control" 
                                                type="email" 
                                                name="email" 
                                                value={feedback.email} 
                                                onChange={fetchData} 
                                                required 
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold">Experience Rating</label>
                                            <select 
                                                className="form-select" 
                                                name="rating" 
                                                value={feedback.rating} 
                                                onChange={fetchData}
                                            >
                                                <option value="5">⭐⭐⭐⭐⭐ - Outstanding (5/5)</option>
                                                <option value="4">⭐⭐⭐⭐ - Good (4/5)</option>
                                                <option value="3">⭐⭐⭐ - Average (3/5)</option>
                                                <option value="2">⭐⭐ - Below Average (2/5)</option>
                                                <option value="1">⭐ - Poor (1/5)</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label small fw-semibold">Remarks & Suggestions</label>
                                            <textarea 
                                                className="form-control" 
                                                name="remarks" 
                                                value={feedback.remarks} 
                                                onChange={fetchData} 
                                                rows="4" 
                                                placeholder="Tell us about item condition, delivery, or overall service..."
                                                required
                                            ></textarea>
                                        </div>

                                        <button className="btn btn-warning w-100 fw-bold py-2 shadow-sm" type="submit" disabled={loading}>
                                            {loading ? "Submitting..." : "Submit Feedback"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Feedback
