import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/UserLogin.css'
import { ClipLoader } from 'react-spinners'
import apiClient from '../../api/apiClient'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'

const UserLogin = () => {
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
      const serverResponse = await apiClient.post('/user/userLogin', loginData)
      const data = serverResponse.data

      if (data.status === "success" || data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500
        });

        login(data.user, data.token, 'user')
        navigate("/userHome")
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid email or password",
        });
      }
    } catch (err) {
      console.error("User login error:", err)
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Invalid email or password. Please try again.",
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
            <div className="heading text-center mb-3">USER LOGIN</div>
            <form className="form shadow-lg p-4 rounded-4 bg-white" onSubmit={submitData}>
              <input 
                required 
                className="input" 
                type="email" 
                name="email" 
                id="email" 
                placeholder="E-mail" 
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
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small text-muted">Don't have an account? <Link to="/register" style={{ color: "#12B1D1", fontWeight: 'bold' }}>Register</Link></span>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold login-btn d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Login"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default UserLogin
