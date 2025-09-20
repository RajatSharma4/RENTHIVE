import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function UserHeader() {

    const navigate = useNavigate()

    const logout = () => {

        localStorage.removeItem("emailKey")
        toast.success("Logged out sucess fully!")
        localStorage.removeItem("user")
        navigate("/userLogin")

    }



    return (<>




        <nav
            className="navbar navbar-dark fixed-top"
            style={{ backgroundColor: "#a7afff" }}
        >
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand mx-auto" to="/">
                    <i className="fas fa-user-circle"></i> RentHive
                </Link>
            </div>
        </nav>

        {/* Offcanvas Sidebar */}
        <div
            className="offcanvas offcanvas-start"
            style={{
                backgroundColor: "#a7afff",
                marginTop: "56px", // height of navbar
            }}
            tabIndex="-1"
            id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                    <i className="fas fa-user"></i> Welcome, User!
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div className="offcanvas-body p-0">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white px-3 py-2" to="/">
                            <i className="fa-solid fa-house"></i> Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white px-3 py-2" to="/viewProduct">
                            <i class="fa-solid fa-magnifying-glass"></i> Search Product
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white px-3 py-2" to="/feedback">
                            <i className="fas fa-comments"></i> Feedback
                        </Link>
                    </li>
                       
                       <li className="nav-item">
                        <Link className="nav-link text-white px-3 py-2" to="/userInvoiceData">
                             <i class="fa-solid fa-file-invoice"></i> View Invoices
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white px-3 py-2" to="/userEditProfile">
                           <i class="fa-solid fa-user-pen"></i> Edit Profile
                        </Link>
                    </li>

                      
                    <li className="nav-item px-3 py-2">
                        <button
                            type="submit"
                            className="btn btn-outline-light w-100 text-start"
                            onClick={logout}
                        >
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </>
    )
}



export default UserHeader
