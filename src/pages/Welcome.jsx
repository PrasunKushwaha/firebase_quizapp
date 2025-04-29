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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white">Welcome, {userName} 👋</h1>
        <div className="space-y-4">
          <button
            className="w-full py-2 text-black font-semibold bg-white rounded-lg hover:bg-black hover:text-white transition"
            onClick={() => navigate("/quiz")}
          >
            Start Quiz
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 text-white font-semibold border border-white rounded-lg hover:bg-white/20 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
