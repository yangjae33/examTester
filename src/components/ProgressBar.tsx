interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export const ProgressBar = ({ current, total, score }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-gray-700">
          Score: {score}/{current}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
