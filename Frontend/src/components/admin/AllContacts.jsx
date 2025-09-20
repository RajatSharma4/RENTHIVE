import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ContactDetails from './ContactDetails'

const AllContacts = () => {

    const[contact, setContact] = useState([])

    const URL = "http://localhost:4000/admin/allContacts"

    const fetchData = async()=>{   
        try{
       const serverResponse = await axios.get(URL)
       console.log(serverResponse);
       setContact(serverResponse.data.ContactDetails)
       
        }
        catch(err){
            console.log(err);
            
        }
    }

    //useEffect calling

    useEffect(()=>{
          fetchData()
    },[])

  return (
    <>
    <h1 className='text-center'>CONTACT DETAILS</h1>
   <ContactDetails contactArray = {contact}/>
    </>
  )
}

export default AllContacts
