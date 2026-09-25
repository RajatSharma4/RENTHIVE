import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserHeader from './UserHeader'
import apiClient from '../../api/apiClient'
import { useAuth } from '../../context/AuthContext'

const UserInvoiceData = () => {
  const [invoice, setInvoice] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchData = async () => {
    setLoading(true)
    try {
      const email = user?.email || localStorage.getItem("emailKey")
      const phone = user?.phone
      const serverResponse = await apiClient.get('/user/allInvoice', {
        params: { email, phone }
      })
      setInvoice(serverResponse.data.InvoiceDetail || [])
    } catch (err) {
      console.error("Error loading user invoices:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <UserHeader />
      <div className="container py-5 min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold mb-1">My Rental Bookings & Invoices</h1>
            <p className="text-muted mb-0">Track all items you have rented on RentHive.</p>
          </div>
          <Link to="/viewProduct" className="btn btn-success btn-sm rounded-pill px-3">
            <i className="fas fa-search me-1"></i> Rent More Items
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2 text-muted">Retrieving your invoices...</p>
          </div>
        ) : invoice.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
            <i className="fas fa-receipt fs-1 text-muted mb-3"></i>
            <h4>No Rental Invoices Found</h4>
            <p className="text-muted">You haven't rented any products yet. Browse our luxury catalog to get started!</p>
            <Link to="/viewProduct" className="btn btn-success mt-2">
              Browse Available Rentals
            </Link>
          </div>
        ) : (
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Owner Contact</th>
                    <th>Rental Period</th>
                    <th>Rented Date</th>
                    <th>Due Return Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.map((i) => {
                    const prodName = i.product?.productName || "Rental Item"
                    const prodPrice = i.product?.productPrice ? `₹${i.product.productPrice} / day` : ""
                    const isReturned = i.productStatus === 'returned'

                    return (
                      <tr key={i._id}>
                        <td>
                          <div className="fw-bold">{prodName}</div>
                          {prodPrice && <small className="text-success">{prodPrice}</small>}
                        </td>
                        <td>
                          <div className="small"><i className="fas fa-envelope text-muted me-1"></i>{i.ownerEmail}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{i.duration} Days</span>
                        </td>
                        <td>{i.rentedDate ? new Date(i.rentedDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{i.returnDate || 'Open Return'}</td>
                        <td>
                          <span className={`badge ${isReturned ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {isReturned ? 'Completed' : 'Active Rental'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserInvoiceData
