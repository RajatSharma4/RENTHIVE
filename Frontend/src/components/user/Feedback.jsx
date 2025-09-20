import React from 'react'
import '../../css/Feedback.css'
import Footer from '../Footer'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from './UserHeader'

const Feedback = () => {

    const email = localStorage.getItem("emailKey")

    const user = JSON.parse(localStorage.getItem("user"))

    const [feedback, setFeedback] = useState({ fullname: user.name ,email: email, rating: "", remarks: "" })

    const URL = "http://localhost:4000/user/feedback"

    function fechData(e) {
        setFeedback({ ...feedback, [e.target.name]: e.target.value })
        console.log(feedback);

    }

    async function submitData(e) {

        e.preventDefault()

        try {
            const serverResponse = await axios.post(URL, feedback)
            console.log(serverResponse);



            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Details have been saved",
                showConfirmButton: false,
                timer: 1500
            });


            setFeedback({ fullname: "", email: "", rating: "", remarks: "" })


        }
        catch (err) {
            console.log(err);

        }

    }




    return (
        <>
            <div className='d-flex flex-column min-vh-100'>
               <div className='mb-3'>
                 <UserHeader/>
               </div>

                <h1 className='mt-5 text-center '>GIVE YOUR FEEDBACK</h1>
                <main className='flex-fill'>

                    <div className='d-flex justify-content-center mt-0.5'>
                        <div className="form-container">
                            <form className="form" onSubmit={submitData}>
                                <div className="form-group">
                                    <label htmlFor="fullname">FullName</label>
                                    <input type="text" id="fullname" name="fullname" value={feedback.fullname} onChange={fechData} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"> Email</label>
                                    <input type="text" id="email" name="email" value={feedback.email} onChange={fechData} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating:
                                        <strong>{feedback.rating}</strong>
                                    </label>
                                    <input  type="range" min="0" max="5" step="1" id="rating" name="rating" value={feedback.rating} onChange={fechData} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="remarks">Remarks</label>
                                    {/* <input type="text" id="email" name="remark" value={feedback.remarks}  onChange={fechData} required /> */}
                                    <textarea type="text"  id="remarks" name="remarks" value={feedback.remarks} onChange={fechData} required></textarea>
                                </div>

                                <button className="form-submit-btn" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>

                </main>

                <Footer />

            </div>

        </>
    )
}

export default Feedback
