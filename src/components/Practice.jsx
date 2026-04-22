import React from 'react'
import Sneha from "../assets/Sneha.jpg"
import Harsh from "../assets/Harsh.JPG"
import Preksha from "../assets/Preksha.jpg"
import { Settings, Menu, Home, BookOpen, Star } from "lucide-react"


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
  return (
    <div className='min-h-screen bg-white'>

      <div className='bg-red-300 w-full h-20 flex flex-row items-center  gap-4 '>

        <div className='w-[300px] pt-5  '>

          <div className='flex flex-col gap-1 items-center justify-center'>
            <h2 className='font-semibold text-lg'> Maths</h2>
            <h3 className='font-medium text-[19px]'> 1A</h3>
          </div>
        </div>

        <div className='w-[900px] pt-10  '>
          <nav>
            <ul className='flex flex-row justify-between items-center px-10'>
              <li className='text-[20px] font-semibold text-red-600'>Home</li>


              <div className='relative w-[200px] flex items-center justify-center'>
                <div className='bg-white w-[200px] h-[52px] absolute -top-8 rounded-t-3xl flex items-center justify-center'>


                  <li className='text-[20px] font-semibold text-red-600 list-none'>Courses</li>
                </div>
              </div>

              <li className='text-[20px] font-semibold text-red-600'>Profile</li>
              <li className='text-[20px] font-semibold text-red-600' >Premium</li>
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
          <div key={user.id}
            className='w-full max-w-sm rounded-t-3xl overflow-hidden bg-white shadow-lg'>
            <div>
              <div className='w-full max-w-sm h-28 bg-red-600 rounded-t-3xl relative'>

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

    </div>
  )
}

export default Practice