import { QuestionType } from '../types/exam';

interface AnswerOptionsProps {
  options: string[];
  questionType: QuestionType;
  selected: number[];
  onSelect: (index: number) => void;
  correctAnswers?: number[];
  showResult: boolean;
}

export const AnswerOptions = ({
  options,
  questionType,
  selected,
  onSelect,
  correctAnswers = [],
  showResult,
}: AnswerOptionsProps) => {
  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selected.includes(index)
        ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-500 shadow-md scale-[1.02]'
        : 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-md hover:scale-[1.01]';
    }

    const isCorrect = correctAnswers.includes(index);
    const isSelected = selected.includes(index);

    if (isCorrect) {
      return 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-500 shadow-md';
    }
    if (isSelected && !isCorrect) {
      return 'bg-gradient-to-r from-red-100 to-pink-100 border-red-500 shadow-md';
    }
    return 'bg-white border-gray-300 opacity-60';
  };

  const getOptionIcon = (index: number) => {
    if (!showResult) return null;

    const isCorrect = correctAnswers.includes(index);
    const isSelected = selected.includes(index);

    if (isCorrect) {
      return (
        <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Correct
        </div>
      );
    }
    if (isSelected && !isCorrect) {
      return (
        <div className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          Wrong
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !showResult && onSelect(index)}
          disabled={showResult}
          className={`w-full p-5 text-left border-2 rounded-xl transition-all duration-200 ${getOptionStyle(
            index
          )} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center">
                {questionType === 'multiple' ? (
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selected.includes(index)
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-400 bg-white'
                  }`}>
                    {selected.includes(index) && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selected.includes(index)
                      ? 'border-purple-500'
                      : 'border-gray-400'
                  }`}>
                    {selected.includes(index) && (
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    )}
                  </div>
                )}
              </div>
              <span className="text-gray-800 font-medium leading-relaxed">{option}</span>
            </div>
            {getOptionIcon(index)}
          </div>
        </button>
      ))}
    </div>
  );
};
