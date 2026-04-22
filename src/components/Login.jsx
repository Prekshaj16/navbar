import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.accessToken) {
                    localStorage.setItem("token", data.accessToken);
                    alert("Login successful");

                    navigate("/users")
                } else {
                    alert("Invalid credentials");
                }
            }
            )
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-300">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Login
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200 font-semibold"
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );

}

export default Login