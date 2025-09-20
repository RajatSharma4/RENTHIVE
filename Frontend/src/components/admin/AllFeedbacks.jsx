import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FeedbackDetails from './FeedbackDetails'

const AllFeedbacks = () => {

    const[feedbacks, setFeedbacks] = useState([])
   
  const URL = "http://localhost:4000/admin/allFeedbacks" 

  const fetchData = async()=>{
    try{

        const serverResponse = await axios.get(URL)
        console.log(serverResponse);
       setFeedbacks(serverResponse.data.FeedbackDetails);
        
        

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
   <div className='min-vh-100'>
    <h1 className='text-center text-success'>FEEDBACKS</h1>
   <FeedbackDetails feedbackArray = {feedbacks}/>
   </div>
   </>
  )
}

export default AllFeedbacks
