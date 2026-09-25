import React from 'react'
import Cards from './components/Cards'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import Header from './components/Header'
import { API_BASE_URL } from './api/apiClient'

export const serverUrl = API_BASE_URL

function App() {
  return (
    <>
      <div className='d-flex flex-column min-vh-100 bg-page'>
        <Header />
        
        <main className='flex-fill py-4'>
          {/* Hero Banner Carousel */}
          <div className='container-fluid p-0 d-flex justify-content-center'>
            <Carousel />
          </div>

          {/* Value Props Row */}
          <div className="container my-4">
            <div className="row g-3 text-center">
              <div className="col-md-4">
                <div className="p-3 bg-white rounded-4 border shadow-sm h-100 d-flex align-items-center justify-content-center gap-3">
                  <div className="rounded-circle bg-primary-subtle text-primary p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <i className="fas fa-shield-alt fs-5"></i>
                  </div>
                  <div className="text-start">
                    <h6 className="fw-bold mb-0">Verified Products & Owners</h6>
                    <small className="text-muted">Strict quality and ID checks on all listings</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-white rounded-4 border shadow-sm h-100 d-flex align-items-center justify-content-center gap-3">
                  <div className="rounded-circle bg-success-subtle text-success p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <i className="fas fa-truck-fast fs-5"></i>
                  </div>
                  <div className="text-start">
                    <h6 className="fw-bold mb-0">Doorstep Handover</h6>
                    <small className="text-muted">Convenient pickup and return scheduling</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-white rounded-4 border shadow-sm h-100 d-flex align-items-center justify-content-center gap-3">
                  <div className="rounded-circle bg-warning-subtle text-warning p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <i className="fas fa-wallet fs-5"></i>
                  </div>
                  <div className="text-start">
                    <h6 className="fw-bold mb-0">Transparent Daily Rates</h6>
                    <small className="text-muted">No hidden fees, flexible duration extensions</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products & Testimonials */}
          <Cards />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
