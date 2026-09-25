import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerHeader from './OwnerHeader'
import apiClient from '../../api/apiClient'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import '../../css/OwnerHome.css'

const OwnerEditProfile = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [oldData, setOldData] = useState({
    fullname: "",
    city: "",
    address: "",
    phone: ""
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setOldData({
        fullname: user.fullname || user.name || "",
        city: user.city || "",
        address: user.address || "",
        phone: user.phone || ""
      })
    }
  }, [user])

  const getData = (e) => {
    setOldData({ ...oldData, [e.target.name]: e.target.value })
  }

  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const email = user?.email || localStorage.getItem("emailKey")
      const serverResponse = await apiClient.put('/owner/editProfile', oldData, {
        params: { email }
      })

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: serverResponse.data.message || "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500
      })

      updateUser(oldData)
      setTimeout(() => {
        navigate("/ownerHome")
      }, 1000)
    } catch (err) {
      console.error("Edit owner profile error:", err)
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Could not update partner details."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <OwnerHeader />
      <div className="container py-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg border-0 rounded-4 p-4 bg-white" style={{ maxWidth: '480px', width: '100%' }}>
          <div className="text-center mb-4">
            <div className="rounded-circle bg-primary text-white d-inline-flex p-3 mb-2 shadow-sm">
              <i className="fas fa-store-alt fs-3"></i>
            </div>
            <h4 className="fw-bold">Edit Partner Details</h4>
            <p className="text-muted small">Update your store identity, pickup address, and contact number.</p>
          </div>

          <form onSubmit={submitData}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Owner / Business Name</label>
              <input 
                className='form-control' 
                type="text" 
                name='fullname' 
                value={oldData.fullname} 
                onChange={getData} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Phone Number</label>
              <input 
                className='form-control' 
                type="tel" 
                name='phone' 
                value={oldData.phone} 
                onChange={getData} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">City / Hub</label>
              <input 
                className='form-control' 
                type="text" 
                name='city' 
                value={oldData.city} 
                onChange={getData} 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Warehouse / Pickup Address</label>
              <input 
                className='form-control' 
                type="text" 
                name="address" 
                value={oldData.address} 
                onChange={getData} 
                required 
              />
            </div>

            <div className="d-grid gap-2">
              <button className='btn btn-primary fw-bold py-2' type='submit' disabled={loading}>
                {loading ? "Saving Details..." : "Save Partner Profile"}
              </button>
              <button type='button' onClick={() => navigate('/ownerHome')} className='btn btn-light btn-sm'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default OwnerEditProfile
