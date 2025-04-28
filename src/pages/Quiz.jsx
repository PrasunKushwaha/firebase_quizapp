// src/pages/Quiz.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./components/QuestionCard"

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const qs = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(qs);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
