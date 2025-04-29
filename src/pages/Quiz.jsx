// src/pages/Quiz.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./components/QuestionCard"
import Loading from "./Loading";


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
    let updatedScore = score;
    if (isCorrect) updatedScore += 1;
  
    if (currentIndex + 1 < questions.length) {
      setScore(updatedScore);
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/result", { state: { score: updatedScore, total: questions.length } });
    }
  };
  

  if (questions.length === 0) return <Loading/>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
