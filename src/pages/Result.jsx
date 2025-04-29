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
      if (user) {
        const scoreRef = collection(db, "scores");
        await addDoc(scoreRef, {
          uid: user.uid,
          score,
          total,
          timestamp: serverTimestamp(),
        });
      }
    };

    useEffect(() => {
      saveScoreToFirestore();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-green-800">
      <h1 className="mb-4 text-4xl">Congratulations!</h1>
      <p className="mb-8 text-2xl">
        Your Score: {state?.score} / {state?.total}
      </p>
      <button
        onClick={() => navigate("/welcome")}
        className="p-4 bg-green-600 rounded-lg hover:bg-green-700"
      >
        Done
      </button>
    </div>
  );
}
