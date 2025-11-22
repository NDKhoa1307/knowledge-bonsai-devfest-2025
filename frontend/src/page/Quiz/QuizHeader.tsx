import { Space, Typography, Tag } from 'antd';
import { QuestionCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface QuizHeaderProps {
  elapsedTime: number;
  answeredCount: number;
  totalQuestions: number;
  formatTime: (ms: number) => string;
}

export const QuizHeader = ({ 
  elapsedTime, 
  answeredCount, 
  totalQuestions, 
  formatTime 
}: QuizHeaderProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Space>
        <QuestionCircleOutlined style={{ fontSize: 24, color: '#667eea' }} />
        <Title level={4} style={{ margin: 0 }}>Knowledge Quiz</Title>
      </Space>
      <Space size={16}>
        <Tag icon={<ClockCircleOutlined />} color="blue">
          {formatTime(elapsedTime)}
        </Tag>
        <Tag color="green">
          {answeredCount} / {totalQuestions}
        </Tag>
      </Space>
    </div>
  );
};

