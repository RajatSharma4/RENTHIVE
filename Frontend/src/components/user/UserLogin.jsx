import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/UserLogin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


const UserLogin = () => {

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const URL = "http://localhost:4000/user/userLogin"

  const fetchData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const submitData = async (e) => {
    e.preventDefault()
    try {
      const serverResponse = await axios.post(URL, loginData)
      console.log(serverResponse);
      const msg = serverResponse.data.status

      if (msg === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("emailKey", serverResponse.data.token)
        navigate("/userHome")
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",  
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }

    }
    catch (err) {
      console.log(err);

    }
  }

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>  

        <Header />

        <main className='flex-fill'>


          <div className="container pt-5 pt-md-2">
            <div className="heading pb-4 pb-md-2">USER LOGIN</div>
            <form className="form" onSubmit={submitData}>
              <input required className="input" type="email" name="email" id="email" placeholder="E-mail" onChange={fetchData} value={loginData.email} />
              <input required className="input" type="password" name="password" id="password" placeholder="Password" onChange={fetchData} value={loginData.password} />
                <p>Don't have an account <Link to="/register" style={{color:"#12B1D1"}}>Register here</Link></p>
              <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
              <input className="login-button" type="submit" defaultValue="Sign In" />
            </form>

          </div>
        </main>

        <Footer />

      </div>

    </>
  )
}

export default UserLogin












