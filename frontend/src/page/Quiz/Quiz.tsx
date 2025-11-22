import { useState, useEffect } from 'react';
import { Drawer, Divider, Modal } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { type QuizProps } from './types';
import { QuizButton } from './QuizButton';
import { QuizHeader } from './QuizHeader';
import { QuizQuestion } from './QuizQuestion';
import { QuizNavigation } from './QuizNavigation';
import { QuizFooter } from './QuizFooter';
import { QuizResult } from './QuizResult';
import { mockQuizData } from './mockData';

export const Quiz = ({ quizData }: QuizProps) => {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = quizData?.quizzes || mockQuizData.quizzes;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  // Timer effect - stops when quiz is submitted (showResult = true)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (open && startTime > 0 && !showResult) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [open, startTime, showResult]);

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOpenDrawer = () => {
    setOpen(true);
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setUserAnswers({});
    setElapsedTime(0);
    setShowResult(false);
    setCorrectCount(0);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleAnswerChange = (e: RadioChangeEvent) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = totalQuestions - answeredCount;
    
    Modal.confirm({
      title: 'Confirm Quiz Submission',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          {answeredCount === totalQuestions ? (
            <div>
              <p>✅ You have answered all <strong>{totalQuestions}</strong> questions.</p>
              <p>Are you ready to submit your quiz and see your results?</p>
            </div>
          ) : (
            <div>
              <p>⚠️ <strong>Warning:</strong> You have not answered all questions yet.</p>
              <p>• Answered: <strong>{answeredCount}</strong> / {totalQuestions}</p>
              <p>• Unanswered: <strong>{unansweredCount}</strong></p>
              <p>Do you want to submit anyway?</p>
            </div>
          )}
        </div>
      ),
      okText: 'Submit Now',
      cancelText: 'Review Answers',
      okButtonProps: {
        danger: answeredCount !== totalQuestions,
        size: 'large',
      },
      cancelButtonProps: {
        size: 'large',
      },
      onOk: () => {
        // Freeze the timer at submission time
        const finalTime = Date.now() - startTime;
        setElapsedTime(finalTime);
        
        // Calculate score
        let correct = 0;
        questions.forEach((q, index) => {
          if (userAnswers[index] === q.answer) {
            correct++;
          }
        });
        setCorrectCount(correct);
        setShowResult(true);
      },
      centered: true,
      width: 480,
    });
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setStartTime(Date.now());
    setElapsedTime(0);
    setShowResult(false);
    setCorrectCount(0);
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = userAnswers[currentQuestion];

  return (
    <>
      {/* Quiz Button */}
      <QuizButton onClick={handleOpenDrawer} />

      {/* Quiz Drawer */}
      <Drawer
        title={
          showResult ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <h3 style={{ margin: 0 }}>Quiz Results</h3>
            </div>
          ) : (
            <QuizHeader
              elapsedTime={elapsedTime}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
              formatTime={formatTime}
            />
          )
        }
        placement="right"
        width={720}
        open={open}
        onClose={handleCloseDrawer}
        footer={
          showResult ? null : (
            <QuizFooter
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          )
        }
        footerStyle={{
          padding: '16px 24px',
          borderTop: '2px solid #f0f0f0',
        }}
      >
        {showResult ? (
          /* Show Results */
          <QuizResult
            correctCount={correctCount}
            totalQuestions={totalQuestions}
            elapsedTime={elapsedTime}
            formatTime={formatTime}
            onRetake={handleRetake}
            onClose={handleCloseDrawer}
          />
        ) : (
          /* Show Quiz Questions */
          <>
            {/* Question Navigation */}
            <QuizNavigation
              questions={questions}
              currentQuestion={currentQuestion}
              userAnswers={userAnswers}
              onQuestionChange={setCurrentQuestion}
            />

            <Divider />

            {/* Current Question */}
            <QuizQuestion
              question={currentQ}
              currentQuestionIndex={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerChange={handleAnswerChange}
            />


          </>
        )}
      </Drawer>
    </>
  );
};
