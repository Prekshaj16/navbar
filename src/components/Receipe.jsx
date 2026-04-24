import React, { useEffect, useState } from 'react'
import { Pencil, Trash } from "lucide-react"

function Receipe() {

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [editName, setEditName] = useState("");
    const [editIng, setEditIng] = useState("");
    const [edit, setEdit] = useState(null);
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState("edit");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const limit = 5
    useEffect(() => {
        const skip = (page - 1) * limit
        fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then((data) => {
                setRecipes(data.recipes);
            });
    }, [page])

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/search?q=${search}`)
            .then(res => res.json())
            .then((data) => {
                setRecipes(data.recipes);
            });

    }, [search])


    useEffect(() => {
        fetch(`https://dummyjson.com/recipes?sortBy=${sort}&order=asc`)
            .then(res => res.json())
            .then((data) => {
                setRecipes(data.recipes)
            });

    }, [sort])

    const addRec = () => {
        setEditName("");
        setEditIng("");
        setMode("add");
        setModal(true);
    }

    const editRec = (recipes) => {
        setEdit(recipes);
        setMode("edit");
        setEditName(recipes.name);
        setEditIng(recipes.ingredients);
        setModal(true);

    }

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
    )



    const updateRec = () => {
        fetch(`https://dummyjson.com/recipes/${edit.id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: editName,
                ingredients: editIng

            })
        })
            .then(res => res.json())
            .then((updateRec) => {
                const newRec = recipes.map((recipes) => (
                    recipes.id === edit.id ? updateRec : recipes

                ));

                setRecipes(newRec);
                setModal(false)

            })
            .catch((err) => {
                console.log("Failed to upadte", err)
            })
    }

    const add = () => {
        fetch(`https://dummyjson.com/recipes/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: editName,
                ingredients: editIng
            })
        })
            .then(res => res.json())
            .then((newUser) => {
                setRecipes([...recipes, newUser])
                setModal(false)

            })
            .catch((err) => {
                console.log("error in addingg")
            });
    }


    const deleteRec = (id) => {
        fetch(`https://dummyjson.com/recipes/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setRecipes(recipes.filter(recipe => recipe.id !== id))
            })
    }

    return (
        <div className='min-h-screen bg-pink-300'>
            <div className='flex flex-row gap-10 px-6 py-[30px] relative '>
                <h2 className='font-semibold  text-lg  underline'> Receipe System</h2>




                <div className='absolute right-2 flex gap-3 items-center'>
                    <div className='flex gap-2'>
                        {["snack", "dinner", "lunch", "breakfast"].map((meal) => (
                            <button
                                key={meal}
                                onClick={() => {
                                    fetch(`https://dummyjson.com/recipes/meal-type/${meal}`)
                                        .then(res => res.json())
                                        .then((data) => setRecipes(data.recipes));
                                }}
                                className='bg-white px-3 py-1 rounded-2xl capitalize'>
                                {meal}
                            </button>
                        ))}
                    </div>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className='bg-white border px-4 py-2 rounded-3xl'>
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                    </select>

                    <button onClick={() => addRec()}
                        className='ring-2 ring-green-700 p-2 rounded-2xl'>Add Receipe</button>

                    <input
                        type="text"
                        name='search'
                        value={search}
                        placeholder='Search the name'
                        className=' p-2 bg-gray-300 rounded-3xl' type='text' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>


            <div className=''>
                <table className='border-collapse border w-full '>
                    <thead>
                        <tr className=''>
                            <th className='p-3  border-r-2 '>ID</th>
                            <th className='p-3  border-r-2'>Name</th>
                            <th className='p-3  border-r-2'>Ingredients</th>
                            <th className='p-3  border-r-2'>Image</th>
                            <th className='p-3  border-r-2'>Actions</th>

                        </tr>
                    </thead>

                    <tbody >
                        {filteredRecipes.map((recipe) => (
                            <tr key={recipe.id} onClick={() => setActiveTab(recipe.id)} className={`${activeTab === recipe.id ? "bg-yellow-400" : "bg-pink-300"}`}>

                                <td className='p-2 border-2'>{recipe.id}</td>
                                <td className='p-2 border-2 '>{recipe.name}</td>
                                <td className='p-2 border-2 w-[400px]'>{recipe.ingredients}</td>
                                <td className='p-2 border-2'>
                                    <img src={recipe.image} alt={recipe.name} className='w-[100px]  h-24 object-cover mx-auto' />
                                </td>
                                <td className='p-2 border-2'>
                                    <div className='flex flex-row gap-5  items-center justify-center'>
                                        <button onClick={() => editRec(recipe)}>
                                            <Pencil size={20} /></button>
                                        <button onClick={() => deleteRec(recipe.id)}><Trash size={20} /></button>

                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>

            <div className='flex flex-row gap-2 mt-5 justify-center items-center'>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
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

            {modal && (
                <div className='fixed inset-0 bg-black/20 backdrop-sm z-40'>
                    <div className="fixed inset-0 flex justify-center items-center z-30">
                        <div className="bg-white p-3 w-137.5 rounded-xl shadow-lg">
                            <h2 className='text-center'>
                                {mode === "add" ? "Add User" : "Edit User"}
                            </h2>
                            <div className='flex flex-col gap-2'>
                                <label className='text-lg font-semibold' > Name</label>
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className='w-full p-1 bg-pink-100 rounded-md'
                                />


                                <label>Ingredients</label>
                                <input
                                    value={editIng}
                                    onChange={(e) => setEditIng(e.target.value)}
                                    className='w-full p-1 bg-pink-100 rounded-md'
                                />

                                <div className='flex flex-row gap-4  items-center justify-end  px-4 mt-6'>

                                    <button onClick={() => { mode === "add" ? add() : updateRec() }} className='ring-2 ring-pink-500 px-4 py-2 rounded-2xl'>
                                        {mode === "edit" ? "Update" : "Add"}
                                    </button>
                                    <button onClick={() => setModal(false)} className='ring-2 ring-pink-500 px-4 py-2 rounded-2xl'>
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Receipe;