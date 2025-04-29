// src/components/QuestionCard.js
export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-80 shadow-xl text-white">
  <h2 className="text-2xl font-semibold mb-6">{question.question}</h2>
  <div className="flex flex-col">
    {question.options.map((option, idx) => (
      <button
        key={idx}
        onClick={() => onAnswer(option.isCorrect)}
        className="my-2 py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-black hover:text-white transition"
      >
        {option.text}
      </button>
    ))}
  </div>
</div>

  );
}
