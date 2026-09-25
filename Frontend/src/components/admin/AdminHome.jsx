import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import { useAuth } from '../../context/AuthContext'
import '../../css/AdminHome.css'

const AdminHome = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({ name: "", phone: "", email: "" })
  const [counts, setCounts] = useState({ users: 0, owners: 0, contacts: 0, feedbacks: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const email = user?.email || localStorage.getItem("emailKey") || "admin@renthive.com"
      const resProfile = await apiClient.get('/admin/adminProfile', { params: { email } })
      if (resProfile.data.profileData) {
        setProfile(resProfile.data.profileData)
      }

      // Fetch summary counts for admin metrics
      const [resUsers, resOwners, resContacts, resFeedbacks] = await Promise.allSettled([
        apiClient.get('/admin/allUsers'),
        apiClient.get('/admin/allOwners'),
        apiClient.get('/admin/allContacts'),
        apiClient.get('/admin/allFeedbacks')
      ])

      setCounts({
        users: resUsers.status === 'fulfilled' ? resUsers.value.data.profileData?.length || 0 : 0,
        owners: resOwners.status === 'fulfilled' ? resOwners.value.data.profileData?.length || 0 : 0,
        contacts: resContacts.status === 'fulfilled' ? resContacts.value.data.ContactDetails?.length || 0 : 0,
        feedbacks: resFeedbacks.status === 'fulfilled' ? resFeedbacks.value.data.FeedbackDetails?.length || 0 : 0,
      })
    } catch (err) {
      console.error("Error loading admin home:", err)
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
            <h1 className="fw-bold mb-1"><i className="fas fa-shield-alt text-danger me-2"></i>Admin Management Console</h1>
            <p className="text-muted mb-0">Platform overview, user directory, partner listings, and incoming inquiries.</p>
          </div>
          <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
            Signed in as: {profile.name || "Administrator"}
          </span>
        </div>

        {/* Metric Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-white h-100">
              <i className="fas fa-users fs-1 text-primary mb-2"></i>
              <h2 className="fw-bold mb-0">{counts.users}</h2>
              <span className="text-muted small">Registered Renters</span>
              <Link to="/allUsers" className="btn btn-outline-primary btn-sm mt-3 rounded-pill">View All</Link>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-white h-100">
              <i className="fas fa-store fs-1 text-success mb-2"></i>
              <h2 className="fw-bold mb-0">{counts.owners}</h2>
              <span className="text-muted small">Rental Partners</span>
              <Link to="/allOwners" className="btn btn-outline-success btn-sm mt-3 rounded-pill">View All</Link>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-white h-100">
              <i className="fas fa-envelope-open-text fs-1 text-info mb-2"></i>
              <h2 className="fw-bold mb-0">{counts.contacts}</h2>
              <span className="text-muted small">Contact Inquiries</span>
              <Link to="/allContacts" className="btn btn-outline-info btn-sm mt-3 rounded-pill">View All</Link>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-white h-100">
              <i className="fas fa-star fs-1 text-warning mb-2"></i>
              <h2 className="fw-bold mb-0">{counts.feedbacks}</h2>
              <span className="text-muted small">User Feedbacks</span>
              <Link to="/allFeedbacks" className="btn btn-outline-warning btn-sm mt-3 rounded-pill">View All</Link>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="rounded-circle bg-danger text-white d-inline-flex p-3 mx-auto mb-3">
                <i className="fas fa-user-shield fs-2"></i>
              </div>
              <h4 className="fw-bold mb-1">{profile.name}</h4>
              <p className="text-muted small mb-3">{profile.email}</p>
              <div className="border-top pt-3 text-start small">
                <p className="mb-1"><strong>Role:</strong> Super Administrator</p>
                <p className="mb-0"><strong>Contact:</strong> {profile.phone || "Not Set"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome
