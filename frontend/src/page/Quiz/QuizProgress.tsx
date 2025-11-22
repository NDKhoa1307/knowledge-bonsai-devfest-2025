import { Typography, Progress, Row, Col, Card, Statistic } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
}

export const QuizProgress = ({ 
  currentQuestion, 
  totalQuestions, 
  answeredCount, 
  unansweredCount 
}: QuizProgressProps) => {
  return (
    <>
      {/* Progress Bar */}
      <div style={{ marginBottom: 24 }}>
        <Text type="secondary" style={{ fontSize: 12, marginBottom: 8, display: 'block' }}>
          Question {currentQuestion + 1} of {totalQuestions}
        </Text>
        <Progress
          percent={((currentQuestion + 1) / totalQuestions) * 100}
          strokeColor={{
            '0%': '#667eea',
            '100%': '#764ba2',
          }}
          showInfo={false}
        />
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card size="small" style={{ textAlign: 'center', borderColor: '#52c41a' }}>
            <Statistic
              title="Answered"
              value={answeredCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ textAlign: 'center', borderColor: '#faad14' }}>
            <Statistic
              title="Remaining"
              value={unansweredCount}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#faad14', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ textAlign: 'center', borderColor: '#1890ff' }}>
            <Statistic
              title="Progress"
              value={Math.round((answeredCount / totalQuestions) * 100)}
              suffix="%"
              valueStyle={{ color: '#1890ff', fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

