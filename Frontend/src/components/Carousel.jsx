import React from 'react'
import '/src/App.css'

const Carousel = () => {
  return (
   <>
   <div id="carouselExampleFade" className="carousel slide carousel-fade mt-0 bg-light" style={{boxShadow:"0px 0px 20px black", height:"400px", width:"700px", borderRadius:"15px"}}>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/img1.png" className="img-fluid w-100" alt="..."  style={{objectFit:"cover", height:"60vh",borderRadius:"15px"}}/>
    </div>
    <div className="carousel-item">
      <img src="/img2.png" className="img-fluid w-100" alt="..."  style={{objectFit:"cover", height:"60vh",borderRadius:"15px"}}/>
    </div>
    <div className="carousel-item">
      <img src="img3.png" className="img-fluid w-100" alt="..."  style={{objectFit:"cover", height:"60vh",borderRadius:"15px"}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
   </>
  )
}

export default Carousel
