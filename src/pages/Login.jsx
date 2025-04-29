import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle Google login
 const loginWithGoogle = async () => {
   try {
     const result = await signInWithPopup(auth, provider);
     const user = result.user;

     const userRef = doc(db, "users", user.uid);
     const userSnap = await getDoc(userRef);

     // Only add to DB if user doc doesn't exist
     if (!userSnap.exists()) {
       await setDoc(userRef, {
         name: user.displayName,
         email: user.email,
         createdAt: new Date(),
       });
       console.log("New Google user added to Firestore");
     }

     navigate("/welcome");
   } catch (err) {
     console.error("Google Login Error:", err);
   }
 };


  // Function to handle email/password login
  const loginWithEmailPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/welcome");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Email/Password Login Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <div className="w-full p-8 bg-gray-800 rounded-lg shadow-lg sm:w-96">
        <h2 className="mb-6 text-3xl text-center">Login</h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <button
          onClick={loginWithGoogle}
          className="w-full p-4 mb-4 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Sign in with Google
        </button>

        <form onSubmit={loginWithEmailPassword}>
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
            className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Login with Email
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to={"/"}>
            {" "}
            <button className="text-blue-400">Register</button>
          </Link>
        </p>
      </div>
    </div>
  );
}
