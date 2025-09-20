import React from 'react'

const FeedbackDetails = ({feedbackArray}) => {
  return (
   <>
    <table className="table table-success table-striped">
    <thead>
        <tr className='table-dark text-light' >
            <th>FullName</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Remarks</th>
            <th>Date</th>
        </tr>
    </thead>

    <tbody>
        {
           feedbackArray.map((feedback)=>{
                return(
                    <tr key={feedback._id}>
                        <td>{feedback.fullname}</td>            
                        <td>{feedback.email}</td>
                        <td>{feedback.rating}</td>
                        <td>{feedback.remarks}</td>
                        <td>{feedback.date}</td>
                    </tr>
                )
            })
        }
    </tbody>
  </table>

   </>
  )
}

export default FeedbackDetails
