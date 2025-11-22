import { z } from 'zod';

const QuizItemSchema = z.object({
  question: z.string(),
  choices: z.array(z.string()),
  answer: z.string(),
});

export const QuizDataSchema = z.object({
  quizzes: z.array(QuizItemSchema),
});
