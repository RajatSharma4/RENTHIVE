import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardPath = () => {
    if (role === 'admin') return '/adminHome';
    if (role === 'owner') return '/ownerHome';
    return '/userHome';
  };

  const getRoleBadge = () => {
    if (role === 'admin') return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">Admin</span>;
    if (role === 'owner') return <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">Owner</span>;
    return <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">Renter</span>;
  };

  return (
    <header className="sticky-top glass-nav">
      <div className="container">
        <nav className="navbar navbar-expand-lg py-3 px-0">
          {/* Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/">
            <div 
              className="rounded-3 d-inline-flex p-2 text-white shadow-sm" 
              style={{ 
                background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", 
                boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)" 
              }}
            >
              <i className="fas fa-layer-group fs-5"></i>
            </div>
            <div className="d-flex flex-column">
              <span className="brand-title lh-1">
                Rent<span style={{ color: "#4f46e5" }}>Hive</span>
              </span>
              <span className="text-muted fw-semibold text-uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}>
                Smart Rentals
              </span>
            </div>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="navbar-toggler border-0 shadow-none p-2 rounded-3" 
            style={{ backgroundColor: "rgba(79, 70, 229, 0.08)" }}
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#mainNavbar" 
            aria-controls="mainNavbar" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars-staggered fs-4 text-primary"></i>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                  <i className="fas fa-home me-1 opacity-75"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/viewProduct' ? 'active' : ''}`} to="/viewProduct">
                  <i className="fas fa-compass me-1 opacity-75"></i> Browse Rentals
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/aboutus' ? 'active' : ''}`} to="/aboutus">
                  <i className="fas fa-shield-alt me-1 opacity-75"></i> About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">
                  <i className="fas fa-headset me-1 opacity-75"></i> Contact
                </Link>
              </li>
            </ul>

            {/* Right Action Section */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              {isAuthenticated ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-light text-dark bg-white border dropdown-toggle d-flex align-items-center gap-2 py-2 px-3 shadow-sm rounded-pill"
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle text-primary fs-5"></i>
                    <span className="fw-bold" style={{ fontSize: "0.95rem" }}>{user?.name || user?.fullname || "Account"}</span>
                    {getRoleBadge()}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 py-2 mt-2" style={{ minWidth: "220px" }}>
                    <li>
                      <Link className="dropdown-item py-2 fw-semibold" to={getDashboardPath()}>
                        <i className="fas fa-tachometer-alt me-2 text-primary"></i> Dashboard
                      </Link>
                    </li>
                    {role === 'user' && (
                      <li>
                        <Link className="dropdown-item py-2 fw-semibold" to="/userInvoiceData">
                          <i className="fas fa-receipt me-2 text-success"></i> My Bookings
                        </Link>
                      </li>
                    )}
                    {role === 'owner' && (
                      <li>
                        <Link className="dropdown-item py-2 fw-semibold" to="/myProduct">
                          <i className="fas fa-boxes me-2 text-primary"></i> Manage Listings
                        </Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider my-2" /></li>
                    <li>
                      <button 
                        onClick={() => { logout(); navigate('/'); }} 
                        className="dropdown-item py-2 text-danger fw-semibold"
                      >
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <div className="dropdown">
                    <button 
                      className="btn btn-light bg-transparent text-dark border-0 fw-bold px-3 py-2"
                      style={{ fontSize: "0.95rem" }}
                      type="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <i className="fas fa-sign-in-alt me-1 text-primary"></i> Sign In
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 py-2 mt-2" style={{ minWidth: "220px" }}>
                      <li>
                        <Link className="dropdown-item py-2 fw-semibold" to="/userLogin">
                          <i className="fas fa-user text-success me-2"></i> Renter Portal
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-semibold" to="/ownerLogin">
                          <i className="fas fa-store text-primary me-2"></i> Partner / Owner
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider my-2" /></li>
                      <li>
                        <Link className="dropdown-item py-2 text-danger small fw-semibold" to="/adminLogin">
                          <i className="fas fa-shield-alt me-2"></i> Admin Console
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <Link 
                    to="/register" 
                    className="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-bold"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Get Started <i className="fas fa-arrow-right ms-1 small"></i>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
