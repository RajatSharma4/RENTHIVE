// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import About_Us from './components/About_Us'
import Contact from './components/Contact'
import Feedback from "./components/user/Feedback"
import AllContacts from "./components/admin/AllContacts"
import AllFeedbacks from "./components/admin/AllFeedbacks"
import UserRegistration from "./components/user/UserRegistration"
import OwnerRegistration from "./components/owner/OwnerRegistration"
import AdminLogin from "./components/admin/AdminLogin"
import OwnerLogin from "./components/owner/OwnerLogin"
import UserLogin from "./components/user/UserLogin"
import UserHome from "./components/user/UserHome"
import OwnerHome from "./components/owner/OwnerHome"
import AdminHome from "./components/admin/AdminHome"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddProduct from "./components/owner/AddProduct"
import ViewProducts from "./components/user/ViewProducts"
import MyProducts from "./components/owner/MyProducts"
import UpdateInventory from "./components/owner/UpdateInventory"
import OwnerEditProfile from "./components/owner/OwnerEditProfile"
import UserEditProfile from "./components/user/UserEditProfile"
import InvoiceData from "./components/owner/InvoiceData"
import UserInvoiceData from "./components/user/UserInvoiceData"
import AllUsers from "./components/admin/AllUsers"
import AllOwners from "./components/admin/AllOwners"

const PathMapper = () => {
  return (
    <>
      
      <ToastContainer/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/aboutus' element={<About_Us />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/feedback' element={<Feedback />}></Route>
          <Route path='/allContacts' element={<AllContacts />}></Route>
          <Route path='/allFeedbacks' element={<AllFeedbacks />}></Route>
          <Route path='/register' element={<UserRegistration />}></Route>
          <Route path='/ownerRegister' element={<OwnerRegistration />}></Route>  
          <Route path='/adminLogin' element={<AdminLogin />}></Route>
          <Route path='/ownerLogin' element={<OwnerLogin />}></Route>
          <Route path='/userLogin' element={<UserLogin />}></Route>
          <Route path='/userHome' element={<UserHome />}></Route>
          <Route path='/ownerHome' element={<OwnerHome />}></Route>
          <Route path='/adminHome' element={<AdminHome/>}></Route>
          <Route path='/addProduct' element={<AddProduct/>}></Route>
          <Route path='/viewProduct' element={<ViewProducts/>}></Route>
          <Route path='/myProduct' element={<MyProducts/>}></Route>
          <Route path='/updateInventory' element={<UpdateInventory/>}></Route>
          <Route path='/ownerEditProfile' element={<OwnerEditProfile/>}></Route>
          <Route path='/userEditProfile' element={<UserEditProfile/>}></Route>
          <Route path='/invoiceData' element={<InvoiceData/>}></Route>
          <Route path='/userInvoiceData' element={<UserInvoiceData/>}></Route>
          <Route path='/allUsers' element={<AllUsers/>}></Route>
          <Route path='/allOwners' element={<AllOwners/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default PathMapper
