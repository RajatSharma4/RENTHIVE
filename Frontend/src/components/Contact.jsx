import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../css/Contact.css'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Contact = () => {

    const [contact, setContact] = useState({ firstname: "", lastname: "", email: "", phone: "", message: "" })

    const URL = "http://localhost:4000/contact"

    function fechData(e) {
        setContact({ ...contact, [e.target.name]: e.target.value })
        console.log(contact);

    }

    async function submitData(e) {

        e.preventDefault()

        try {
            const serverResponse = await axios.post(URL, contact)
            console.log(serverResponse);


            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Details have been saved",
                showConfirmButton: false,
                timer: 1500
            });

            setContact({ firstname: "", lastname: "", email: "", phone: "", message: "" })   //empty all fields


        }
        catch (err) {
            console.log(err);

        }

    }




    return (
        <>
            <div className='d-flex flex-column min-vh-100'>
                <Header />

                <main className='flex-fill'>



                    <div className='d-flex flex-wrap' style={{gap:"14vw"}}>

                        <div className='d-flex flex-column justify-content-center align-items-center text-center'>
                            <h2 className='heading'>Contact <span className='text-success'>Renthive</span></h2>
                            <p>Have a question, need help, or want to know more about our rental services?</p>

                            <p><strong>We’re here to assist you!</strong></p>

                            <ul>
                                <li>📞 Quick support for owners & renters</li>
                                <li>📦 Ask about item listing or availability</li>
                                <li>📍 Get help with delivery & returns</li>
                            </ul>

                            <p className='text-primary'>Just fill out the form and we’ll get back to you shortly.</p>

                        </div>



                        <div className='mx-4'>
                            <form className="form" onSubmit={submitData}>
                                <p className="title">CONTACT US</p>

                                <div className="flex">
                                    <label>
                                        <input className="input" type="text" placeholder="" name='firstname' value={contact.firstname} onChange={fechData} required />
                                        <span>FirstName</span>
                                    </label>

                                    <label>
                                        <input className="input" type="text" placeholder="" name='lastname' value={contact.lastname} onChange={fechData} required />
                                        <span>LastName</span>
                                    </label>
                                </div>

                                <label>
                                    <input className="input" type="email" placeholder="" name='email' value={contact.email} onChange={fechData} required />
                                    <span>Email</span>
                                </label>


                                <label>
                                    <input className="input" type="number" placeholder="" name='phone' value={contact.phone} onChange={fechData} required />
                                    <span>Phone</span>
                                </label>

                                <label>
                                    <textarea className='input' name="message" onChange={fechData} value={contact.message} required></textarea>
                                    <span>Message</span>
                                </label>

                                <button type='submit' className="submit">SUBMIT</button>

                            </form>

                        </div>

                    </div>

                </main>


                <Footer />
            </div>
        </>
    )
}

export default Contact
