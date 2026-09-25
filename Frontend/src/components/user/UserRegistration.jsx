import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/UserRegistration.css'
import { ClipLoader } from 'react-spinners'
import apiClient from '../../api/apiClient'
import Swal from 'sweetalert2'

const UserRegistration = () => {
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [regData, setRegData] = useState({
        email: "",
        password: "",
        name: "",
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
            const serverResponse = await apiClient.post('/user/register', formData)
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: serverResponse.data.message || 'You can now log in to your account.',
                timer: 2000,
                showConfirmButton: false
            })

            setRegData({
                email: "",
                password: "",
                name: "",
                phone: "",
                city: "",
                address: ""
            })
            setPic(null)
            if (fileInputRef.current) fileInputRef.current.value = null

            setTimeout(() => {
                navigate('/userLogin')
            }, 1500)
        } catch (err) {
            console.error("Registration error:", err)
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data?.message || 'Something went wrong during registration.'
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
                                    src="/RegisterPic.png" 
                                    alt="Register on RentHive" 
                                    className="img-fluid rounded-4 shadow-lg"
                                    style={{ maxHeight: '420px', width: '100%', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/Home.jpg";
                                    }}
                                />
                                <h4 className="mt-3 fw-bold text-success">Join RentHive as a Renter</h4>
                                <p className="text-muted">Access thousands of luxury & daily items without high upfront costs.</p>
                            </div>

                            <div className='col-lg-5 col-md-8'>
                                <div className="container1 shadow-lg p-4 rounded-4 bg-white">
                                    <div className="heading text-center mb-3">User Registration</div>
                                    <form className="form1" onSubmit={submitData}>
                                        <input className="input" type="text" name="name" value={regData.name} onChange={fetchData} placeholder="Full Name" required />
                                        <input className="input" type="email" name="email" value={regData.email} onChange={fetchData} placeholder="E-mail Address" required />
                                        <input className="input" type="password" name="password" value={regData.password} onChange={fetchData} placeholder="Password" required />
                                        <input className="input" type="tel" name="phone" value={regData.phone} onChange={fetchData} placeholder="Phone Number" required />
                                        <input className="input" type="text" name="city" value={regData.city} onChange={fetchData} placeholder="City" required />
                                        <input className="input" type="text" name="address" value={regData.address} onChange={fetchData} placeholder="Street Address" required />

                                        <label className="form-label small text-muted mt-2 mb-0">Profile Picture (Optional)</label>
                                        <input className="input" type="file" ref={fileInputRef} onChange={fetchData} accept="image/*" />

                                        <button className="login-button mt-3" type="submit" disabled={loading}>
                                            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
                                        </button>

                                        <p className="text-center mt-3 small">
                                            Already have an account? <Link to="/userLogin" className="text-success fw-bold">Login here</Link>
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

export default UserRegistration
