import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import OwnerHeader from './OwnerHeader'
import apiClient from '../../api/apiClient'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import '../../css/UpdateInventory.css'

const UpdateInventory = () => {
  const fileInputRef = useRef(null)
  const locationRef = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const productInfo = locationRef.state?.productInfo
  const ownerEmail = user?.email || localStorage.getItem("emailKey") || ""

  const [inventoryData, setInventoryData] = useState({
    userPhone: "",
    ownerEmail: ownerEmail,
    duration: "1",
    returnDate: "",
    rentedDate: new Date().toISOString().split('T')[0]
  })
  const [idProof, setIdProof] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productInfo) {
      Swal.fire({
        icon: 'info',
        title: 'Select a Product',
        text: 'Please select a product from your listings to register an offline rental.',
        confirmButtonText: 'Go to My Products'
      }).then(() => {
        navigate('/myProduct')
      })
    }
  }, [productInfo, navigate])

  function fetchData(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setIdProof(files[0]);
    } else {
      setInventoryData({ ...inventoryData, [name]: value })
    }
  }

  async function submitData(e) {
    e.preventDefault()
    if (!productInfo) return

    setLoading(true)
    const formData = new FormData();
    for (const key in inventoryData) {
      formData.append(key, inventoryData[key])
    }
    formData.append("product", productInfo._id)
    if (idProof) {
      formData.append("idProof", idProof);
    }

    try {
      const serverResponse = await apiClient.post('/owner/updateInventory', formData, {
        params: { pid: productInfo._id }
      })

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: serverResponse.data.message || "Inventory Updated Successfully",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        navigate('/myProduct')
      }, 1000)
    } catch (err) {
      console.error("Update inventory error:", err)
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Could not register rental inventory."
      })
    } finally {
      setLoading(false)
    }
  }

  if (!productInfo) {
    return (
      <>
        <OwnerHeader />
        <div className="container text-center py-5">
          <p>Redirecting to products...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <OwnerHeader />
      <div className='bg-light min-vh-100 py-5'>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className='text-primary fw-bold'>Record Offline Rental Transaction</h2>
            <p className="text-muted">Register an in-person or direct rental to maintain audit logs and update product availability.</p>
          </div>

          <div className='row justify-content-center'>
            <div className='col-md-7 col-lg-6'>
              <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
                <div className="alert alert-secondary py-2 small mb-4">
                  <i className="fas fa-tag me-1"></i> Registering rental for: <b>{productInfo.productName}</b> (₹{productInfo.productPrice}/day)
                </div>

                <form onSubmit={submitData}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Renter Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      name="userPhone" 
                      required 
                      onChange={fetchData} 
                      value={inventoryData.userPhone} 
                      placeholder="e.g. 9876543210" 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Owner Contact Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="ownerEmail" 
                      required 
                      onChange={fetchData} 
                      value={inventoryData.ownerEmail} 
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold">Duration (Days)</label>
                      <input 
                        type="number" 
                        min="1" 
                        className="form-control" 
                        name="duration" 
                        required 
                        onChange={fetchData} 
                        value={inventoryData.duration} 
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold">Rented Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="rentedDate" 
                        required 
                        onChange={fetchData} 
                        value={inventoryData.rentedDate} 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Expected Return Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="returnDate" 
                      required 
                      onChange={fetchData} 
                      value={inventoryData.returnDate} 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Renter ID Proof Document (Image or PDF)</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      name="idProof" 
                      accept='image/*,application/pdf' 
                      onChange={fetchData} 
                      ref={fileInputRef} 
                    />
                    <small className="text-muted">Aadhaar, Passport, or Driving License verification</small>
                  </div>

                  <div className="d-grid gap-2">
                    <button className='btn btn-primary fw-bold py-2' type='submit' disabled={loading}>
                      {loading ? "Recording Transaction..." : "Confirm & Update Inventory"}
                    </button>
                    <Link to="/myProduct" className="btn btn-light btn-sm text-center">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateInventory
