import React from 'react'
import '../../css/OwnerRegistration.css'
import Header from '../Header'
import Footer from '../Footer'
import { useState, useRef } from 'react'
import axios from 'axios'

const OwnerRegistration = () => {
  
      const fileInputRef = useRef(null)

   const [regData, setRegData] = useState({
        email: "",
        password: "",
        fullname: "",
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

    const submitData = async(e) => {

        e.preventDefault()
        

        //setting all data in formData object
        const formData = new FormData();

        for(const key in regData){
            formData.append(key, regData[key]) //to set all value from object
        }

        if(pic){
            formData.append("pic", pic);
        }

        for(let [key, value] of formData.entries()){
            console.log(`${key}:`, value);
            
        }

        const URL = "http://localhost:4000/owner/ownerRegister"

        try{

       const serverResponse =  await axios.post(URL, formData)
       console.log(serverResponse.data.message);

       alert(serverResponse.data.message)

       setRegData({
         email: "",
        password: "",
        fullname: "",
        phone: "",
        city: "",
        address: ""
       })

       setPic(null)
       fileInputRef.current.value = null;
       

        }
        catch(err){
            console.log(err);
            
        }

    }  //submit data close
  return (
    <>

      <div className='d-flex flex-column min-vh-100'>

        <Header />

        <main className='flex-fill'>

          <div className='mainBox '>

             <div className='box'>
              <h1>Become a <span className='text-success'>Renthive Partner</span></h1>
              <p>Renthive empowers owners like you to earn more by renting out your unused property or assets.
                Register now and start listing in minutes – <span className='text-warning'> no tech skills needed!</span></p>
            </div>

            <div className='box'>
              <div className="container">
                <div className="heading text-success">REGISTER YOURSELF</div>
                <form className="form" onSubmit={submitData} >
                  <div className="input-field">
                    <input required type="email" name="email" id="email" value={regData.email} onChange={fetchData} />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input required type="password" name="password" id="password" value={regData.password} onChange={fetchData} />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field">
                    <input required type="text" name="fullname" id="fullname" value={regData.fullname} onChange={fetchData} />
                    <label htmlFor="username">Full Name</label>
                  </div>
                  <div className="input-field">
                    <input required type="number" name="phone" id="phone" value={regData.phone} onChange={fetchData} />
                    <label htmlFor="username">Phone</label>
                  </div>
                  <div className="input-field">
                    <input required type="city" name="city" id="city" value={regData.city}  onChange={fetchData}/>
                    <label htmlFor="username">City</label>
                  </div>
                  <label htmlFor="username">Upload pic</label>
                  <div className="input-field">
                    <input required type="file" ref={fileInputRef} name="pic" accept='images/*,application/pdf' id="file" onChange={fetchData} />

                  </div>

                  <div className="input-field">
                    <textarea name="address" id="address" value={regData.address} onChange={fetchData}></textarea>
                    <label htmlFor="address">Address</label>
                  </div>

                  <div className="btn-container">
                    <button className="btn">Submit</button>
                  </div>
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

export default OwnerRegistration
