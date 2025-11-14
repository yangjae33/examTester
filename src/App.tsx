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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
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
