import React from 'react'
import Header from './Header'
import Footer from './Footer'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

const About_Us = () => {
  return (
    <>
    <div className='d-flex flex-column min-vh-100'>
      <Header/>

      <main className='flex-fill'>

   


    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">
            About <span className="text-success">RentHive</span>
          </h2>
          <p className="text-muted">
            Smart Renting Made Simple – Your Trusted Partner for Quality Rental Products
          </p>
        </div>

        {/* Our Story */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h4 className="text-dark fw-semibold">Our Story</h4>
            <p className="text-muted">
              RentHive was born out of a simple idea – to make premium products accessible without
              the burden of ownership. We understand the changing needs of modern living, where
              flexibility, affordability, and sustainability matter. That's why RentHive offers a
              seamless rental experience for a wide range of products including electronics,
              furniture, home appliances, and more.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/Renthive.jpg"
              alt="Our Story"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="row mb-5 ">
          <div className="col-md-6">
            <div className="bg-white p-4 rounded shadow h-100">
              <h5 className="fw-bold text-success">Our Mission</h5>
              <p className="text-muted">
                To empower individuals and families by providing access to high-quality products on
                rent, ensuring convenience, flexibility, and value for money.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-white p-4 rounded shadow h-100 mt-3 mt-md-0">
              <h5 className="fw-bold text-success">Our Vision</h5>
              <p className="text-muted">
                To become India’s most trusted and customer-friendly rental platform, where renting
                is the first choice—not the last.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-4">
          <h4 className="fw-semibold text-dark">Why Choose Us</h4>
        </div>
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow text-center">
              <i className="bi bi-box-seam fs-2 text-success mb-3"></i>
              <h6 className="fw-bold">Wide Product Range</h6>
              <p className="text-muted small">
                From electronics to furniture – rent everything under one roof.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow text-center">
              <i className="bi bi-shield-lock fs-2 text-success mb-3"></i>
              <h6 className="fw-bold">Secure & Hassle-free</h6>
              <p className="text-muted small">
                Your transactions and rentals are safe and transparent.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow text-center">
              <i className="bi bi-truck fs-2 text-success mb-3"></i>
              <h6 className="fw-bold">Quick Delivery</h6>
              <p className="text-muted small">
                Get your products delivered to your doorstep quickly.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <a href="/products" className="btn btn-success btn-lg px-5">
            Explore Our Products
          </a>
        </div>
      </div>
    </section>





      </main>

      <Footer/>

    </div>
    </>
  )
}

export default About_Us
