import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const About_Us = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-fill">
          {/* Hero Section */}
          <section className="py-5" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff' }}>
            <div className="container py-4 text-center">
              <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: 'rgba(99, 102, 241, 0.25)', color: '#a5b4fc', border: '1px solid rgba(165, 180, 252, 0.3)' }}>
                About RentHive
              </span>
              <h1 className="display-4 fw-bold mb-3 text-white">
                Smarter Access. <span style={{ color: '#10b981' }}>Zero Hassle.</span>
              </h1>
              <p className="lead mx-auto text-light" style={{ maxWidth: '680px', opacity: 0.9 }}>
                RentHive connects verified asset owners with savvy renters across India. Rent premium electronics, designer furniture, appliances, and vehicles with complete peace of mind.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/viewProduct" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow">
                  <i className="fas fa-search me-2"></i>Explore Catalog
                </Link>
                <Link to="/contact" className="btn btn-outline-light px-4 py-2 rounded-pill fw-semibold">
                  Get in Touch
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="py-4 bg-white border-bottom shadow-sm">
            <div className="container">
              <div className="row text-center g-4">
                <div className="col-6 col-md-3">
                  <h3 className="fw-bold mb-0 text-primary">50,000+</h3>
                  <small className="text-muted text-uppercase fw-semibold">Items Rented</small>
                </div>
                <div className="col-6 col-md-3">
                  <h3 className="fw-bold mb-0 text-success">15,000+</h3>
                  <small className="text-muted text-uppercase fw-semibold">Active Renters</small>
                </div>
                <div className="col-6 col-md-3">
                  <h3 className="fw-bold mb-0 text-primary">2,500+</h3>
                  <small className="text-muted text-uppercase fw-semibold">Verified Owners</small>
                </div>
                <div className="col-6 col-md-3">
                  <h3 className="fw-bold mb-0 text-success">99.8%</h3>
                  <small className="text-muted text-uppercase fw-semibold">Satisfaction Rate</small>
                </div>
              </div>
            </div>
          </section>

          {/* Story & Vision Section */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="row align-items-center g-5">
                <div className="col-lg-6">
                  <span className="text-primary text-uppercase fw-bold small">Our Story</span>
                  <h2 className="fw-bold mt-1 mb-4">Why Buy When You Can Rent Smarter?</h2>
                  <p className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                    RentHive was born out of a simple, modern realization: ownership is heavy, expensive, and inflexible. In an era where work, lifestyles, and technology evolve faster than ever, access is far more empowering than permanent possession.
                  </p>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                    Whether you are a creator needing a cinema camera for a weekend shoot, an expat furnishing a temporary apartment, or a tech enthusiast testing the latest gadgets, RentHive brings verified equipment directly to your doorstep.
                  </p>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="p-3 bg-white rounded-3 shadow-sm border-start border-4 border-primary">
                        <h6 className="fw-bold mb-1">Sustainable Living</h6>
                        <small className="text-muted">Extending product lifecycles reduces e-waste and promotes a circular economy.</small>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 bg-white rounded-3 shadow-sm border-start border-4 border-success">
                        <h6 className="fw-bold mb-1">Community Trust</h6>
                        <small className="text-muted">Rigorous phone, ID, and review checks keep transactions safe for everyone.</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 text-center">
                  <div className="position-relative d-inline-block">
                    <img
                      src="/Renthive.jpg"
                      alt="RentHive Marketplace"
                      className="img-fluid rounded-4 shadow-lg"
                      style={{ maxHeight: '420px', width: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=700&q=80";
                      }}
                    />
                    <div className="position-absolute bottom-0 start-0 m-3 p-3 bg-white rounded-3 shadow text-start d-none d-sm-block" style={{ maxWidth: '240px' }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="fas fa-shield-alt text-success fs-5"></i>
                        <span className="fw-bold small">Verified Protection</span>
                      </div>
                      <small className="text-muted">Safe escrow & identity security on every single booking.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Cards */}
          <section className="py-5 bg-white">
            <div className="container">
              <div className="text-center mb-5">
                <span className="text-success text-uppercase fw-bold small">Core Philosophy</span>
                <h2 className="fw-bold mt-1">Guided By Clear Purpose</h2>
                <p className="text-muted">Building India’s premier asset-sharing ecosystem.</p>
              </div>

              <div className="row g-4 justify-content-center">
                <div className="col-md-6 col-lg-5">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', border: '1px solid #e2e8f0' }}>
                    <div className="rounded-circle bg-primary text-white d-inline-flex p-3 mb-4 shadow-sm" style={{ width: '60px', height: '60px', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-bullseye fs-4"></i>
                    </div>
                    <h4 className="fw-bold mb-3">Our Mission</h4>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                      To democratize access to premium goods by transforming underutilized assets into shared value. We empower renters with affordability and flexibility while enabling owners to generate steady passive income.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-5">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ecfdf5 100%)', border: '1px solid #e2e8f0' }}>
                    <div className="rounded-circle bg-success text-white d-inline-flex p-3 mb-4 shadow-sm" style={{ width: '60px', height: '60px', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-eye fs-4"></i>
                    </div>
                    <h4 className="fw-bold mb-3">Our Vision</h4>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                      To establish renting as the preferred, modern, and conscious first choice over outright purchasing—fostering zero-waste urban communities where sharing quality goods is seamless and effortless.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars of RentHive */}
          <section className="py-5 bg-light">
            <div className="container">
              <div className="text-center mb-5">
                <span className="text-primary text-uppercase fw-bold small">Why RentHive</span>
                <h2 className="fw-bold mt-1">Built for Renters & Owners Alike</h2>
                <p className="text-muted">A modern platform engineered for trust, speed, and convenience.</p>
              </div>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                    <div className="rounded-circle bg-light text-primary d-inline-flex p-3 mx-auto mb-3" style={{ width: '64px', height: '64px', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-boxes fs-3"></i>
                    </div>
                    <h5 className="fw-bold">Extensive Catalog</h5>
                    <p className="text-muted small mb-0">From cameras, audio gears, laptops to designer couches and mountain bikes, find exactly what you need.</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                    <div className="rounded-circle bg-light text-success d-inline-flex p-3 mx-auto mb-3" style={{ width: '64px', height: '64px', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-shield-alt fs-3"></i>
                    </div>
                    <h5 className="fw-bold">Verified & Safe</h5>
                    <p className="text-muted small mb-0">Every member passes identity checks. Transparent security deposits and condition reports protect both parties.</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                    <div className="rounded-circle bg-light text-primary d-inline-flex p-3 mx-auto mb-3" style={{ width: '64px', height: '64px', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-comments fs-3"></i>
                    </div>
                    <h5 className="fw-bold">Instant Communication</h5>
                    <p className="text-muted small mb-0">Connect directly with owners via integrated WhatsApp and in-app booking notifications for rapid fulfillment.</p>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center mt-5">
                <Link to="/viewProduct" className="btn btn-primary btn-lg px-5 rounded-pill shadow">
                  Browse Rental Products <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default About_Us
