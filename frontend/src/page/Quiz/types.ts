export interface QuizQuestionType {
  question: string;
  choices: string[];
  answer: string;
}

export interface QuizData {
  quizzes: QuizQuestionType[];
}

export interface QuizProps {
  quizData?: QuizData;
  treeId?: number; // Tree ID to fetch quiz data from backend
}

