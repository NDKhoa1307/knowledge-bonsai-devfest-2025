import { type QuizData } from './types';

export const mockQuizData: QuizData = {
  quizzes: [
    {
      question: "Which organization was primarily responsible for the codification of football rules in its early stages?",
      choices: ["FIFA", "UEFA", "FA", "IOC"],
      answer: "FA"
    },
    {
      question: "Which of the following scenarios does NOT result in an offside offense, according to the 'Offside Rule'?",
      choices: [
        "A player receives the ball directly from a corner kick while in an offside position",
        "A player interferes with an opponent while in an offside position",
        "A player gains an advantage by being in an offside position",
        "A player receives the ball directly from a teammate who is in an offside position"
      ],
      answer: "A player receives the ball directly from a corner kick while in an offside position"
    },
    {
      question: "What is the standard duration of a professional football match?",
      choices: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
      answer: "90 minutes"
    },
    {
      question: "How many players are on the field for each team during a match?",
      choices: ["9", "10", "11", "12"],
      answer: "11"
    }
  ]
};

