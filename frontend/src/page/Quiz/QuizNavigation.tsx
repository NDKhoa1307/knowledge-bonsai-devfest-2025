import { Button, Space, Card } from 'antd';
import { type QuizQuestionType } from './types';

interface QuizNavigationProps {
  questions: QuizQuestionType[];
  currentQuestion: number;
  userAnswers: { [key: number]: string };
  onQuestionChange: (index: number) => void;
}

export const QuizNavigation = ({ 
  questions, 
  currentQuestion, 
  userAnswers, 
  onQuestionChange 
}: QuizNavigationProps) => {
  return (
    <Card size="small" title="Quick Navigation">
      <Space wrap>
        {questions.map((_, index) => (
          <Button
            key={index}
            type={currentQuestion === index ? 'primary' : 'default'}
            shape="circle"
            size="small"
            onClick={() => onQuestionChange(index)}
            style={{
              background: userAnswers[index] 
                ? (currentQuestion === index ? '#667eea' : '#52c41a')
                : (currentQuestion === index ? '#667eea' : '#ffffff'),
              color: userAnswers[index] || currentQuestion === index ? '#ffffff' : '#262626',
              borderColor: userAnswers[index] ? '#52c41a' : '#d9d9d9',
              fontWeight: 600,
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Space>
    </Card>
  );
};

