import { Button, Space } from 'antd';
import { LeftOutlined, RightOutlined, SendOutlined } from '@ant-design/icons';

interface QuizFooterProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const QuizFooter = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit 
}: QuizFooterProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Space>
        <Button
          icon={<LeftOutlined />}
          onClick={onPrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          icon={<RightOutlined />}
          onClick={onNext}
          disabled={currentQuestion === totalQuestions - 1}
          type="default"
        >
          Next
        </Button>
      </Space>
      <Button
        type="primary"
        danger
        icon={<SendOutlined />}
        onClick={onSubmit}
        size="large"
        style={{
          fontWeight: 600,
        }}
      >
        Submit Quiz
      </Button>
    </div>
  );
};

