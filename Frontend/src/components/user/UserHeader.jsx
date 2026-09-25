import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { getImageUrl } from '../../utils/imageHelper'

function UserHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully!")
        navigate("/userLogin")
    }

    return (
        <>
            <header className="sticky-top glass-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-lg py-3 px-0">
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="navbar-toggler border-0 p-2 rounded-3 shadow-none d-block d-lg-none"
                                style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#userSidebar"
                                aria-controls="userSidebar"
                            >
                                <i className="fas fa-bars-staggered fs-4 text-success"></i>
                            </button>

                            <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/">
                                <div 
                                    className="rounded-3 d-inline-flex p-2 text-white shadow-sm" 
                                    style={{ 
                                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", 
                                        boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)" 
                                    }}
                                >
                                    <i className="fas fa-layer-group fs-5"></i>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="brand-title lh-1">
                                        Rent<span style={{ color: "#10b981" }}>Hive</span>
                                    </span>
                                    <span className="text-muted fw-semibold text-uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}>
                                        Renter Portal
                                    </span>
                                </div>
                            </Link>

                            <span className="badge bg-success-subtle text-success border border-success-subtle d-none d-sm-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill small fw-semibold">
                                <span className="spinner-grow spinner-grow-sm text-success" style={{ width: "8px", height: "8px" }} role="status"></span>
                                Verified Renter
                            </span>
                        </div>

                        {/* Desktop Navigation Links */}
                        <ul className="navbar-nav mx-auto d-none d-lg-flex align-items-center gap-2">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/userHome' ? 'active' : ''}`} to="/userHome">
                                    <i className="fas fa-tachometer-alt me-1 opacity-75"></i> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/viewProduct' ? 'active' : ''}`} to="/viewProduct">
                                    <i className="fas fa-compass me-1 opacity-75"></i> Browse Items
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/userInvoiceData' ? 'active' : ''}`} to="/userInvoiceData">
                                    <i className="fas fa-receipt me-1 opacity-75"></i> My Bookings
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/feedback' ? 'active' : ''}`} to="/feedback">
                                    <i className="fas fa-star me-1 opacity-75"></i> Feedback
                                </Link>
                            </li>
                        </ul>

                        {/* Right Profile & Drawer Toggle */}
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-outline-light text-dark bg-white border d-flex align-items-center gap-2 py-2 px-3 shadow-sm rounded-pill"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#userSidebar"
                            >
                                <img 
                                    src={getImageUrl('userPics', user?.pic, 'avatar')} 
                                    alt="Avatar" 
                                    className="rounded-circle"
                                    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                />
                                <span className="fw-bold d-none d-md-inline" style={{ fontSize: "0.95rem" }}>{user?.name || "Renter"}</span>
                                <i className="fas fa-angle-down text-muted small"></i>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Offcanvas Drawer */}
            <div
                className="offcanvas offcanvas-start border-0 shadow-lg"
                style={{ backgroundColor: "#0f172a", color: "#f8fafc", width: "320px" }}
                tabIndex="-1"
                id="userSidebar"
                aria-labelledby="userSidebarLabel"
            >
                <div className="offcanvas-header p-4 border-bottom border-secondary border-opacity-25">
                    <div className="d-flex align-items-center gap-3">
                        <img 
                            src={getImageUrl('userPics', user?.pic, 'avatar')} 
                            alt="Avatar" 
                            className="rounded-circle border border-2 border-success shadow"
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                        />
                        <div>
                            <h6 className="mb-0 text-white fw-bold">{user?.name || "Renter Account"}</h6>
                            <small className="text-light opacity-75">{user?.email || "user@renthive.com"}</small>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="offcanvas-body p-4 d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column gap-2">
                        <small className="text-uppercase fw-bold text-light opacity-50 px-2" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>Menu</small>
                        
                        <Link 
                            to="/userHome" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/userHome' ? 'bg-success text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-tachometer-alt fs-5"></i>
                            <span>Dashboard</span>
                        </Link>

                        <Link 
                            to="/viewProduct" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/viewProduct' ? 'bg-success text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-compass fs-5"></i>
                            <span>Browse Rentals</span>
                        </Link>

                        <Link 
                            to="/userInvoiceData" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/userInvoiceData' ? 'bg-success text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-receipt fs-5"></i>
                            <span>My Bookings & Invoices</span>
                        </Link>

                        <Link 
                            to="/userEditProfile" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/userEditProfile' ? 'bg-success text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-user-edit fs-5"></i>
                            <span>Edit Profile</span>
                        </Link>

                        <Link 
                            to="/feedback" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/feedback' ? 'bg-success text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-star fs-5"></i>
                            <span>Leave Feedback</span>
                        </Link>

                        <hr className="border-secondary border-opacity-25 my-3" />

                        <Link 
                            to="/" 
                            data-bs-dismiss="offcanvas"
                            className="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none text-light opacity-80"
                        >
                            <i className="fas fa-globe fs-5"></i>
                            <span>Public Website</span>
                        </Link>
                    </div>

                    <button 
                        onClick={handleLogout}
                        data-bs-dismiss="offcanvas"
                        className="btn btn-outline-danger w-100 py-3 mt-4 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserHeader
