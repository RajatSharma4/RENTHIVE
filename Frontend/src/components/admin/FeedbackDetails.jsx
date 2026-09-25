import React from 'react'

const FeedbackDetails = ({ feedbackArray }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Remarks</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbackArray.map((f) => {
            const stars = "⭐".repeat(Math.max(1, Math.min(5, Number(f.rating) || 5)))
            return (
              <tr key={f._id}>
                <td className="fw-semibold">{f.fullname}</td>
                <td><a href={`mailto:${f.email}`} className="text-decoration-none">{f.email}</a></td>
                <td><span title={`${f.rating} Stars`}>{stars}</span></td>
                <td style={{ maxWidth: '350px' }}>{f.remarks}</td>
                <td className="text-muted small">
                  {f.date ? new Date(f.date).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackDetails
