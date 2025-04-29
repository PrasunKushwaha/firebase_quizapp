import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const saveScoreToFirestore = async () => {
      if (user && state?.score !== undefined && state?.total !== undefined) {
        const scoreRef = collection(db, "scores");
        await addDoc(scoreRef, {
          uid: user.uid,
          score: state.score,
          total: state.total,
          timestamp: serverTimestamp(),
        });
      }
    };
    

    useEffect(() => {
      saveScoreToFirestore();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
  <div className="text-center space-y-6 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl">
    <h1 className="text-4xl font-bold">🎉 Congratulations!</h1>
    <p className="text-2xl font-medium">
      Your Score: {state?.score} / {state?.total}
    </p>
    <button
      onClick={() => navigate("/welcome")}
      className="px-6 py-3 text-black font-semibold bg-white rounded-lg hover:bg-black hover:text-white transition"
    >
      Done
    </button>
  </div>
</div>

  );
}
