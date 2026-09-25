import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../css/Contact.css'
import apiClient from '../api/apiClient'
import Swal from 'sweetalert2'

const Contact = () => {
    const [contact, setContact] = useState({ firstname: "", lastname: "", email: "", phone: "", message: "" })
    const [loading, setLoading] = useState(false)

    function fetchData(e) {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    async function submitData(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const serverResponse = await apiClient.post('/contact', contact)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: serverResponse.data.message || "Your message has been sent!",
                showConfirmButton: false,
                timer: 2000
            });
            setContact({ firstname: "", lastname: "", email: "", phone: "", message: "" })
        } catch (err) {
            console.error("Contact submit error:", err)
            Swal.fire({
                icon: "error",
                title: "Failed to send message",
                text: err.response?.data?.message || "Please check your network and try again."
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='d-flex flex-column min-vh-100'>
                <Header />
                <main className='flex-fill py-5'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center g-5'>
                            <div className='col-lg-5 text-center text-lg-start'>
                                <h2 className='heading display-6 fw-bold mb-3'>Contact <span className='text-success'>RentHive</span></h2>
                                <p className='text-muted fs-5'>Have a question, need help, or want to know more about our rental services?</p>
                                <p className='fw-bold'>We’re here to assist you!</p>
                                <ul className='list-unstyled text-start d-inline-block'>
                                    <li className='mb-2'>📞 Quick support for owners & renters</li>
                                    <li className='mb-2'>📦 Ask about item listing or availability</li>
                                    <li className='mb-2'>📍 Assistance with bookings, delivery & returns</li>
                                </ul>
                                <p className='text-primary mt-3'>Fill out the form and our team will get back to you promptly.</p>
                            </div>

                            <div className='col-lg-5 col-md-8'>
                                <form className="form shadow-lg p-4 rounded-4" onSubmit={submitData}>
                                    <p className="title text-center">CONTACT US</p>
                                    <div className="flex gap-2">
                                        <label>
                                            <input className="input" type="text" placeholder="" name='firstname' value={contact.firstname} onChange={fetchData} required />
                                            <span>First Name</span>
                                        </label>
                                        <label>
                                            <input className="input" type="text" placeholder="" name='lastname' value={contact.lastname} onChange={fetchData} />
                                            <span>Last Name</span>
                                        </label>
                                    </div>
                                    <label>
                                        <input className="input" type="email" placeholder="" name='email' value={contact.email} onChange={fetchData} required />
                                        <span>Email</span>
                                    </label>
                                    <label>
                                        <input className="input" type="tel" placeholder="" name='phone' value={contact.phone} onChange={fetchData} required />
                                        <span>Phone</span>
                                    </label>
                                    <label>
                                        <textarea className='input' name="message" onChange={fetchData} value={contact.message} rows="4" required></textarea>
                                        <span>Message</span>
                                    </label>
                                    <button type='submit' disabled={loading} className="submit mt-3">
                                        {loading ? "SENDING..." : "SUBMIT"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Contact
