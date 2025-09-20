import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const InvoiceData = () => {

    const[invoice, setInvoice] = useState([])

    const URL = "http://localhost:4000/owner/allInvoice"

    const fetchData = async()=>{

        try{
      const serverResponse = await axios.get(URL)
      console.log(serverResponse);

      setInvoice(serverResponse.data.InvoiceDetail)
      
        }
        catch(err){
       console.log(err);
       
        }

    }

    useEffect(()=>{
       fetchData()
    }, [])

  return (
   <>

   <h1 className='text-center'>  YOUR INVOICES</h1>

   <table className="table table-success table-striped">

<thead>
     <tr className='table-dark text-light' >
            <th>USERPHONE</th>
            <th>OWNER EMAIL</th>
            <th>DURATION</th>
            <th>RETURN-DATE</th>
            <th>PRODUCT-STATUS</th>
            <th>RENTED-DATE</th>
        </tr>
</thead>


<tbody>

    {
    invoice.map((i)=>{
        return(
             <tr key={i._id}>
                        <td>{i.userPhone}</td>            
                        <td>{i.ownerEmail}</td>
                        <td>{i.duration}</td>
                        <td>{i.returnDate}</td>
                        <td>{i.productStatus}</td>
                        <td>{i.rentedDate}</td>
                    </tr>
        )
    })
   }
</tbody>

   </table>

   
  
   </>
  )
}

export default InvoiceData
