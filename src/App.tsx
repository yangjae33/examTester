import { useState, useEffect } from 'react';
import { Exam, UserAnswer } from './types/exam';
import { FileUpload } from './components/FileUpload';
import { QuestionView } from './components/QuestionView';
import { ProgressBar } from './components/ProgressBar';
import { ScoreBoard } from './components/ScoreBoard';
import { saveProgress, loadProgress, clearProgress } from './utils/storage';
import { shuffleExamOptions } from './utils/shuffle';

function App() {
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress && exam) {
      setCurrentQuestion(savedProgress.currentQuestion);
      setAnswers(savedProgress.answers);
    }
  }, [exam]);

  // Save progress whenever it changes
  useEffect(() => {
    if (exam && answers.length > 0) {
      saveProgress({
        currentQuestion,
        answers,
        score: answers.filter((a) => a.isCorrect).length,
        totalQuestions: exam.questions.length,
      });
    }
  }, [currentQuestion, answers, exam]);

  const handleExamLoaded = (loadedExam: Exam, shouldShuffle: boolean) => {
    const finalExam = shouldShuffle ? shuffleExamOptions(loadedExam) : loadedExam;
    setExam(finalExam);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    clearProgress();
  };

  const handleAnswer = (selected: number[], isCorrect: boolean) => {
    const newAnswer: UserAnswer = {
      questionId: exam!.questions[currentQuestion].id,
      selected,
      isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < exam!.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    clearProgress();
  };

  if (!exam) {
    return <FileUpload onExamLoaded={handleExamLoaded} />;
  }

  if (isComplete) {
    const score = answers.filter((a) => a.isCorrect).length;
    return (
      <ScoreBoard
        score={score}
        total={exam.questions.length}
        onRestart={handleRestart}
      />
    );
  }

  const score = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="min-h-screen gradient-bg-soft py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {exam.title}
          </h1>
          <ProgressBar
            current={currentQuestion}
            total={exam.questions.length}
            score={score}
          />
        </div>

        <QuestionView
          question={exam.questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}

export default App;
