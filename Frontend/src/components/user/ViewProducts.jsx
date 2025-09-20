import React from 'react'
import UserHeader from './UserHeader'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../css/ViewProduct.css'


const ViewProducts = () => {

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
      <UserHeader />
      <h1>view Products</h1>

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



    </>
  )
}

export default ViewProducts
