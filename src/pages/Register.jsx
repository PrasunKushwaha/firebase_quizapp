// src/pages/Register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Register() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Save user's name and email in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      console.log("User registered and data saved!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <div className="w-full p-8 bg-gray-800 rounded-lg shadow-lg sm:w-96">
        <h2 className="mb-6 text-3xl text-center">Register</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* ✅ Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 text-black border border-gray-400 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 text-black border border-gray-400 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 text-black border border-gray-400 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to={"/login"}>
            {" "}
            <button className="text-blue-400">
              Login
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
