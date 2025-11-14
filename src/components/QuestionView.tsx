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
    <div className="glass-effect rounded-2xl shadow-2xl p-8 animate-scale-in">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
          </svg>
          {question.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
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
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl shadow-md animate-scale-in">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div>
              <div className="font-bold text-blue-900 mb-2 text-lg">Explanation</div>
              <p className="text-blue-800 leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className={`px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
              selected.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:scale-105 hover:shadow-xl'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all duration-200"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};
