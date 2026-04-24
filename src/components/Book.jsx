import { Notebook } from 'lucide-react';
import React, { useState } from 'react'
import Preksha from "../assets/Preksha.jpg"


function Book() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState(1);

    const bookItems = [
        {
            id: 1,
            name: " All Books",
            number: 45,
            icon: <Notebook />
        },
        {
            id: 2,
            name: " Currently Reading",
            number: 5,
            icon: <Notebook />

        },
        {
            id: 3,
            name: " Want to Read",
            number: 15,
            icon: <Notebook />

        },
        {
            id: 4,
            name: " Read",
            number: 20,
            icon: <Notebook />

        },

        {
            id: 5,
            name: " Favorites",
            number: 5,
            icon: <Notebook />

        }
    ]

    const cards = [
        {
            id: 1,
            name: 'Project Marry',
            author: 'Andy War',
            category: 'Fiction',
            progress: "65%"

        },

        {
            id: 2,
            name: 'Education',
            author: 'Preksha Jain',
            category: 'Entertainment',
            progress: "55%"

        },

        {
            id: 3,
            name: 'Bloody Marry',
            author: 'Patrick War',
            category: 'Funny',
            progress: "75%"

        },

        {
            id: 4,
            name: 'Deep Work',
            author: 'Call Newport',
            category: 'Productivity',
            progress: "90%"

        },

        {
            id: 5,
            name: 'Circe',
            author: 'Maher Mittal',
            category: 'Crime',
            progress: "25%"

        },
    ]

    const filteredBooks = bookItems.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className='flex flex-row'>
            <aside className='bg-orange-200/15 w-full max-w-[270px]  shadow-md  min-h-screen '>
                <div className=''>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold p-2  text-lg text-center'> BookShelf</h1>

                        <div className='px-2'>
                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='w-[250px] h-[35px] bg-white  rounded-lg shadow-lg p-4  '
                                placeholder='Search the shelves...' />

                        </div>
                    </div>

                    {/* Center */}
                    <div className='pb-[270px]'>
                        <h2 className='font-semibold p-3.5  text-lg'> Library</h2>
                        <div className='flex flex-col gap-5 p-3 '>

                            {filteredBooks.map((book) => (

                                <ul key={book.id}
                                    onClick={() => setActiveTab(book.id)}
                                    className={`flex flex-row items-center justify-between w-full 
                              p-2 rounded-md ${activeTab === book.id ? "bg-orange-500/75 text-white" : "text-black"}`}>
                                    <div className='flex flex-row items-center gap-4'>
                                        <li> {book.icon}</li>
                                        <li className='font-semibold'>{book.name}</li>

                                    </div>

                                    <div className=''>
                                        <li>{book.number}  </li>

                                    </div>
                                </ul>
                            ))}
                        </div>

                    </div>


                    <div>
                        <h2 className='px-4 text-gray-600 text-lg'>Reading Goal</h2>
                        <div className='flex flex-row justify-between items-center px-4'>
                            <h2> <span className='font-semibold text-lg'>15</span>/24 books</h2>
                            <h2>2026</h2>
                        </div>
                        <div className='px-4'>
                            <div className='w-full h-3 bg-white/50 shadow-sm mt-1 rounded-md'>
                                <div className='h-3 bg-orange-500 rounded-md' style={{ width: '70%' }} />
                            </div>
                            <h2> 9 hours to go!</h2>


                        </div>
                    </div>
                </div>
            </aside>

            <div className='p-10 bg-orange-50/20 w-full'>
                <div className=' flex flex-row justify-between items-center w-full px-4'>

                    <div className='flex flex-row items-center gap-3'>
                        <h1 className='font-bold text-[30px]'>Currently Reading</h1>
                        <h3 className='mt-3 text-gray-600'>5 books</h3>
                    </div>

                    <button className='px-4 py-2 font-semibold outline-1 outline-gray-800 rounded-md'>Sort By: Recent</button>
                </div>

                <div className=' px-4 mt-6'>

                    <div >
                        <div className='flex flex-row'>
                            <div className='flex flex-row flex-wrap gap-5'>

                                {cards.map((card) => (
                                    <div key={card.id} className="w-full max-w-[370px] h-[200px] shadow-xl p-2 bg-gray-50 rounded-xl flex flex-row ">
                                        <div className=''>
                                            <img src={Preksha} alt='Preksha' className='w-[170px] p-2 object-cover rounded-xl h-full ' />
                                        </div>
                                        <div className='flex flex-col gap-2 p-4 '>
                                            <h2 className='font-semibold text-[20px]'> {card.name}</h2>
                                            <h2 className='text-gray-400'> {card.author}</h2>
                                            <h2 className='bg-gray-300 text-black flex items-center justify-center w-full rounded-2xl px-3 py-1'> {card.category}</h2>
                                            <div className='flex justify-between mt-3'>
                                                <span>Progress</span>
                                                <span>{card.progress}</span>
                                            </div>

                                            <div className='w-full h-2 bg-gray-300 rounded'>
                                                <div
                                                    className='h-2 bg-orange-500 rounded'
                                                    style={{ width: card.progress }}
                                                />
                                            </div>




                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>


                    </div>

                </div>

            </div>





        </div>



    )
}

export default Book;