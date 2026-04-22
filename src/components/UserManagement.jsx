import React, { useEffect, useState } from 'react'
import { Pencil, Trash } from "lucide-react"

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("edit");

  const [editCity, setEditCity] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filterColor, setFilterColor] = useState("");


  const limit = 10;
  useEffect(() => {
    setLoading(true)
    const skip = (page - 1) * limit;
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
  }, [page])


  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === "") return;
      fetch(`https://dummyjson.com/users/search?q=${search}`)
        .then(res => res.json())
        .then((data) => {
          setUsers(data.users);
        });
    }, 500)

    return () => clearTimeout(timer)

  }, [search]);


  useEffect(() => {
    fetch(`https://dummyjson.com/users/filter?key=hair.color&value=${filterColor}`)
      .then(res => res.json())
      .then((data) => {
        setUsers(data.users)
        setLoading(false);
      })

  }, [filterColor])


  const deleteTask = (id) => {

    fetch(`https://dummyjson.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {

        setUsers(users.filter(user => user.id !== id));

      })

      .catch((err) => {
        console.log("error in delete data", err)
      })
  };

  const editTask = (users) => {
    setEditUser(users);
    setEditCity(users.address?.city);
    setEditEmail(users.email);
    setEditName(users.firstName + " " + users.lastName);
    setModalMode("edit");

    setIsModalOpen(true);
  }

  const addtask = () => {
    setEditName("");
    setEditCity("");
    setEditEmail("");
    setModalMode("add");
    setIsModalOpen(true);

  };
  const addUser = () => {
    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: editName.split(" ")[0],
        lastName: editName.split(" ").slice(1).join(" "),
        address: {
          city: editCity,
        },
        email: editEmail,
      })
    })
      .then(res => res.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Failed to add user:", err);
      })
  }


  const updateChange = () => {
    fetch(`https://dummyjson.com/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: editName.split(" ")[0],
        lastName: editName.split(" ").slice(1).join(" "),
        address: {
          city: editCity,
        },
        email: editEmail,
      })
    })

      .then(res => res.json())
      .then((upadtedUser) => {
        const updated = users.map((users) => (
          users.id === editUser.id ? upadtedUser : users

        ));

        setUsers(updated);
        setIsModalOpen(false);

      })
      .catch((err) => {
        console.log("Failed to upadte", err)
      })


  }

  return (
    <div className='bg-pink-200 h-screen'>
      <div className='relative flex items-center justify-center px-6 py-4'>
        <h1 className='py-7 text-lg font-medium '>
          Users Table
        </h1>

        <div className='absolute right-10 flex gap-4 '>

          <select
            onChange={(e) => setFilterColor(e.target.value)}
            className='bg-white p-2 '>
            <option> All</option>
            <option>Brown</option>
            <option>White</option>
          </select>
          <input
            type='text'
            value={search}
            placeholder='Search....'
            onChange={(e) => setSearch(e.target.value)}
            className='bg-gray-200 rounded-lg px-3 py-2'
          />

          <button onClick={addtask} className='bg-green-300 px-4 py-2 rounded-md'>Add User</button>
        </div>
      </div>

      {loading ? (
        <p className="text-lg text-center py-9">Loading...</p>
      ) : (


        <table className=' w-200 lg:w-full bg-white '>
          <thead className='bg-gray-200'>
            <tr  >
              <th className='border-r border-gray-400 ' >ID</th>
              <th className='border-r border-gray-400 '>Name</th>
              <th className='border-r border-gray-400 '>City</th>
              <th className='border-r border-gray-400 '>Email</th>
              <th className='border-r border-gray-400 '>Actions</th>


            </tr>
          </thead>

          <tbody className=''>
            {
              users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100"
                >
                  <td className='border text-center border-gray-300'>{user.id}</td>
                  <td className='border text-center border-gray-300'>{user.firstName} {user.lastName}</td>
                  <td className='border text-center border-gray-300'> {user.address?.city}</td>
                  <td className='border text-center border-gray-300'>{user.email}</td>


                  <td className='border text-center border-gray-300'>
                    <div className='flex flex-row items-center justify-center gap-3 p-3'>
                      <button onClick={() => editTask(user)}><Pencil size={15} /></button>
                      <button
                        onClick={() => deleteTask(user.id)}
                      ><Trash size={15} /></button>
                    </div>
                  </td>

                </tr>

              )
              )}

          </tbody>
        </table>
      )}

      <div className='flex flex-row gap-2 mt-5 justify-center items-center'>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
          className='bg-blue-300  rounded-md px-4 py-2'>
          Prev
        </button>

        <h3 className='px-3 py-2 bg-white'>{page}</h3>

        <button
          onClick={() => setPage(page + 1)}
          className='bg-blue-300 rounded-md px-4 py-2'>
          Next
        </button>
      </div>
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40">
            <div className="fixed inset-0 flex justify-center items-center z-30">
              <div className="bg-white p-3 w-137.5 rounded-xl shadow-lg">

                <h1 className='text-center text-lg font-semibold'>
                  {modalMode === "add" ? "Add User" : "Edit User"} </h1>
                <div className='flex flex-col gap-2 p-5'>
                  <h2 className='font-semibold '> Name</h2>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='bg-pink-100 px-4 py-2 rounded-md w-full' />


                  <h2 className='font-semibold'> City </h2>
                  <input
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className='bg-pink-100 px-4 py-2 rounded-md w-full ' />


                  <h2 className='font-semibold'>Email</h2>
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className='bg-pink-100 px-4 py-2 rounded-md w-full ' />


                  <div className='flex flex-row gap-4 justify-end w-full'>
                    <button onClick={() => setIsModalOpen(false)}
                      className='bg-red-400 px-4 rounded-md py-2 '>
                      Cancel
                    </button>

                    <button onClick={() => modalMode === "add" ? addUser() : updateChange()}
                      className='bg-green-300 px-4  rounded-md py-2'>
                      {modalMode === "add" ? "Add" : "Update"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>


        )
      }
    </div>
  )
}

export default UserManagement;