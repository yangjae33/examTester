interface ScoreBoardProps {
  score: number;
  total: number;
  onRestart: () => void;
  onLoadNewExam: () => void;
}

export const ScoreBoard = ({ score, total, onRestart, onLoadNewExam }: ScoreBoardProps) => {
  const percentage = Math.round((score / total) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { text: 'Excellent!', color: 'text-green-600' };
    if (percentage >= 70) return { text: 'Good Job!', color: 'text-blue-600' };
    if (percentage >= 50) return { text: 'Not Bad', color: 'text-yellow-600' };
    return { text: 'Keep Practicing', color: 'text-red-600' };
  };

  const grade = getGrade();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Exam Complete!
          </h2>

          <div className="mb-8">
            <div className="text-6xl font-bold mb-2 text-blue-600">
              {percentage}%
            </div>
            <div className={`text-2xl font-semibold mb-4 ${grade.color}`}>
              {grade.text}
            </div>
            <div className="text-gray-600">
              You got <span className="font-bold">{score}</span> out of{' '}
              <span className="font-bold">{total}</span> questions correct
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Try Again
            </button>
            <button
              onClick={onLoadNewExam}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              Load New Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
