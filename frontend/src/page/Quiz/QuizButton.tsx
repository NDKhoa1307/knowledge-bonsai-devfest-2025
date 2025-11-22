import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface QuizButtonProps {
  onClick: () => void;
}

export const QuizButton = ({ onClick }: QuizButtonProps) => {
  return (
    <Button
      type="primary"
      size="large"
      icon={<QuestionCircleOutlined />}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        height: 48,
        paddingLeft: 24,
        paddingRight: 24,
        fontSize: 16,
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
      }}
    >
      Start Quiz
    </Button>
  );
};

