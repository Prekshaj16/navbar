import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserManagement from "./components/UserManagement"
import TodoList from './TodoList.jsx'
import Login from './components/Login.jsx'
import ProductManagement from './components/ProductManagement.jsx'
import Practice from './components/Practice.jsx'
import Book from './components/Book.jsx'
import Receipe from './components/Receipe.jsx'
import SignIn from './components/SignIn.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/product" element={<ProductManagement />} />
        <Route path="/prac" element={<Practice />} />
        <Route path="/book" element={<Book />} />
        <Route path="/receipe" element={<Receipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;