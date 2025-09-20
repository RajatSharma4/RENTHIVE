import React from 'react'
import '/src/App.css'

const Footer = () => {
  return (
   <>
   <div className='w-100 text-center py-3 d-flex justify-content-evenly gap-4' style={{backgroundColor:"#a7afff"}}>
    <p className='mb-0 text-white'>Copyright © 2025 - All right reserved</p>

   <div className='d-flex gap-5'>
     <span ><i className="fa-brands fa-twitter"></i></span>
    <span ><i className="fa-brands fa-facebook-f"></i></span>
    <span ><i className="fa-brands fa-youtube"></i></span>
   </div>
   </div>
   </>
  )
}

export default Footer
