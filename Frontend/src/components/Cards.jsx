import React, { useState, useEffect } from 'react'  
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../api/apiClient'
import { getImageUrl, getSmartFallback } from '../utils/imageHelper'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'
import '../css/ViewProduct.css'

const Cards = () => {
  const [product, setProduct] = useState([])
  const [cat, setCat] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingProduct, setBookingProduct] = useState(null)
  const [bookingForm, setBookingForm] = useState({ duration: 1, phone: "", returnDate: "" })
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const fetchProducts = async (categoryFilter = "", searchFilter = "") => {
    setLoading(true)
    try {
      let endpoint = '/user/viewProduct'
      const params = {}
      if (searchFilter) params.search = searchFilter
      if (categoryFilter && categoryFilter !== 'all') {
        endpoint = '/user/setCategory'
        params.category = categoryFilter
      }

      const res = await apiClient.get(endpoint, { params })
      setProduct(res.data.objectData || [])
    } catch (err) {
      console.error("Error loading products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(cat, search)
  }, [cat])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchProducts(cat, search)
  }

  const openBookingModal = (p) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Login Required",
        text: "Please login as a user to rent products directly.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/userLogin")
      })
      return
    }

    setBookingProduct(p)
    setBookingForm({
      duration: 3,
      phone: user?.phone || "",
      returnDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!bookingProduct) return

    try {
      const payload = {
        productId: bookingProduct._id,
        userPhone: bookingForm.phone,
        userEmail: user?.email,
        duration: bookingForm.duration,
        returnDate: bookingForm.returnDate,
        rentedDate: new Date().toISOString()
      }

      const res = await apiClient.post('/user/book', payload)
      Swal.fire({
        icon: "success",
        title: "Rental Booked!",
        text: res.data.message || "Your booking has been registered successfully!",
      })

      setBookingProduct(null)
      fetchProducts(cat, search)
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.message || "Could not complete booking.",
      })
    }
  }

  return (
    <>
      <section className="py-4">
        <div className="container">
          <h3 className='text-center mt-3 fw-bold'>
            Rent <span className='text-success'>Luxury Products</span> Based On Your Requirement
          </h3>
          <p className="text-center text-muted">Affordable daily & monthly rentals delivered with trust.</p>

          {/* Search & Filter Bar */}
          <div className="row justify-content-center my-4 g-2">
            <div className="col-md-5">
              <form onSubmit={handleSearchSubmit} className="d-flex">
                <input 
                  type="text" 
                  className="form-control rounded-pill px-3 shadow-sm"
                  placeholder="Search products (e.g. camera, sofa, bike)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="btn btn-success rounded-pill ms-2 px-4 shadow-sm">
                  Search
                </button>
              </form>
            </div>
            <div className="col-md-3">
              <select 
                className='form-select rounded-pill px-3 shadow-sm' 
                value={cat} 
                onChange={(e) => setCat(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="appliances">Appliances</option>
                <option value="vehicles">Vehicles</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status"></div>
              <p className="mt-2 text-muted">Loading rental items...</p>
            </div>
          ) : product.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-box-open fs-1 text-muted mb-3"></i>
              <h5>No products found in this category.</h5>
              <button onClick={() => { setCat(""); setSearch(""); fetchProducts(); }} className="btn btn-outline-success btn-sm mt-2">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className='flex-container'>
              {product.map((p) => {
                const ownerPhone = p.owner?.phone ? String(p.owner.phone).replace(/\D/g, '') : ''
                const waText = encodeURIComponent(`Hello, I am interested in renting ${p.productName} listed on RentHive.`)
                const isRented = p.productStatus === 'rented'

                return (
                  <div className='item-div shadow-sm' key={p._id}>
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
                        {isRented ? 'Rented Out' : 'Available'}
                      </span>
                    </div>

                    <div className="p-3 text-start">
                      <h5 className="fw-bold mb-1 text-truncate">{p.productName}</h5>
                      <p className="text-success fw-bold fs-5 mb-1">₹{p.productPrice} <span className="fs-6 text-muted font-monospace">/day</span></p>
                      <p className="badge bg-light text-dark border mb-2">{p.productCategory}</p>
                      
                      <div className="small text-muted mb-3">
                        <p className="mb-0"><strong>Owner:</strong> {p.owner?.fullname || 'RentHive Partner'}</p>
                        <p className="mb-0"><strong>City:</strong> {p.owner?.city || 'Local'}</p>
                      </div>

                      <div className="d-flex gap-2">
                        <button 
                          onClick={() => openBookingModal(p)}
                          disabled={isRented}
                          className={`btn btn-sm flex-fill ${isRented ? 'btn-secondary disabled' : 'btn-success'}`}
                        >
                          {isRented ? 'Rented' : 'Rent Now'}
                        </button>
                        
                        {ownerPhone && (
                          <a 
                            href={`https://wa.me/91${ownerPhone}?text=${waText}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-success"
                            title="Chat on WhatsApp"
                          >
                            <i className="fab fa-whatsapp"></i> Chat
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingProduct && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-4">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">Rent: {bookingProduct.productName}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setBookingProduct(null)}></button>
              </div>
              <form onSubmit={handleBookingSubmit}>
                <div className="modal-body p-4">
                  <div className="text-center mb-3">
                    <img 
                      src={getImageUrl('productPics', bookingProduct.productPic, 'product', bookingProduct.productName)} 
                      alt="" 
                      className="rounded" 
                      style={{ maxHeight: '120px', objectFit: 'cover' }} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getSmartFallback('product', bookingProduct.productName);
                      }}
                    />
                    <p className="fs-5 fw-bold text-success mt-2 mb-0">₹{bookingProduct.productPrice} / day</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Contact Phone</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      required 
                      value={bookingForm.phone} 
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} 
                      placeholder="e.g. 9876543210"
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold">Duration (Days)</label>
                      <input 
                        type="number" 
                        min="1" 
                        className="form-control" 
                        required 
                        value={bookingForm.duration} 
                        onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })} 
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold">Return Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        required 
                        value={bookingForm.returnDate} 
                        onChange={(e) => setBookingForm({ ...bookingForm, returnDate: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="alert alert-info py-2 small mb-0">
                    <i className="fas fa-info-circle me-1"></i> Total Estimated Rent: ₹{Number(bookingProduct.productPrice) * Number(bookingForm.duration || 1)}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setBookingProduct(null)}>Cancel</button>
                  <button type="submit" className="btn btn-success px-4 fw-bold">Confirm Rental</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Customer Reviews & Call to Action */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">What Our Customers Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 h-100 rounded-4">
                <p className="text-muted">"RentHive made our event unforgettable. Renting photography gear and sound systems was effortless!"</p>
                <h6 className="text-success fw-bold mb-0">- Rahul Mehta</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 h-100 rounded-4">
                <p className="text-muted">"I rented an ergonomic workstation while working remotely in Gurgaon. Fast delivery and perfect condition."</p>
                <h6 className="text-success fw-bold mb-0">- Ananya Singh</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 h-100 rounded-4">
                <p className="text-muted">"As a product owner, I have monetized idle equipment and earned passive income every month seamlessly."</p>
                <h6 className="text-success fw-bold mb-0">- Arjun Verma</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-white text-center" style={{ backgroundColor: "#8c96f0" }}>
        <div className="container">
          <h2 className="fw-bold">Ready to Rent or Earn?</h2>
          <p className="fs-5">Join thousands of verified renters and owners on RentHive today!</p>
          <Link className="btn btn-light btn-lg mt-2 fw-bold text-primary px-4 shadow" to="/register">
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  )
}

export default Cards
