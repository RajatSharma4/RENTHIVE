import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerHeader from './OwnerHeader'
import '../../css/AddProduct.css'
import Swal from 'sweetalert2'
import apiClient from '../../api/apiClient'
import { useAuth } from '../../context/AuthContext'
import { ClipLoader } from 'react-spinners'

function AddProduct() {
  const fileInputRef = useRef(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [productData, setProductData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: "",
  })
  const [pic, setPic] = useState(null)

  const fetchData = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setPic(files[0]);
    } else {
      setProductData({ ...productData, [name]: value })
    }
  };

  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true)

    const ownerId = user?._id || user?.userId || localStorage.getItem('ownerId')
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key])
    }
    if (ownerId) {
      formData.append("owner", ownerId)
    }
    if (pic) {
      formData.append("pic", pic);
    }

    try {
      const serverResponse = await apiClient.post('/owner/addProduct', formData)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: serverResponse.data.message || "Product Added Successfully",
        showConfirmButton: false,
        timer: 1500
      });

      setProductData({
        productName: "",
        productCategory: "",
        productDescription: "",
        productPrice: "",
      })
      setPic(null)
      if (fileInputRef.current) fileInputRef.current.value = null

      setTimeout(() => {
        navigate('/myProduct')
      }, 1000)
    } catch (err) {
      console.error("Add product error:", err)
      Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text: err.response?.data?.message || "Please check required fields and try again."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='d-flex flex-column min-vh-100 bg-light'>
        <OwnerHeader />
        <main className='flex-fill py-5'>
          <div className='container'>
            <div className='row align-items-center justify-content-center g-5'>
              <div className='col-lg-5 text-center text-lg-start'>
                <h2 className="fw-bold display-6 mb-3">Showcase Premium Listings</h2>
                <p className="text-muted fs-5">
                  Unlock the spotlight for your equipment, furniture, or vehicles.
                  List with RentHive and connect with verified renters.
                </p>
                <div className="bg-white p-4 rounded-4 shadow-sm border mt-4">
                  <h6 className="fw-bold text-primary mb-3">Owner Benefits</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">✔️ Verified, High-Intent Tenants</li>
                    <li className="mb-2">✔️ Instant Booking & WhatsApp Integration</li>
                    <li>✔️ Full Control Over Rental Pricing & Duration</li>
                  </ul>
                </div>
              </div>

              <div className='col-lg-6 col-md-9'>
                <div className="container2 shadow-lg p-4 rounded-4 bg-white">
                  <div className="heading text-center mb-3">Add Rental Product</div>
                  <form className="form2" onSubmit={submitData}>
                    <div className="mb-2">
                      <label className="form-label small fw-semibold">Product Name</label>
                      <input 
                        className="input" 
                        type="text" 
                        name="productName" 
                        value={productData.productName} 
                        onChange={fetchData} 
                        placeholder="e.g. Sony Alpha A7 III Camera" 
                        required 
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label small fw-semibold">Category</label>
                      <select 
                        className='input itemSelect form-control' 
                        value={productData.productCategory} 
                        name="productCategory" 
                        onChange={fetchData}
                        required
                      >
                        <option value="" disabled>-- Select Category --</option>
                        <option value="electronics">Electronics & Cameras</option>
                        <option value="furniture">Furniture & Decor</option>
                        <option value="appliances">Home Appliances</option>
                        <option value="vehicles">Vehicles & Bikes</option>
                        <option value="tools">Tools & Equipment</option>
                      </select>
                    </div>

                    <div className="mb-2">
                      <label className="form-label small fw-semibold">Description</label>
                      <textarea 
                        className='input' 
                        name="productDescription" 
                        placeholder='Describe condition, specs, security deposit requirements...' 
                        value={productData.productDescription} 
                        onChange={fetchData} 
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="mb-2">
                      <label className="form-label small fw-semibold">Rental Price (₹ / day)</label>
                      <input 
                        className="input" 
                        type="number" 
                        min="1"
                        name="productPrice" 
                        value={productData.productPrice} 
                        onChange={fetchData} 
                        placeholder="e.g. 500" 
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Upload Product Image</label>
                      <input 
                        className='input' 
                        type="file" 
                        ref={fileInputRef} 
                        name='pic' 
                        onChange={fetchData} 
                        accept='image/*' 
                        required 
                      />
                    </div>

                    <button 
                      className="login-button mt-2 d-flex align-items-center justify-content-center" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <ClipLoader size={20} color="white" /> : "Publish Listing"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default AddProduct
