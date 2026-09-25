import React, { useState, useEffect } from 'react'
import OwnerHeader from './OwnerHeader'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import { getImageUrl, getSmartFallback } from '../../utils/imageHelper'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import '../../css/MyProduct.css'

const MyProducts = () => {
  const { user } = useAuth()
  const [myProduct, setMyProduct] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const email = user?.email || localStorage.getItem("emailKey")
      if (email) {
        const serverResponse = await apiClient.get('/owner/myProduct', { params: { email } })
        setMyProduct(serverResponse.data.objectData || [])
      }
    } catch (err) {
      console.error("Error loading products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleMarkAvailable = async (productId) => {
    try {
      const res = await apiClient.post('/owner/releaseProduct', { productId })
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: res.data.message || 'Product marked as available!',
        timer: 1500,
        showConfirmButton: false
      })
      fetchData()
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.response?.data?.message || 'Could not update status.'
      })
    }
  }

  return (
    <>
      <OwnerHeader />
      <div className="container py-5 min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold mb-1">My Listed Products</h1>
            <p className="text-muted mb-0">Manage availability, track rental status, and register rentals.</p>
          </div>
          <Link to="/addProduct" className="btn btn-primary px-4 py-2 rounded-pill fw-bold">
            <i className="fas fa-plus me-2"></i>Add New Listing
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Loading your listings...</p>
          </div>
        ) : myProduct.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
            <i className="fas fa-box-open fs-1 text-muted mb-3"></i>
            <h4>No products listed yet</h4>
            <p className="text-muted">Start monetizing your assets today by listing your first rental product.</p>
            <Link to="/addProduct" className="btn btn-primary mt-2">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className='flex-container'>
            {myProduct.map((p) => {
              const isRented = p.productStatus === 'rented'

              return (
                <div className='item-div1 shadow-sm' key={p._id}>
                  <div className="position-relative">
                    <img 
                      src={getImageUrl('productPics', p.productPic, 'product', p.productName)} 
                      alt={p.productName} 
                      height={200} 
                      width={270} 
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getSmartFallback('product', p.productName);
                      }}
                    />
                    <span className={`badge position-absolute top-0 end-0 m-2 ${isRented ? 'bg-danger' : 'bg-success'}`}>
                      {isRented ? 'Currently Rented' : 'Available for Rent'}
                    </span>
                  </div>

                  <div className="p-3 text-start">
                    <h5 className="fw-bold mb-1 text-truncate">{p.productName}</h5>
                    <p className="text-primary fw-bold fs-5 mb-1">₹{p.productPrice} <span className="fs-6 text-muted font-monospace">/day</span></p>
                    <p className="badge bg-light text-dark border mb-3">{p.productCategory}</p>

                    <div className="d-grid gap-2">
                      <Link to="/updateInventory" state={{ productInfo: p }} className="w-100">
                        <button type='button' className="btn btn-outline-primary btn-sm w-100">
                          <i className="fas fa-file-signature me-1"></i> Register Offline Rental
                        </button>
                      </Link>

                      {isRented && (
                        <button 
                          type='button' 
                          onClick={() => handleMarkAvailable(p._id)}
                          className="btn btn-success btn-sm w-100"
                        >
                          <i className="fas fa-check-circle me-1"></i> Mark as Returned & Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default MyProducts
