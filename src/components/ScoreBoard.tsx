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
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="glass-effect rounded-3xl shadow-2xl p-12 max-w-lg w-full mx-4 relative z-10 animate-scale-in">
        <div className="text-center">
          {/* Trophy Icon */}
          <div className="mb-6 animate-float">
            <svg className="w-24 h-24 mx-auto text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 01-3 0H10V3.5zM3.5 10a1.5 1.5 0 010-3H4a1 1 0 001-1V3a1 1 0 011-1h3a1 1 0 011 1v.5a1.5 1.5 0 010 3H10v3.5z"/>
              <path fillRule="evenodd" d="M9 16a1 1 0 102 0v-4h.5a3.5 3.5 0 000-7H4a3 3 0 00-3 3v1a5 5 0 0010 0v-1a3 3 0 00-3-3H9v4a1 1 0 01-2 0v-4H4.5a1.5 1.5 0 000 3H7v4a1 1 0 102 0V8.5h2.5a1.5 1.5 0 010 3H9v4z" clipRule="evenodd"/>
            </svg>
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            🎉 Exam Complete!
          </h2>

          <div className="mb-10">
            <div className="relative inline-block">
              <div className="text-7xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-lg">
                {percentage}%
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div className={`text-3xl font-bold mb-6 ${grade.color}`}>
              {grade.text}
            </div>
            <div className="text-gray-700 text-lg">
              You got <span className="font-black text-purple-600">{score}</span> out of{' '}
              <span className="font-black text-purple-600">{total}</span> questions correct
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onRestart}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:from-purple-600 hover:to-blue-600 hover:scale-105 transform transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              Try Again
            </button>
            <button
              onClick={onLoadNewExam}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              onClick={() => window.location.reload()}
              className="w-full px-8 py-4 bg-white text-gray-700 rounded-xl font-bold text-lg shadow-md hover:shadow-lg hover:bg-gray-50 transform transition-all duration-200 border-2 border-gray-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              Load New Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
