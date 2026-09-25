import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/AdminLogin.css'
import apiClient from '../../api/apiClient'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { ClipLoader } from 'react-spinners'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const fetchData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const submitData = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const serverResponse = await apiClient.post('/admin/adminLogin', loginData)
      const data = serverResponse.data

      if (data.status === "success" || data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admin Authenticated",
          showConfirmButton: false,
          timer: 1500
        });

        login(data.user, data.token, 'admin')
        navigate("/adminHome")
      } else {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: data.message || "Invalid administrator credentials",
        });
      }
    } catch (err) {
      console.error("Admin login error:", err)
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: err.response?.data?.message || "Invalid credentials or unauthorized.",
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <>   
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-fill d-flex align-items-center justify-content-center py-5'>
          <div className="container" style={{ maxWidth: '420px' }}>
            <div className="heading text-center mb-3 text-danger fw-bold">
              <i className="fas fa-shield-alt me-2"></i>ADMIN PORTAL
            </div>
            <form className="form shadow-lg p-4 rounded-4 bg-white" onSubmit={submitData}>
              <input 
                required 
                className="input" 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Admin E-mail" 
                onChange={fetchData} 
                value={loginData.email}  
              />
              <input 
                required 
                className="input" 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Password" 
                onChange={fetchData} 
                value={loginData.password} 
              />
              
              <button 
                type="submit" 
                className="btn btn-danger w-100 fw-bold py-2 mt-2 d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Sign In to Admin Console"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default AdminLogin
