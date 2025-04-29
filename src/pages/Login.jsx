import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Loading from "./Loading";



export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  // Function to handle Google login
 const loginWithGoogle = async () => {
   try {
    setLoading(true)
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
     setLoading(false)
     navigate("/welcome");
   } catch (err) {
     console.error("Google Login Error:", err);
   }
 };


  // Function to handle email/password login
  const loginWithEmailPassword = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      navigate("/welcome");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Email/Password Login Error:", err);
    }
  };

  return (<>
   {loading ? (
  <Loading />
) : (
  <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
    <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
      <h2 className="mb-6 text-3xl font-bold text-center text-white">Login</h2>

      {error && (
        <p className="mb-4 text-center text-white bg-red-500/80 rounded p-2">
          {error}
        </p>
      )}

      <button
        onClick={loginWithGoogle}
        className="w-full py-3 mb-4 font-semibold text-black bg-white rounded-lg hover:bg-black hover:text-white transition"
      >
        Sign in with Google
      </button>

      <form onSubmit={loginWithEmailPassword}>
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
          Login with Email
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-white">
        Don't have an account?{" "}
        <Link to="/">
          <button className="underline underline-offset-2 hover:text-indigo-200">
            Register
          </button>
        </Link>
      </p>
    </div>
  </div>
)}

    </>
    
  );
}
