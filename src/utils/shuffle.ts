import { Exam } from '../types/exam';

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Shuffles question options and updates correct answer indices
 */
export function shuffleExamOptions(exam: Exam): Exam {
  const shuffledQuestions = exam.questions.map((question) => {
    // Create a mapping of old index to new index
    const indices = question.options.map((_, idx) => idx);
    const shuffledIndices = shuffleArray(indices);

    // Create new options array with shuffled order
    const shuffledOptions = shuffledIndices.map((idx) => question.options[idx]);

    // Update correct answer indices to match new positions
    const newCorrect = question.correct.map((oldIdx) => {
      return shuffledIndices.indexOf(oldIdx);
    });

    return {
      ...question,
      options: shuffledOptions,
      correct: newCorrect,
    };
  });

  return {
    ...exam,
    questions: shuffledQuestions,
  };
}
