// src/pages/Result.js
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 text-white">
      <h1 className="text-4xl mb-4">Congratulations!</h1>
      <p className="text-2xl mb-8">
        Your Score: {state?.score} / {state?.total}
      </p>
      <button
        onClick={() => navigate("/quiz")}
        className="bg-green-600 hover:bg-green-700 p-4 rounded-lg"
      >
        Play Again
      </button>
    </div>
  );
}
