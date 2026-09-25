import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import { ToastContainer } from 'react-toastify'
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

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'

const PathMapper = () => {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<App />} />
          <Route path='/aboutus' element={<About_Us />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/viewProduct' element={<ViewProducts />} />
          <Route path='/register' element={<UserRegistration />} />
          <Route path='/ownerRegister' element={<OwnerRegistration />} />  
          <Route path='/userLogin' element={<UserLogin />} />
          <Route path='/ownerLogin' element={<OwnerLogin />} />
          <Route path='/adminLogin' element={<AdminLogin />} />

          {/* User Protected Routes */}
          <Route path='/userHome' element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserHome />
            </ProtectedRoute>
          } />
          <Route path='/feedback' element={
            <ProtectedRoute allowedRoles={['user']}>
              <Feedback />
            </ProtectedRoute>
          } />
          <Route path='/userInvoiceData' element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserInvoiceData />
            </ProtectedRoute>
          } />
          <Route path='/userEditProfile' element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserEditProfile />
            </ProtectedRoute>
          } />

          {/* Owner Protected Routes */}
          <Route path='/ownerHome' element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerHome />
            </ProtectedRoute>
          } />
          <Route path='/addProduct' element={
            <ProtectedRoute allowedRoles={['owner']}>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path='/myProduct' element={
            <ProtectedRoute allowedRoles={['owner']}>
              <MyProducts />
            </ProtectedRoute>
          } />
          <Route path='/updateInventory' element={
            <ProtectedRoute allowedRoles={['owner']}>
              <UpdateInventory />
            </ProtectedRoute>
          } />
          <Route path='/ownerEditProfile' element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerEditProfile />
            </ProtectedRoute>
          } />
          <Route path='/invoiceData' element={
            <ProtectedRoute allowedRoles={['owner']}>
              <InvoiceData />
            </ProtectedRoute>
          } />

          {/* Admin Protected Routes */}
          <Route path='/adminHome' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminHome />
            </ProtectedRoute>
          } />
          <Route path='/allContacts' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllContacts />
            </ProtectedRoute>
          } />
          <Route path='/allFeedbacks' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllFeedbacks />
            </ProtectedRoute>
          } />
          <Route path='/allUsers' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllUsers />
            </ProtectedRoute>
          } />
          <Route path='/allOwners' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllOwners />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default PathMapper
