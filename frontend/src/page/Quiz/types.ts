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
}

