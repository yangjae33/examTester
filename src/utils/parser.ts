import { Exam } from '../types/exam';

export const parseExamFile = (fileContent: string): Exam => {
  try {
    const data = JSON.parse(fileContent);

    // Validate exam structure
    if (!data.title || !Array.isArray(data.questions)) {
      throw new Error('Invalid exam format: missing title or questions');
    }

    // Validate each question
    data.questions.forEach((q: any, index: number) => {
      if (!q.id || !q.type || !q.question || !Array.isArray(q.options) || !Array.isArray(q.correct)) {
        throw new Error(`Invalid question format at index ${index}`);
      }
    });

    return data as Exam;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format');
    }
    throw error;
  }
};
