import { useState } from 'react';
import { Question } from '../types/exam';
import { AnswerOptions } from './AnswerOptions';

interface QuestionViewProps {
  question: Question;
  onAnswer: (selected: number[], isCorrect: boolean) => void;
}

export const QuestionView = ({ question, onAnswer }: QuestionViewProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (question.type === 'single') {
      setSelected([index]);
    } else {
      setSelected((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const handleSubmit = () => {
    const isCorrect =
      selected.length === question.correct.length &&
      selected.every((s) => question.correct.includes(s));

    setShowResult(true);
    onAnswer(selected, isCorrect);
  };

  const handleNext = () => {
    setSelected([]);
    setShowResult(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          {question.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {question.question}
        </h2>
      </div>

      <AnswerOptions
        options={question.options}
        questionType={question.type}
        selected={selected}
        onSelect={handleSelect}
        correctAnswers={question.correct}
        showResult={showResult}
      />

      {showResult && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-semibold text-blue-900 mb-2">Explanation:</div>
          <p className="text-blue-800">{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              selected.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};
