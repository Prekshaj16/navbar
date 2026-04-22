import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserManagement from "./components/UserManagement"
import TodoList from './TodoList.jsx'
import Login from './components/Login.jsx'
import ProductManagement from './components/ProductManagement.jsx'
import Practice from './components/Practice.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/product" element={<ProductManagement />} />
        <Route path="/prac" element={<Practice />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
