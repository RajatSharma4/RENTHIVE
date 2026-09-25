import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

function AdminHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        toast.success("Admin logged out successfully!")
        navigate("/adminLogin")
    }

    return (
        <>
            <header className="sticky-top glass-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-lg py-3 px-0">
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="navbar-toggler border-0 p-2 rounded-3 shadow-none d-block d-lg-none"
                                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#adminSidebar"
                                aria-controls="adminSidebar"
                            >
                                <i className="fas fa-bars-staggered fs-4 text-danger"></i>
                            </button>

                            <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/adminHome">
                                <div 
                                    className="rounded-3 d-inline-flex p-2 text-white shadow-sm" 
                                    style={{ 
                                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", 
                                        boxShadow: "0 4px 14px rgba(239, 68, 68, 0.35)" 
                                    }}
                                >
                                    <i className="fas fa-shield-alt fs-5"></i>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="brand-title lh-1">
                                        Rent<span style={{ color: "#ef4444" }}>Hive</span>
                                    </span>
                                    <span className="text-muted fw-semibold text-uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}>
                                        Admin Console
                                    </span>
                                </div>
                            </Link>

                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle d-none d-sm-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill small fw-semibold">
                                <i className="fas fa-lock me-1"></i> Root Superadmin
                            </span>
                        </div>

                        {/* Desktop Navigation Links */}
                        <ul className="navbar-nav mx-auto d-none d-lg-flex align-items-center gap-2">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/adminHome' ? 'active' : ''}`} to="/adminHome">
                                    <i className="fas fa-tachometer-alt me-1 opacity-75"></i> Console
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/allUsers' ? 'active' : ''}`} to="/allUsers">
                                    <i className="fas fa-users me-1 opacity-75"></i> Renters
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/allOwners' ? 'active' : ''}`} to="/allOwners">
                                    <i className="fas fa-store me-1 opacity-75"></i> Partners
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/allContacts' ? 'active' : ''}`} to="/allContacts">
                                    <i className="fas fa-envelope-open-text me-1 opacity-75"></i> Inquiries
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/allFeedbacks' ? 'active' : ''}`} to="/allFeedbacks">
                                    <i className="fas fa-star me-1 opacity-75"></i> Feedbacks
                                </Link>
                            </li>
                        </ul>

                        {/* Right Profile & Drawer Toggle */}
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-outline-light text-dark bg-white border d-flex align-items-center gap-2 py-2 px-3 shadow-sm rounded-pill"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#adminSidebar"
                            >
                                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                    <i className="fas fa-user-shield small"></i>
                                </div>
                                <span className="fw-bold d-none d-md-inline" style={{ fontSize: "0.95rem" }}>{user?.name || "Admin"}</span>
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
                id="adminSidebar"
                aria-labelledby="adminSidebarLabel"
            >
                <div className="offcanvas-header p-4 border-bottom border-secondary border-opacity-25">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center shadow" style={{ width: '48px', height: '48px' }}>
                            <i className="fas fa-user-shield fs-4"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 text-white fw-bold">{user?.name || "Administrator"}</h6>
                            <small className="text-light opacity-75">{user?.email || "admin@renthive.com"}</small>
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
                        <small className="text-uppercase fw-bold text-light opacity-50 px-2" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>System Navigation</small>
                        
                        <Link 
                            to="/adminHome" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/adminHome' ? 'bg-danger text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-tachometer-alt fs-5"></i>
                            <span>Admin Console</span>
                        </Link>

                        <Link 
                            to="/allUsers" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/allUsers' ? 'bg-danger text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-users fs-5"></i>
                            <span>Registered Renters</span>
                        </Link>

                        <Link 
                            to="/allOwners" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/allOwners' ? 'bg-danger text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-store fs-5"></i>
                            <span>Rental Partners</span>
                        </Link>

                        <Link 
                            to="/allContacts" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/allContacts' ? 'bg-danger text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-envelope-open-text fs-5"></i>
                            <span>Contact Inquiries</span>
                        </Link>

                        <Link 
                            to="/allFeedbacks" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/allFeedbacks' ? 'bg-danger text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-star fs-5"></i>
                            <span>User Feedback</span>
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
                        <i className="fas fa-sign-out-alt"></i> Exit Admin Session
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminHeader
