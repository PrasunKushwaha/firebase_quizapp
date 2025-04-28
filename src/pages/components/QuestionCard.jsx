// src/components/QuestionCard.js
export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="bg-gray-700 p-8 rounded-lg w-80">
      <h2 className="text-2xl mb-4">{question.question}</h2>
      <div className="flex flex-col">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.isCorrect)}
            className="bg-blue-500 hover:bg-blue-600 my-2 p-3 rounded"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
