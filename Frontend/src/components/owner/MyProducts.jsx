import React from 'react'
import OwnerHeader from './OwnerHeader'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../css/MyProduct.css'

const MyProducts = () => {

    const URL = "http://localhost:4000/owner/myProduct"


    const [myProduct, setMyProduct] = useState([])

    const emailId = localStorage.getItem("emailKey")
    console.log(emailId);
    

    const fetchData = async () => {
        try {

            const params = { "email": emailId }

            const serverResponse = await axios.get(URL,  {params} )
            console.log(serverResponse);

            const serverData = serverResponse.data.objectData
            console.log(serverData);

            setMyProduct(serverData)
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
            <OwnerHeader />

            <h1>My Products</h1>

            <div className='flex-container'>
      {
        myProduct.map((p)=>{
            return(
                <div className='item-div1' key={p._id}>
                        <img src={`http://localhost:4000/productPics/${p.productPic}`} alt="" height={200} width={270} />

                        <p> <b>Name:</b> {p.productName}</p>
                        <p> <b>Price:</b> {p.productPrice}</p>
                        <p> <b>Category:</b> {p.productCategory}</p>
                        
                      <Link to="/updateInventory" state={{productInfo:p}}>
                        <button type='submit'>Update Inventory</button>
                      </Link>

                        {/* <p> <b>OwnerName:</b> {p.owner.fullname}</p>
                        <p> <b>PhoneNumber:</b> {p.owner.phone}</p>
                        <p> <b>Address:</b> {p.owner.address}</p> */}
                  

                </div>
            )
        })
      }
   </div>

        </>
    )
}

export default MyProducts
