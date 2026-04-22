import React from 'react'
import UserManagement from './UserManagement'
import Login from './Login'
import ProductManagement from './ProductManagement'

const index = () => {
  return (
    <div>
      <Login />
      <UserManagement />
      <ProductManagement/>

    </div>
  )
}

export default index