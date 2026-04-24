import React, { useState } from 'react'

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw , setShowPw] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setEmail("");
    setName("");
    setPassword("");

  }



  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='w-full max-w-md  bg-white shadow-2xl  rounded-3xl '>
        <h2 className='text-center p-3 text-lg font-semibold'> Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='p-5 flex flex-col gap-4'>
            <label> Name :</label>
            <input type="text" name='name' placeholder='Enter name'
              value={name} onChange={(e) => setName(e.target.value)}

              className='w-full bg-blue-200 rounded-md p-2' />

            <label>Email:</label>
            <input type="text" name='email' placeholder='Enter Email'
              value={email} onChange={(e) =>setEmail (e.target.value)}
              className='w-full bg-blue-200 rounded-md p-2' />

            <label>Password:</label>
            <div className='flex flex-row relative'>

              <input type= {showPw ? "text" : "password"} 
               name='password' placeholder='Enter Password'
                value={password} onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-blue-200 rounded-md p-2' />
              <button type='button'
              onClick={() => setShowPw(!showPw)}
              className='absolute right-2 top-2'>
                {showPw ? "Hide" : "Show"}
              </button>

            </div>

            <button type='submit' className='w-full px-4 py-2 mt-6 bg-green-400 rounded-2xl'>Submit</button>
          </div>
        </form>


      </div>


    </div>
  )
}

export default SignIn;