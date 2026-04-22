import React, { useEffect, useState } from 'react'

const ProductManagement = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [modalMode, setModalMode] = useState("edit");
    const [editProduct, setEditProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const limit = 10;

    useEffect(() => {
        setLoading(true)
        const skip = (page - 1) * limit;

        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false)
            })


    }, [page])

    useEffect(() => {
        if (!selectedCategory || selectedCategory === "all") return;

        setLoading(true);

        fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
            .then(res => res.json())
            .then((data) => {
                setProducts(data.products || []); // ✅ safe fallback
                setLoading(false);
            })


    }, [selectedCategory]);


    const addProduct = () => {
        setTitle("");
        setDesc("");
        setCategory("");
        setPrice("");
        setIsModalOpen(true);
        setModalMode("add");
    };


    const addItem = () => {
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                category: category,
                description: desc,
                price: price,
            })
        })
            .then(res => res.json())
            .then((newItem) => {
                setProducts([...products, newItem]);
                setIsModalOpen(false)
            })
            .catch((err) => {
                console.error("Error in adding item", err)
            })
    }

    const editProducts = (product) => {
        setEditProduct(product);
        setTitle(product.title);
        setDesc(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setIsModalOpen(true);
        setModalMode("edit")

    }

    const editItem = () => {
        fetch(`https://dummyjson.com/products/${editProduct.id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                category: category,
                description: desc,
                price: price,
            })
        })
            .then(res => res.json())
            .then((upadtedProduct) => {
                const updated = products.map((products) => (
                    products.id === editProduct.id ? upadtedProduct : products

                ));

                setProducts(updated);
                setIsModalOpen(false);

            })
            .catch((err) => {
                console.log("Failed to upadte", err)
            })

    }


    const deleteProduct = (id) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => {
                setProducts(products.filter(product => product.id !== id))
            })
    }

    return (
        <div className='bg-gray-400 h-screen'>


            <div className='relative flex items-center justify-center py-6'>

                {/* Center Title */}
                <h1 className='text-lg font-medium'>
                    Product Table
                </h1>

                {/* Right Side Buttons */}
                <div className='absolute  right-0 lg:right-6 flex gap-3'>
                    <button
                        onClick={() => addProduct()}
                        className='bg-blue-100 px-4 py-2 rounded-md'>
                        Add Product
                    </button>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='bg-blue-100  px-4 py-2 rounded-md'>
                        <option> all</option>
                        <option>smartphones</option>
                        <option>beauty</option>
                    </select>
                </div>

            </div>
            {loading ? (
                <p className="text-lg text-center py-9">Loading...</p>
            ) : (


                <table className=' w-[200px] lg:w-full h-[600px] bg-white mt-5'>
                    <thead className='bg-gray-200'>
                        <tr className=' '  >
                            <th className='border-r   px-2  lg:px-4 py-3 font-medium border-gray-300'>ID </th>
                            <th className='border-r px-4 py-3 font-medium border-gray-300'>Title </th>
                            <th className='border-r  px-4 py-3 font-medium border-gray-300'>Description </th>
                            <th className='border-r  px-4 py-3 font-medium border-gray-300'>Category </th>
                            <th className='border-r  px-4 py-3 font-medium border-gray-300'>Price </th>
                            <th className='border-r  px-4 py-3 font-medium border-gray-300'>Actions </th>

                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className='border-b hover:bg-gray-100'>
                                <td className='border text-center  font-medium border-gray-300'>{product.id}</td>
                                <td className='border text-center  font-medium border-gray-300'>{product.title}</td>

                                <td className='border text-center  font-medium text-[15px] border-gray-300'>{product.description}</td>
                                <td className='border text-center font-medium border-gray-300'>{product.category}</td>
                                <td className='border text-center font-medium border-gray-300'>{product.price}</td>
                                <td>
                                    <div className='flex flex-row gap-2 p-2'>
                                        <button
                                            onClick={() => editProducts(product)}
                                            className='bg-red-500 px-3 py-2'> Edit</button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className='bg-green-200 px-3 py-2'>Delete</button>

                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            )}

            <div className='flex flex-row gap-4 items-center justify-center mt-14'>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1 || loading}
                    className='bg-blue-100 px-4 py-2 rounded-md'> Prev </button>


                <span className='bg-white px-3 py-2'> {page} </span>


                <button onClick={() => setPage(page + 1)} className='bg-blue-100 px-4 py-2 rounded-md'> Next</button>
            </div>

            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40">
                        <div className="fixed inset-0 flex justify-center items-center z-30">
                            <div className="bg-white p-3 w-[800px] rounded-xl shadow-lg">
                                <div className='flex flex-col gap-3'>

                                    <h2 className='text-center font-semibold'>
                                        {modalMode === "add" ? "Add User" : "Edit User"}
                                    </h2>
                                    <h2 className='text-lg font-semibold'> Title</h2>
                                    <input
                                        className='bg-blue-100 w-full rounded-md px-3 py-2'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} />

                                    <h2 className='text-lg font-semibold'> Description</h2>
                                    <input
                                        className='bg-blue-100 w-full rounded-md px-3 py-2'
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)} />

                                    <h2 className='text-lg font-semibold'> Category</h2>
                                    <input
                                        className='bg-blue-100 w-full rounded-md px-3 py-2'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)} />

                                    <h2 className='text-lg font-semibold'> Price</h2>
                                    <input
                                        className='bg-blue-100 w-full rounded-md px-3 py-2'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)} />
                                </div>

                                <div className='flex flex-row gap-4 items-end justify-end mt-6'>
                                    <button
                                        onClick={() => setIsModalOpen(false)}

                                        className='bg-red-500 px-3 py-2  '> Cancel </button>
                                    <button
                                        onClick={() => modalMode === "add" ? addItem() : editItem()}
                                        className='bg-green-300 px-3 py-2'>
                                        {modalMode === "add" ? "Add" : "Update"}


                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }



        </div>

    )
}

export default ProductManagement