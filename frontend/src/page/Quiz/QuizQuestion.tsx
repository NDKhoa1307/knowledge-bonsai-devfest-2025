import { Radio, Space, Typography, Card } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { type QuizQuestionType } from './types';

const { Title, Text } = Typography;

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentQuestionIndex: number;
  selectedAnswer: string | undefined;
  onAnswerChange: (e: RadioChangeEvent) => void;
}

export const QuizQuestion = ({ 
  question, 
  currentQuestionIndex, 
  selectedAnswer, 
  onAnswerChange 
}: QuizQuestionProps) => {
  
  return (
    <Card
      bordered={false}
      className="shadow-xl !rounded-3xl overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl"
    >
      {/* Header: Question Number Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-stone-100 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
          Question {currentQuestionIndex + 1}
        </span>
      </div>

      {/* Question Text */}
      <Title level={3} className="!mb-8 !text-stone-800 !font-bold leading-tight">
        {question.question}
      </Title>

      {/* Answer Choices */}
      <Radio.Group
        onChange={onAnswerChange}
        value={selectedAnswer}
        className="w-full"
      >
        <Space direction="vertical" className="w-full" size={16}>
          {question.choices.map((choice, index) => {
            const isSelected = selectedAnswer === choice;
            const letter = String.fromCharCode(65 + index); // A, B, C...

            return (
              <label
                key={index}
                className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 group
                  ${isSelected 
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500' 
                    : 'border-stone-100 bg-white hover:border-emerald-200 hover:bg-stone-50'
                  }
                `}
              >
                {/* The actual Radio input (hidden visually but keeps accessibility) */}
                <Radio value={choice} className="hidden" />

                {/* Letter Badge */}
                <div 
                  className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold mr-4 transition-all duration-200
                    ${isSelected 
                      ? 'bg-emerald-500 text-white shadow-md scale-105' 
                      : 'bg-stone-100 text-stone-500 group-hover:bg-white group-hover:text-emerald-600 group-hover:shadow-sm'
                    }
                  `}
                >
                  {letter}
                </div>

                {/* Answer Text */}
                <div className="flex-1">
                  <Text 
                    className={`text-base font-medium transition-colors duration-200
                      ${isSelected ? 'text-emerald-900' : 'text-stone-600'}
                    `}
                  >
                    {choice}
                  </Text>
                </div>

                {/* Selection Indicator (Checkmark) */}
                <div className={`absolute right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                  ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-500">
                     <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                   </svg>
                </div>
              </label>
            );
          })}
        </Space>
      </Radio.Group>
    </Card>
  );
};