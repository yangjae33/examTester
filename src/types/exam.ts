export type QuestionType = 'single' | 'multiple' | 'text';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correct: number[];
  explanation?: string;
}

export interface Exam {
  title: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  selected: number[];
  isCorrect: boolean;
}

export interface ExamProgress {
  currentQuestion: number;
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
}
