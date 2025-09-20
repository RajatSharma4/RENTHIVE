import React from 'react'

const ContactDetails = ({contactArray}) => {
  return (
  <>
  <table className="table table-success table-striped">
    <thead>
        <tr className='table-dark text-light' >
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
        </tr>
    </thead>

    <tbody>
        {
            contactArray.map((contact)=>{
                return(
                    <tr key={contact._id}>
                        <td>{contact.firstname}</td>
                        <td>{contact.lastname}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.message}</td>
                        <td>{contact.date}</td>
                    </tr>
                )
            })
        }
    </tbody>
  </table>
  </>
  )
}

export default ContactDetails
