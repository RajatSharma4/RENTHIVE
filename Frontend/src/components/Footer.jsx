import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-100 pt-5 pb-4 mt-auto" style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <Link className="d-flex align-items-center gap-2 text-white text-decoration-none fw-bold fs-4 mb-3" to="/">
              <div className="rounded-3 d-inline-flex p-2 text-white" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)" }}>
                <i className="fas fa-layer-group fs-5"></i>
              </div>
              <span className="tracking-tight">RentHive</span>
            </Link>
            <p className="small pe-lg-4 text-secondary">
              Smart renting made simple. RentHive is India's leading peer-to-peer rental marketplace connecting verified owners with quality renters for electronics, furniture, appliances, and luxury goods.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="btn btn-sm btn-dark text-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} title="Twitter / X">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="btn btn-sm btn-dark text-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} title="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="btn btn-sm btn-dark text-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} title="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="btn btn-sm btn-dark text-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} title="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/" className="text-secondary text-decoration-none hover-white">Marketplace Home</Link></li>
              <li><Link to="/viewProduct" className="text-secondary text-decoration-none hover-white">Browse All Items</Link></li>
              <li><Link to="/aboutus" className="text-secondary text-decoration-none hover-white">About Our Story</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-white">Help & Support</Link></li>
              <li><Link to="/register" className="text-secondary text-decoration-none hover-white">Become a Renter</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/viewProduct" className="text-secondary text-decoration-none hover-white">Cameras & Photography</Link></li>
              <li><Link to="/viewProduct" className="text-secondary text-decoration-none hover-white">Laptops & Workstations</Link></li>
              <li><Link to="/viewProduct" className="text-secondary text-decoration-none hover-white">Living Room Furniture</Link></li>
              <li><Link to="/viewProduct" className="text-secondary text-decoration-none hover-white">Audio & DJ Systems</Link></li>
              <li><Link to="/viewProduct" className="text-secondary text-decoration-none hover-white">Vehicles & Bikes</Link></li>
            </ul>
          </div>

          {/* Partner & Trust */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">Monetize With Us</h6>
            <p className="small text-secondary mb-3">
              Have idle gear, furniture, or equipment? List with RentHive and turn your assets into recurring passive income.
            </p>
            <Link to="/ownerRegister" className="btn btn-sm btn-primary rounded-pill w-100 fw-bold mb-2">
              <i className="fas fa-store me-1"></i> Start Earning as Partner
            </Link>
            <div className="small text-secondary mt-2">
              <i className="fas fa-shield-halved text-success me-1"></i> Verified & Insured Listings
            </div>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
          <p className="mb-2 mb-md-0">
            © {new Date().getFullYear()} <strong className="text-white">RentHive Technologies</strong>. All rights reserved.
          </p>
          <div className="d-flex gap-4">
            <Link to="/aboutus" className="text-secondary text-decoration-none">Privacy Policy</Link>
            <Link to="/aboutus" className="text-secondary text-decoration-none">Terms of Service</Link>
            <Link to="/contact" className="text-secondary text-decoration-none">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
