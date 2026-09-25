import React from 'react'
import { Link } from 'react-router-dom'

const Carousel = () => {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      tag: "Cameras & Film Gear",
      title: "Shoot Like a Pro Without the Huge Price Tag",
      subtitle: "Rent Sony, Canon, RED, and cinema lenses on flexible daily rates.",
      link: "/viewProduct"
    },
    {
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      tag: "Luxury Living & Furniture",
      title: "Upgrade Your Home With Designer Furniture",
      subtitle: "Rent ergonomic sofas, recliners, and modern workstations hassle-free.",
      link: "/viewProduct"
    },
    {
      img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
      tag: "High-End Electronics",
      title: "MacBooks, Gaming Rigs & VR Headsets",
      subtitle: "Experience top-tier tech for work, gaming, or hackathons on demand.",
      link: "/viewProduct"
    }
  ]

  return (
    <div className="w-100 px-3 my-2" style={{ maxWidth: "1140px" }}>
      <div 
        id="heroCarousel" 
        className="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden border"
        data-bs-ride="carousel"
        data-bs-interval="4500"
      >
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
              style={{ height: "420px", position: "relative" }}
            >
              <img 
                src={slide.img} 
                className="d-block w-100 h-100" 
                alt={slide.title}
                style={{ objectFit: "cover" }}
              />
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                style={{ 
                  background: "linear-gradient(90deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%)",
                  padding: "0 8%"
                }}
              >
                <div className="text-white" style={{ maxWidth: "600px" }}>
                  <span className="badge bg-primary px-3 py-2 rounded-pill text-uppercase fw-bold mb-3" style={{ letterSpacing: "0.05em" }}>
                    {slide.tag}
                  </span>
                  <h2 className="display-6 fw-bold text-white mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                    {slide.title}
                  </h2>
                  <p className="fs-6 text-light mb-4 opacity-90 d-none d-sm-block">
                    {slide.subtitle}
                  </p>
                  <Link to={slide.link} className="btn btn-primary rounded-pill px-4 py-2 shadow fw-bold">
                    Explore Catalog <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon rounded-circle p-3 bg-dark bg-opacity-50" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon rounded-circle p-3 bg-dark bg-opacity-50" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousel
