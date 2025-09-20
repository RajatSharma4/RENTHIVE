import React from 'react'
import { Link } from "react-router-dom"
import '/src/App.css'

const Header = () => {
  return (
    <div className='gap-5'>

     <nav className="navbar navbar-expand-lg sticky-top" style={{backgroundColor:"#a7afff"}}>
  <div className="container-fluid">
    <a className="navbar-brand text-light" href="#"> <h3><i className="fas fa-user-circle"></i> RentHive</h3> </a>
    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-4 ms-sm-0 ms-lg-5">
        <li className="nav-item">
           <Link className="nav-link  fw-semibold" to="/"><i className="fa-solid fa-house"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link   fw-semibold" to="/aboutus">AboutUs</Link>
        </li>
        <li className="nav-item">
           <Link className="nav-link  fw-semibold" to="/contact">Contact</Link>
        </li>

       <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Rejistration
          </a>
          <ul className=" dropdown-menu">
            <li><Link className="dropdown-item" to="/register">User Rejistration</Link></li>
            <li><Link className="dropdown-item" to="/ownerRegister">Owner Rejistration</Link></li>
          </ul>
        </li>
       <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login
          </a>
          <ul className=" dropdown-menu">
            <li><Link className="dropdown-item" to="/userLogin">UserLogin</Link></li>
            <li><Link className="dropdown-item" to="/ownerLogin">OwnerLogin</Link></li>
            <li><Link className="dropdown-item" to="/adminLogin">AdminLogin</Link></li>
          </ul>
        </li>
       
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>      
    </div>
  )
}

export default Header
