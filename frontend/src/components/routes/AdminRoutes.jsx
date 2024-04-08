import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import AdminDashboard from '../admin/AdminDashboard'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/NewProduct'
const AdminRoutes = () => {
  return (
    <>
    <Route exact path="/admin/dashboard" element={
        <ProtectedRoute admin={true}>
          <AdminDashboard/>          
        </ProtectedRoute>
    }/>
    <Route exact path="/admin/products" element={
      <ProtectedRoute admin={true}>
        <ListProducts/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/product/new" element={
      <ProtectedRoute admin={true}>
        <NewProduct/>
      </ProtectedRoute>
    }/>
    </>
  )
}

export default AdminRoutes
