import React, { useState } from 'react'

function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, task]);
    } setTask("")
  }

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);

    setTodos(newTodos)

  }

  const editTask = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  }


  return (
    <div className='h-screen bg-white'>
      <div className='text-center text-3xl py-8 flex flex-col items-center justify-center gap-5'>
        ToDo List
        <div className=' flex flex-row gap-4 '>
          <input type="text"
            value={task}
            placeholder='Enter Task'
            onChange={(e) => setTask(e.target.value)}
            className='text-black bg-blue-100 rounded-md py-2 px-4 text-[20px] outline-2 focus:border-blue-950' />

          <button
            onClick={addTask}
            className='bg-blue-500 px-7 w-full text-[18px] rounded-md '>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className='mt-5 w-225 flex flex-col gap-2'>
          {todos.map((task, index) => (
            <li key={index}
              className="text-xl bg-blue-200 text-left  px-6 py-2 rounded-md shadow-md flex justify-between items-center"
            >
              {task}

              <div className='flex flex-row gap-4'>

                <button
                  onClick={() => editTask(index)}
                  className='bg-green-500 px-7 w-full text-[18px] rounded-md '>
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </li>

          ))}


        </ul>
      </div>
    </div>
  )
}

export default TodoList;