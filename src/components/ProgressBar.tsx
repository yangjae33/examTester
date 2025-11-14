interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export const ProgressBar = ({ current, total, score }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-6 glass-effect rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-bold text-gray-800">
            Question {current + 1} of {total}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-bold">
            {score}/{current}
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-xs font-medium text-gray-600">
          {Math.round(percentage)}% Complete
        </span>
      </div>
    </div>
  );
};
