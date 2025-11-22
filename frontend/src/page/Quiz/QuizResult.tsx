import { Button, Card, Progress, Typography, Divider, theme } from 'antd';
import { 
  RedoOutlined, 
  HomeOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  TrophyFilled
} from '@ant-design/icons';

interface QuizResultProps {
  correctCount: number;
  totalQuestions: number;
  elapsedTime: number;
  formatTime: (ms: number) => string;
  onRetake: () => void;
  onClose: () => void;
}

const { Title, Text } = Typography;

export const QuizResult = ({ 
  correctCount, 
  totalQuestions, 
  elapsedTime, 
  formatTime,
  onRetake,
  onClose
}: QuizResultProps) => {
  const { token } = theme.useToken();
  
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = percentage >= 70;
  const incorrectCount = totalQuestions - correctCount;

  // Dynamic Colors based on result
  const resultColor = isPassed ? token.colorSuccess : token.colorWarning;
  const resultBg = isPassed ? 'bg-emerald-50' : 'bg-amber-50';
  const resultText = isPassed ? 'text-emerald-700' : 'text-amber-700';
  const resultBorder = isPassed ? 'border-emerald-100' : 'border-amber-100';

  return (
    <div className="flex items-center justify-center min-h-[500px] p-4">
      <Card 
        bordered={false}
        className="w-full max-w-md shadow-2xl !rounded-3xl overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* 1. Header Section with Progress Circle */}
        <div className={`flex flex-col items-center justify-center pt-10 pb-8 px-6 ${resultBg}`}>
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-white rounded-full opacity-50 blur-xl transform scale-90" />
            <Progress 
              type="circle" 
              percent={percentage} 
              width={140} 
              strokeColor={resultColor}
              strokeWidth={8}
              trailColor="rgba(255,255,255,0.5)"
              format={(percent) => (
                <div className="flex flex-col items-center -mt-2">
                  <span className={`text-3xl font-bold ${resultText}`}>{percent}%</span>
                  <span className="text-xs text-stone-500 font-medium uppercase tracking-wide">Score</span>
                </div>
              )}
              className="bg-white rounded-full p-1 shadow-sm"
            />
            {isPassed && (
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
                <TrophyFilled style={{ fontSize: '20px' }} />
              </div>
            )}
          </div>

          <Title level={3} className={`!mb-1 !mt-2 ${resultText}`}>
            {isPassed ? 'Quiz Mastered!' : 'Review Needed'}
          </Title>
          <Text className="text-stone-500 text-center max-w-[260px]">
            {isPassed 
              ? "You've demonstrated excellent understanding of this topic." 
              : "Don't give up! Review the material and try again to earn your badge."}
          </Text>
        </div>

        {/* 2. Stats Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Correct */}
            <div className="flex flex-col items-center p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <CheckCircleFilled className="text-emerald-500 text-xl mb-1" />
              <span className="text-2xl font-bold text-stone-700">{correctCount}</span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Correct</span>
            </div>

            {/* Incorrect */}
            <div className="flex flex-col items-center p-3 bg-red-50 rounded-2xl border border-red-100">
              <CloseCircleFilled className="text-red-400 text-xl mb-1" />
              <span className="text-2xl font-bold text-stone-700">{incorrectCount}</span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Wrong</span>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <ClockCircleFilled className="text-blue-400 text-xl mb-1" />
              <span className="text-lg font-bold text-stone-700 mt-1">{formatTime(elapsedTime)}</span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">Time</span>
            </div>
          </div>

          <Divider className="!my-4" />

          {/* 3. Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button 
              type="primary" 
              size="large" 
              onClick={onRetake}
              icon={<RedoOutlined />}
              className="!h-12 !rounded-xl !text-base !font-semibold shadow-md hover:!scale-[1.02] transition-transform"
              style={{
                background: 'linear-gradient(to right, #111827, #374151)', // Dark stone gradient
                border: 'none'
              }}
            >
              Try Again
            </Button>
            
            <Button 
              size="large" 
              onClick={onClose}
              icon={<HomeOutlined />}
              className="!h-12 !rounded-xl !text-base !text-stone-500 hover:!text-stone-800 hover:!bg-stone-100 hover:!border-stone-300"
            >
              Back to Learning
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};