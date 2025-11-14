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
        ? 'bg-blue-100 border-blue-500'
        : 'bg-white border-gray-300 hover:border-blue-400';
    }

    const isCorrect = correctAnswers.includes(index);
    const isSelected = selected.includes(index);

    if (isCorrect) {
      return 'bg-green-100 border-green-500';
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-100 border-red-500';
    }
    return 'bg-white border-gray-300';
  };

  const getOptionIcon = (index: number) => {
    if (!showResult) return null;

    const isCorrect = correctAnswers.includes(index);
    const isSelected = selected.includes(index);

    if (isCorrect) {
      return (
        <span className="ml-2 text-green-600 font-bold">✓</span>
      );
    }
    if (isSelected && !isCorrect) {
      return (
        <span className="ml-2 text-red-600 font-bold">✗</span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !showResult && onSelect(index)}
          disabled={showResult}
          className={`w-full p-4 text-left border-2 rounded-lg transition-all ${getOptionStyle(
            index
          )} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {questionType === 'multiple' ? (
                <input
                  type="checkbox"
                  checked={selected.includes(index)}
                  readOnly
                  className="w-4 h-4"
                />
              ) : (
                <input
                  type="radio"
                  checked={selected.includes(index)}
                  readOnly
                  className="w-4 h-4"
                />
              )}
              <span className="text-gray-800">{option}</span>
            </div>
            {getOptionIcon(index)}
          </div>
        </button>
      ))}
    </div>
  );
};
