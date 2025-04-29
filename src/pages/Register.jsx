// src/pages/Register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./Loading";


export default function Register() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

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
      setLoading(false)

      console.log("User registered and data saved!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
    {loading ? (
      <Loading />
    ) : (
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">Register</h2>
  
        {error && (
          <p className="mb-4 text-center text-white bg-red-500/80 rounded p-2">
            {error}
          </p>
        )}
  
        <form onSubmit={handleSubmit}>
          {/* ✅ Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-black rounded-lg outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-black rounded-lg outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-black rounded-lg outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white border border-white rounded-lg hover:bg-white/20 transition"
          >
            Register
          </button>
        </form>
  
        <p className="mt-6 text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/login">
            <button className="underline underline-offset-2 hover:text-indigo-200">
              Login
            </button>
          </Link>
        </p>
      </div>
    )}
  </div>
  
  );
}
