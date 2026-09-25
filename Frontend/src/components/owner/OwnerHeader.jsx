import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { getImageUrl } from '../../utils/imageHelper'

function OwnerHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully!")
        navigate("/ownerLogin")
    }

    return (
        <>
            <header className="sticky-top glass-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-lg py-3 px-0">
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="navbar-toggler border-0 p-2 rounded-3 shadow-none d-block d-lg-none"
                                style={{ backgroundColor: "rgba(79, 70, 229, 0.1)" }}
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#ownerSidebar"
                                aria-controls="ownerSidebar"
                            >
                                <i className="fas fa-bars-staggered fs-4 text-primary"></i>
                            </button>

                            <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/">
                                <div 
                                    className="rounded-3 d-inline-flex p-2 text-white shadow-sm" 
                                    style={{ 
                                        background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", 
                                        boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)" 
                                    }}
                                >
                                    <i className="fas fa-store fs-5"></i>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="brand-title lh-1">
                                        Rent<span style={{ color: "#4f46e5" }}>Hive</span>
                                    </span>
                                    <span className="text-muted fw-semibold text-uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}>
                                        Partner Console
                                    </span>
                                </div>
                            </Link>

                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle d-none d-sm-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill small fw-semibold">
                                <span className="spinner-grow spinner-grow-sm text-primary" style={{ width: "8px", height: "8px" }} role="status"></span>
                                Verified Owner
                            </span>
                        </div>

                        {/* Desktop Navigation Links */}
                        <ul className="navbar-nav mx-auto d-none d-lg-flex align-items-center gap-2">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/ownerHome' ? 'active' : ''}`} to="/ownerHome">
                                    <i className="fas fa-chart-pie me-1 opacity-75"></i> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/addProduct' ? 'active' : ''}`} to="/addProduct">
                                    <i className="fas fa-plus-circle me-1 opacity-75"></i> Add Listing
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/myProduct' ? 'active' : ''}`} to="/myProduct">
                                    <i className="fas fa-boxes me-1 opacity-75"></i> My Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/invoiceData' ? 'active' : ''}`} to="/invoiceData">
                                    <i className="fas fa-file-invoice-dollar me-1 opacity-75"></i> Rental Records
                                </Link>
                            </li>
                        </ul>

                        {/* Right Profile & Drawer Toggle */}
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-outline-light text-dark bg-white border d-flex align-items-center gap-2 py-2 px-3 shadow-sm rounded-pill"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#ownerSidebar"
                            >
                                <img 
                                    src={getImageUrl('profilePics', user?.pic, 'avatar')} 
                                    alt="Owner Avatar" 
                                    className="rounded-circle"
                                    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                />
                                <span className="fw-bold d-none d-md-inline" style={{ fontSize: "0.95rem" }}>{user?.fullname || user?.name || "Partner"}</span>
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
                id="ownerSidebar"
                aria-labelledby="ownerSidebarLabel"
            >
                <div className="offcanvas-header p-4 border-bottom border-secondary border-opacity-25">
                    <div className="d-flex align-items-center gap-3">
                        <img 
                            src={getImageUrl('profilePics', user?.pic, 'avatar')} 
                            alt="Owner Avatar" 
                            className="rounded-circle border border-2 border-primary shadow"
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                        />
                        <div>
                            <h6 className="mb-0 text-white fw-bold">{user?.fullname || user?.name || "Partner Store"}</h6>
                            <small className="text-light opacity-75">{user?.email || "owner@renthive.com"}</small>
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
                        <small className="text-uppercase fw-bold text-light opacity-50 px-2" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>Store Management</small>
                        
                        <Link 
                            to="/ownerHome" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/ownerHome' ? 'bg-primary text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-chart-pie fs-5"></i>
                            <span>Dashboard</span>
                        </Link>

                        <Link 
                            to="/addProduct" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/addProduct' ? 'bg-primary text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-plus-circle fs-5"></i>
                            <span>Add New Listing</span>
                        </Link>

                        <Link 
                            to="/myProduct" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/myProduct' ? 'bg-primary text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-boxes fs-5"></i>
                            <span>My Listed Products</span>
                        </Link>

                        <Link 
                            to="/invoiceData" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/invoiceData' ? 'bg-primary text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-file-invoice-dollar fs-5"></i>
                            <span>Rental Invoices</span>
                        </Link>

                        <Link 
                            to="/ownerEditProfile" 
                            data-bs-dismiss="offcanvas"
                            className={`d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none transition ${location.pathname === '/ownerEditProfile' ? 'bg-primary text-white fw-bold shadow' : 'text-light opacity-80'}`}
                            style={{ transition: 'all 0.2s' }}
                        >
                            <i className="fas fa-store-alt fs-5"></i>
                            <span>Edit Store Details</span>
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

export default OwnerHeader
