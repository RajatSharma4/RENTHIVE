import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../../css/OwnerRegistration.css'
import Header from '../Header'
import Footer from '../Footer'
import { ClipLoader } from 'react-spinners'
import apiClient from '../../api/apiClient'
import Swal from 'sweetalert2'

const OwnerRegistration = () => {
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [regData, setRegData] = useState({
    email: "",
    password: "",
    fullname: "",
    phone: "",
    city: "",
    address: ""
  })
  const [pic, setPic] = useState(null)

  const fetchData = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setPic(files[0]);
    } else {
      setRegData({ ...regData, [name]: value })
    }
  };

  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData();
    for (const key in regData) {
      formData.append(key, regData[key])
    }
    if (pic) {
      formData.append("pic", pic);
    }

    try {
      const serverResponse = await apiClient.post('/owner/ownerRegister', formData)
      Swal.fire({
        icon: 'success',
        title: 'Partner Registration Successful!',
        text: serverResponse.data.message || 'You can now log in and start listing your rental items.',
        timer: 2000,
        showConfirmButton: false
      })

      setRegData({
        email: "",
        password: "",
        fullname: "",
        phone: "",
        city: "",
        address: ""
      })
      setPic(null)
      if (fileInputRef.current) fileInputRef.current.value = null

      setTimeout(() => {
        navigate('/ownerLogin')
      }, 1500)
    } catch (err) {
      console.error("Owner registration error:", err)
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.message || 'Something went wrong during owner registration.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-fill d-flex justify-content-center align-items-center py-5'>
          <div className='container'>
            <div className='row align-items-center justify-content-center g-5'>
              <div className='col-lg-5 text-center d-none d-lg-block'>
                <img 
                  src="/Home.jpg" 
                  alt="Partner With RentHive" 
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '420px', width: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/RegisterPic.png";
                  }}
                />
                <h4 className="mt-3 fw-bold text-primary">Earn With Your Assets</h4>
                <p className="text-muted">Turn your idle electronics, furniture, or vehicles into a recurring passive income stream.</p>
              </div>

              <div className='col-lg-5 col-md-8'>
                <div className="container1 shadow-lg p-4 rounded-4 bg-white">
                  <div className="heading text-center mb-3">Owner Registration</div>
                  <form className="form1" onSubmit={submitData}>
                    <input className="input" type="text" name="fullname" value={regData.fullname} onChange={fetchData} placeholder="Full Name or Business Name" required />
                    <input className="input" type="email" name="email" value={regData.email} onChange={fetchData} placeholder="E-mail Address" required />
                    <input className="input" type="password" name="password" value={regData.password} onChange={fetchData} placeholder="Password" required />
                    <input className="input" type="tel" name="phone" value={regData.phone} onChange={fetchData} placeholder="Contact Phone" required />
                    <input className="input" type="text" name="city" value={regData.city} onChange={fetchData} placeholder="City / Region" required />
                    <input className="input" type="text" name="address" value={regData.address} onChange={fetchData} placeholder="Warehouse or Pickup Address" required />

                    <label className="form-label small text-muted mt-2 mb-0">Store / Profile Logo (Optional)</label>
                    <input className="input" type="file" ref={fileInputRef} onChange={fetchData} accept="image/*" />

                    <button className="login-button mt-3" type="submit" disabled={loading}>
                      {loading ? <ClipLoader size={20} color="white" /> : "Register as Owner"}
                    </button>

                    <p className="text-center mt-3 small">
                      Already registered as owner? <Link to="/ownerLogin" className="text-primary fw-bold">Login here</Link>
                    </p>
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

export default OwnerRegistration
