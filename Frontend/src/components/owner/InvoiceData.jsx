import React, { useState, useEffect } from 'react'
import OwnerHeader from './OwnerHeader'
import apiClient from '../../api/apiClient'
import { useAuth } from '../../context/AuthContext'
import { getImageUrl } from '../../utils/imageHelper'

const InvoiceData = () => {
  const [invoice, setInvoice] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchData = async () => {
    setLoading(true)
    try {
      const email = user?.email || localStorage.getItem("emailKey")
      const serverResponse = await apiClient.get('/owner/allInvoice', {
        params: { email }
      })
      setInvoice(serverResponse.data.InvoiceDetail || [])
    } catch (err) {
      console.error("Error loading owner invoices:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <OwnerHeader />
      <div className="container py-5 min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold mb-1">Rental Records & Invoices</h1>
            <p className="text-muted mb-0">Overview of all active and completed rentals for your listed items.</p>
          </div>
          <button onClick={fetchData} className="btn btn-outline-primary btn-sm rounded-pill">
            <i className="fas fa-sync-alt me-1"></i> Refresh Invoices
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Retrieving your invoices...</p>
          </div>
        ) : invoice.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
            <i className="fas fa-file-invoice fs-1 text-muted mb-3"></i>
            <h4>No Rental Records Found</h4>
            <p className="text-muted">When customers book your items or you register offline rentals, invoices will appear here.</p>
          </div>
        ) : (
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Renter Contact</th>
                    <th>Duration</th>
                    <th>Rented Date</th>
                    <th>Expected Return</th>
                    <th>Status</th>
                    <th>ID Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.map((i) => {
                    const prodName = i.product?.productName || "Product Listing"
                    const prodPrice = i.product?.productPrice ? `₹${i.product.productPrice}/day` : ""
                    const isReturned = i.productStatus === 'returned'

                    return (
                      <tr key={i._id}>
                        <td>
                          <div className="fw-bold">{prodName}</div>
                          {prodPrice && <small className="text-success">{prodPrice}</small>}
                        </td>
                        <td>
                          <div><i className="fas fa-phone small text-muted me-1"></i>{i.userPhone}</div>
                          {i.userEmail && <small className="text-muted">{i.userEmail}</small>}
                        </td>
                        <td><span className="badge bg-light text-dark border">{i.duration} Days</span></td>
                        <td>{i.rentedDate ? new Date(i.rentedDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{i.returnDate || 'Open Return'}</td>
                        <td>
                          <span className={`badge ${isReturned ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {i.productStatus || 'rented'}
                          </span>
                        </td>
                        <td>
                          {i.idProof ? (
                            <a 
                              href={getImageUrl('idPic', i.idProof, 'id')} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary py-0"
                            >
                              <i className="fas fa-id-card me-1"></i> View ID
                            </a>
                          ) : (
                            <span className="text-muted small">None</span>
                          )}
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

export default InvoiceData
