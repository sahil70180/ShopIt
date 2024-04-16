import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import AdminDashboard from '../admin/AdminDashboard'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/NewProduct'
import UpdateProduct from '../admin/UpdateProduct'
import UplaodImages from '../admin/UplaodImages'
import AllOrders from '../admin/AllOrders'
import ProcessOrder from '../admin/ProcessOrder'
import AllUsers from '../admin/AllUsers'
import UpdateUser from '../admin/UpdateUser'
import ProductReviews from '../admin/ProductReviews'
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
    <Route exact path="/admin/products/:id" element={
      <ProtectedRoute admin={true}>
        <UpdateProduct/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/products/:id/upload_images" element={
      <ProtectedRoute admin={true}>
        <UplaodImages/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/orders" element={
      <ProtectedRoute admin={true}>
        <AllOrders/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/orders/:id" element={
      <ProtectedRoute admin={true}>
        <ProcessOrder/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/users" element={
      <ProtectedRoute admin={true}>
        <AllUsers/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/users/:id" element={
      <ProtectedRoute admin={true}>
        <UpdateUser/>
      </ProtectedRoute>
    }/>
    <Route exact path="/admin/reviews" element={
      <ProtectedRoute admin={true}>
        <ProductReviews/>
      </ProtectedRoute>
    }/>
    </>
  )
}

export default AdminRoutes
