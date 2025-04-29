import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <h1 className="mb-4 text-2xl">Welcome, {userName} 👋</h1>

      <div className="space-y-4">
        <button
          className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => navigate("/quiz")} 
        >
          Start Quiz
        </button>


        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
