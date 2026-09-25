import React from 'react'

const ContactDetails = ({ contactArray }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Received Date</th>
          </tr>
        </thead>
        <tbody>
          {contactArray.map((c) => (
            <tr key={c._id}>
              <td className="fw-semibold">{c.firstname} {c.lastname}</td>
              <td><a href={`mailto:${c.email}`} className="text-decoration-none">{c.email}</a></td>
              <td>{c.phone || 'N/A'}</td>
              <td style={{ maxWidth: '300px' }} className="text-truncate">{c.message}</td>
              <td className="text-muted small">
                {c.date ? new Date(c.date).toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactDetails
