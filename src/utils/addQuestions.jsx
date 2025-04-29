// src/utils/addQuestions.jsx

import { db } from "../firebase"; // Correct relative path
import { collection, addDoc } from "firebase/firestore";

// Questions array
const questions = [
  {
    question: "What is the capital of France?",
    options: [
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Rome", isCorrect: false },
    ],
  },
   {
    question: "What is the largest planet in our solar system?",
    options: [
      { text: "Earth", isCorrect: false },
      { text: "Jupiter", isCorrect: true },
      { text: "Mars", isCorrect: false },
      { text: "Saturn", isCorrect: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    options: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: true },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false },
    ],
  },
  {
    question: "Which animal is known as the king of the jungle?",
    options: [
      { text: "Tiger", isCorrect: false },
      { text: "Lion", isCorrect: true },
      { text: "Elephant", isCorrect: false },
      { text: "Bear", isCorrect: false },
    ],
  },
  {
    question: "What is the boiling point of water?",
    options: [
      { text: "90°C", isCorrect: false },
      { text: "100°C", isCorrect: true },
      { text: "110°C", isCorrect: false },
      { text: "120°C", isCorrect: false },
    ],
  },
  {
    question: "Who wrote the play Romeo and Juliet?",
    options: [
      { text: "Shakespeare", isCorrect: true },
      { text: "Dickens", isCorrect: false },
      { text: "Hemingway", isCorrect: false },
      { text: "Austen", isCorrect: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: [
      { text: "China", isCorrect: false },
      { text: "Japan", isCorrect: true },
      { text: "South Korea", isCorrect: false },
      { text: "Thailand", isCorrect: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    options: [
      { text: "Au", isCorrect: true },
      { text: "Ag", isCorrect: false },
      { text: "Fe", isCorrect: false },
      { text: "Pb", isCorrect: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    options: [
      { text: "K2", isCorrect: false },
      { text: "Mount Everest", isCorrect: true },
      { text: "Kangchenjunga", isCorrect: false },
      { text: "Lhotse", isCorrect: false },
    ],
  },
  {
    question: "What is the square root of 64?",
    options: [
      { text: "6", isCorrect: false },
      { text: "8", isCorrect: true },
      { text: "10", isCorrect: false },
      { text: "12", isCorrect: false },
    ],
  },
];

// Function to add questions to Firestore
export const addQuestionsToFirestore = async () => {
  const questionsCollection = collection(db, "questions");

  try {
    for (const question of questions) {
      await addDoc(questionsCollection, question);
      console.log(`Question added: ${question.question}`);
    }
    console.log("All questions added successfully!");
  } catch (e) {
    console.error("Error adding questions: ", e);
  }
};
