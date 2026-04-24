import React, { useState } from 'react'
import Sneha from "../assets/Sneha.jpg"
import Harsh from "../assets/Harsh.JPG"
import Preksha from "../assets/Preksha.jpg"
import { Settings, Menu, Home, BookOpen, Star } from "lucide-react"
import { Link } from "react-router-dom"


const users = [
  {
    id: 1,
    name: "Sneha Jain",
    role: "Senior CS ",
    followers: "1.5M",
    following: 92,
    img: Sneha,

  },

  {
    id: 2,
    name: "Preksha Jain",
    role: "Senior Full Stack Developer",
    followers: "2M",
    following: 192,
    img: Preksha,

  },

  {
    id: 3,
    name: "Harsh Mistry",
    role: "Senior AI /ML  Developer",
    followers: "6M",
    following: 992,
    img: Harsh,

  },

  {
    id: 4,
    name: "Shourya Jain",
    role: "Genetic Engineer",
    followers: "1.5M",
    following: 100,
    img: Sneha,

  },
]

function Practice() {
  const [activeCard, setActiveCard] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navItems = [
    { name: "Home" },
    { name: "Courses" },
    { name: "Profile" },
    { name: "Premium" },
  ]
  const [activeNav, setActiveNav] = useState("Home")


  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, password)
    setEmail("");
    setName("");
    setPassword("");
  }


  return (
    <div className='min-h-screen bg-white'>

      <div className='bg-red-300 w-full h-20 flex flex-row items-center  gap-4 '>

        <div className='w-[300px] pt-5  '>

          <div className='flex flex-col gap-1 items-center justify-center'>
            <h2 className='font-semibold text-lg'> Maths</h2>
            <h3 className='font-medium text-[19px]'> 1A</h3>
          </div>
        </div>

        <div className='w-[900px] pt-10'>
          <nav>
            <ul className='flex flex-row justify-between items-center px-10'>
              {navItems.map((item) => (
                activeNav === item.name ? (

                  <div key={item.name} className='relative w-[200px] flex items-center justify-center'>
                    <div
                      onClick={() => setActiveNav(item.name)}
                      className='bg-white w-[200px] h-[52px] absolute -top-8 rounded-t-3xl flex items-center justify-center cursor-pointer'>
                      <li className='text-[20px] font-semibold text-red-600'>
                        {item.name}
                      </li>
                    </div>
                  </div>
                ) : (

                  <li
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    className='text-[20px] font-semibold text-red-600'>
                    {item.name}
                  </li>
                )
              ))}
            </ul>
          </nav>
        </div>

        <div className='w-[300px] pt-10'>
          <div className='flex flex-row items-center  justify-center gap-10'>
            <h2><Settings size={24} /></h2>
            <h2><Menu size={24} /></h2>

          </div>
        </div>
      </div>



      <div className='flex items-center gap-8 justify-center p-24'>

        {users.map((user) => (
          <div
            onClick={() => setActiveCard(user.id)}
            key={user.id}
            className={`w-full max-w-sm rounded-t-3xl overflow-hidden shadow-lg
            ${activeCard === user.id ? 'bg-yellow-300' : 'bg-white'}`}>
            <div>


              <div className={`w-full max-w-sm h-28 rounded-t-3xl relative  ${activeCard === user.id ? "bg-green-300" : "bg-red-500"}`} >

                <div className='flex items-center justify-center'>
                  <div className='w-32 h-32 bg-white rounded-full absolute top-10 '>
                    <img src={user.img} alt={user.name} className="w-full h-full object-cover rounded-full p-2" />

                  </div>
                </div>

              </div>

              <div className='text-center pt-16 pb-10'>
                <h2 className='text-red-700 font-semibold text-lg'> {user.name}</h2>
                <h3 className='font-medium text-[17px]'> {user.role} </h3>
              </div>

              <div className=' flex flex-row gap-3 items-center justify-between px-14'>
                <div className='flex flex-col'>
                  <h2 className='text-center font-semibold text-[25px]'>{user.followers}</h2>
                  <h2 className='text-red-500 font-semibold text-xl'>Followers</h2>

                </div>

                <div className='flex flex-col'>

                  <h2 className='text-center font-semibold text-[25px]'>{user.following}</h2>
                  <h2 className='text-red-500 font-semibold text-xl'>Following</h2>

                </div>
              </div>

              <div className='flex items-center justify-center gap-5 px-14 py-6'>
                <button className='flex-1 bg-red-500 rounded-2xl py-2 text-lg text-white hover:bg-red-600 transition'>
                  Follow
                </button>
                <button className='flex-1 border-2 border-red-500 text-red-600 rounded-2xl py-[7px] text-lg hover:bg-red-50 transition'>
                  Message
                </button>
              </div>

            </div>
          </div>

        ))}
      </div>


      <form onSubmit={handleSubmit}>
        <div className=" flex items-center justify-center p-20">
          <div className='w-full bg-gray-100 max-w-md  rounded-2xl p-10 flex items-center justify-center border'>
            <div className='flex flex-col gap-6 p-4'>
              <label> Name:</label>
              <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className=' p-2 w-[300px] rounded-lg border' />

              <label> Email:</label>
              <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className=' p-2 w-[300px] rounded-lg border' />

              <label >Password:</label>

              <div className='flex flex-row relative items-center justify-center'>

                <input type={showPassword ? "text" : "password"}
                  name="password" id='password'

                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className=' p-2 w-[300px] rounded-lg border' />

                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className=' absolute right-2 top-2'>
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <button type='submit' className='bg-green-400 px-4 py-2 rounded-2xl'> Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Practice;