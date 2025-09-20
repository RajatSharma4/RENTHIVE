import React from 'react'  
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'

import axios from 'axios'
import '../css/ViewProduct.css'

const Cards = () => {

 const URL = "http://localhost:4000/user/viewProduct"

  const [product, setProduct] = useState([])
  const [cat, setCat] = useState("")

  const fetchCat = async (selectedCategory) => {
    setCat(selectedCategory)
    try{
      const params={"category":cat}
    const serverResponse = await axios.get(`http://localhost:4000/user/setCategory?category=${selectedCategory}`)
  //  const serverResponse = await axios.get(URL,{params})
      
    setProduct(serverResponse.data.objectData)
    }
    catch(err){
      console.log(err);
      
    }
  }



  const fetchData = async () => {
    try {
      const serverResponse = await axios.get(URL)
      console.log(serverResponse);

      const serverData = serverResponse.data.objectData
      console.log(serverData);

      setProduct(serverData)
    }
    catch (err) {
      console.log(err);

    }
  } //fetchData close

  useEffect(() => {
    fetchData()
  }, [])

    return (
        <>

    <Header/>
     <h3 className='text-center mt-3'>Rent <span className='text-success'> Luxury Products</span> Based on your requirement</h3>

    <div className='selectItems'>
        <select className='' value={cat} name="productCategory" id="" onChange={(e)=> fetchCat(e.target.value)}>
        <option className='text-secondary' value=""  disabled>--Select Category--</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
      </select>
    </div>

     {/* <button onClick={submitData} type='submit'> Show Products</button> */}

      <div className='flex-container'>
        {
          product.map((p) => {
            return (
              <div className='item-div' key={p._id}>
                <img src={`http://localhost:4000/productPics/${p.productPic}`} alt="" height={200} width={270} />

                <p> <b>Name:</b> {p.productName}</p>
                <p> <b>Price:</b> {p.productPrice}</p>
                <p> <b>Category:</b> {p.productCategory}</p>
                <p> <b>SellerName:</b> {p.owner.fullname}</p>
                <p> <b>PhoneNumber:</b> {p.owner.phone}</p>
                <p> <b>Address:</b> {p.owner.address}</p>

                <a href={`https://wa.me/+91${p.owner.phone}?text=}`}>Talk with Owner</a>




              </div>
            )
          })
        }
      </div>




           




            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">What Our Customers Say</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card p-3 shadow-lg">
                                <p>"RentHive made my event so special. Renting a luxury car was super easy!"</p>
                                <h6 className="text-primary">- Rahul Mehta</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 shadow-lg">
                                <p>"I rented professional camera gear for my shoot, and the quality was amazing!"</p>
                                <h6 className="text-primary">- Ananya Singh</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 shadow-lg">
                                <p>"Very trustworthy service. I even rented out my bike and earned extra income!"</p>
                                <h6 className="text-primary">- Arjun Verma</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-5  text-white text-center" style={{backgroundColor:"#a7afff"}}>
                <div className="container">
                    <h2>Ready to Rent or Earn?</h2>
                    <p>Join thousands of happy customers and start today!</p>
                    <button className="btn btn-light btn-lg mt-2"><Link className="dropdown-item" to="/register">Get Started</Link></button>
                </div>
            </section>
        </>
    )
}

export default Cards
