import React, { useState, useRef } from 'react'
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/UserRegistration.css'
  
const UserRegistration = () => {

    const fileInputRef = useRef(null)

    const [regData, setRegData] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        city: "",
        address: ""
    })
    const [pic, setPic] = useState(null)



    const fetchData = (e) => {
        const { name, value, type, files } = e.target; //destructuring target object

        if (type === "file") {
            console.log(files[0]);
            setPic(files[0]);

        }
        else {
            setRegData({ ...regData, [name]: value })
        }

    }; //fetch data close

    const submitData = async (e) => {

        e.preventDefault()


        //setting all data in formData object
        const formData = new FormData();

        for (const key in regData) {
            formData.append(key, regData[key]) //to set all value from object
        }

        if (pic) {
            formData.append("pic", pic);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);

        }

        const URL = "http://localhost:4000/user/register"

        try {

            const serverResponse = await axios.post(URL, formData)
            console.log(serverResponse);

            alert(serverResponse.data.message)

            setRegData({
                email: "",
                password: "",
                name: "",
                phone: "",
                city: "",
                address: ""
            })

            setPic(null)

            fileInputRef.current.value = null;   //it is use to clear file field 


        }
        catch (err) {
            console.log(err);

        }

    }  //submit data close

    return (
        <>

            <div className='d-flex flex-column min-vh-100'>
                <Header />
                <main className='flex-fill d-flex justify-content-center'>


                    <div className='d-flex flex-wrap' style={{ gap: "20vw" }}>

                        <div className='my-auto mx-auto'>
                            <img src="/RegisterPic.png" alt="" height={400} width={400} />
                        </div>


                        <div className=''>
                            <div className="container1 ">
                                <div className="heading">Registration</div>
                                <form action="" className="form1" onSubmit={submitData}>
                                    <input className="input" type="email" name="email" value={regData.email} onChange={fetchData} id="email" placeholder="E-mail" required />

                                    <input className="input" type="password" name="password" value={regData.password} onChange={fetchData} id="password" placeholder="Password" required />

                                    <input className="input" type="name" name="name" id="name" value={regData.name} onChange={fetchData} placeholder="Name" required />

                                    <input className="input" type="phone" name="phone" id="phone" value={regData.phone} onChange={fetchData} placeholder="Phone" required />

                                    <input className="input mb-3" type="City" name="city" id="city" value={regData.city} onChange={fetchData} placeholder="City" required />

                                    <label htmlFor="file">Upload Pic</label>
                                    <input className='input' type="file" id='file' name='pic' ref={fileInputRef} onChange={fetchData} accept='images/*,application/pdf' placeholder='Upload Image or Document' required />

                                    <textarea className='input' name="address" id="address" placeholder='Address' value={regData.address} onChange={fetchData}  ></textarea>

                                    <input className="login-button" type="submit" value="Submit" />

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

export default UserRegistration
