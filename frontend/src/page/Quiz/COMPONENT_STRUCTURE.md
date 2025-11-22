# Quiz Component Structure

## 📁 File Organization

The Quiz component has been refactored into smaller, reusable components for better maintainability and organization.

```
src/page/Quiz/
├── Quiz.tsx                    # Main component (orchestrator)
├── QuizButton.tsx             # Start Quiz button
├── QuizHeader.tsx             # Drawer header with timer
├── QuizProgress.tsx           # Progress bar and statistics
├── QuizQuestion.tsx           # Question display with answers
├── QuizNavigation.tsx         # Quick navigation buttons
├── QuizFooter.tsx             # Previous/Next/Submit buttons
├── SubmitModal.tsx            # Confirmation modal
├── types.ts                   # TypeScript interfaces
├── mockData.ts                # Sample quiz data
├── index.ts                   # Exports
└── COMPONENT_STRUCTURE.md     # This file
```

## 🎯 Component Breakdown

### 1. **Quiz.tsx** (Main Component - 180 lines)
**Purpose**: Orchestrates all child components and manages state

**State Management**:
- `open`: Drawer visibility
- `currentQuestion`: Current question index
- `userAnswers`: User's selected answers
- `startTime` & `elapsedTime`: Timer state
- `isModalVisible`: Submit modal visibility

**Responsibilities**:
- Manages quiz flow
- Handles timer logic
- Calculates scores
- Coordinates child components

**Props**: `QuizProps { quizData?: QuizData }`

---

### 2. **QuizButton.tsx** (25 lines)
**Purpose**: The "Start Quiz" button component

**Props**:
```typescript
interface QuizButtonProps {
  onClick: () => void;
}
```

**Styling**:
- Gradient purple-blue background
- 48px height
- Shadow effect
- Question circle icon

---

### 3. **QuizHeader.tsx** (30 lines)
**Purpose**: Drawer header with quiz title and status

**Props**:
```typescript
interface QuizHeaderProps {
  elapsedTime: number;
  answeredCount: number;
  totalQuestions: number;
  formatTime: (ms: number) => string;
}
```

**Displays**:
- Quiz title with icon
- Live timer (MM:SS)
- Progress count (X / Total)

---

### 4. **QuizProgress.tsx** (65 lines)
**Purpose**: Progress visualization and statistics

**Props**:
```typescript
interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
}
```

**Components**:
- Linear progress bar
- 3 statistic cards:
  - ✅ Answered (Green)
  - ⚠️ Remaining (Yellow)
  - 📈 Progress % (Blue)

---

### 5. **QuizQuestion.tsx** (80 lines)
**Purpose**: Displays single question with answer choices

**Props**:
```typescript
interface QuizQuestionProps {
  question: QuizQuestionType;
  currentQuestionIndex: number;
  selectedAnswer: string | undefined;
  onAnswerChange: (e: RadioChangeEvent) => void;
}
```

**Features**:
- Question text with number
- 4 radio button choices (A, B, C, D)
- Visual feedback for selected answer:
  - Blue border (2px solid)
  - Gradient background
  - Bold text
  - Shadow effect

---

### 6. **QuizNavigation.tsx** (45 lines)
**Purpose**: Quick navigation to any question

**Props**:
```typescript
interface QuizNavigationProps {
  questions: QuizQuestionType[];
  currentQuestion: number;
  userAnswers: { [key: number]: string };
  onQuestionChange: (index: number) => void;
}
```

**Features**:
- Circle buttons (1, 2, 3, ...)
- Color coding:
  - 🔵 Blue: Current question
  - 🟢 Green: Answered
  - ⚪ White: Not answered
- Click to jump to any question

---

### 7. **QuizFooter.tsx** (40 lines)
**Purpose**: Navigation and submit controls

**Props**:
```typescript
interface QuizFooterProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}
```

**Buttons**:
- Previous (disabled on first question)
- Next (disabled on last question)
- Submit (red danger button)

---

### 8. **SubmitModal.tsx** (85 lines)
**Purpose**: Submission confirmation with two states

**Props**:
```typescript
interface SubmitModalProps {
  isVisible: boolean;
  answeredCount: number;
  totalQuestions: number;
  unansweredCount: number;
  elapsedTime: number;
  formatTime: (ms: number) => string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

**Case 1 - All Answered**:
- ✅ Green checkmark
- "All questions answered!"
- Time taken
- Submit/Review buttons

**Case 2 - Incomplete**:
- ⚠️ Yellow warning
- "Incomplete Quiz"
- Answered vs Not Answered stats
- Confirmation to submit anyway

---

### 9. **types.ts** (18 lines)
**Purpose**: Shared TypeScript interfaces

**Exports**:
```typescript
export interface QuizQuestionType {
  question: string;
  choices: string[];
  answer: string;
}

export interface QuizData {
  quizzes: QuizQuestionType[];
}

export interface QuizProps {
  quizData?: QuizData;
}
```

---

### 10. **mockData.ts** (35 lines)
**Purpose**: Sample quiz data for testing

**Format**:
```typescript
export const mockQuizData: QuizData = {
  quizzes: [
    {
      question: "...",
      choices: ["A", "B", "C", "D"],
      answer: "A"
    }
  ]
};
```

---

## 🔄 Component Flow

```
Quiz (Main)
├── QuizButton
│   └── onClick → Opens Drawer
│
└── Drawer
    ├── Header
    │   └── QuizHeader (title, timer, progress)
    │
    ├── Body
    │   ├── QuizProgress (bar + stats)
    │   ├── QuizQuestion (current question)
    │   └── QuizNavigation (quick jump)
    │
    ├── Footer
    │   └── QuizFooter (prev/next/submit)
    │
    └── Modal
        └── SubmitModal (confirmation)
```

## 📊 Size Comparison

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| Quiz.tsx | 450 lines | 180 lines | **60%** |

**New Files Created**: 8 components + 1 types + 1 data = **10 files**

## ✨ Benefits

### 1. **Modularity**
- Each component has single responsibility
- Easy to understand and maintain

### 2. **Reusability**
- Components can be used independently
- Easy to test in isolation

### 3. **Scalability**
- Easy to add new features
- Easy to modify existing features

### 4. **Type Safety**
- Centralized types in `types.ts`
- Clear prop interfaces

### 5. **Code Organization**
- Logical separation of concerns
- Easy to find specific functionality

## 🎯 Usage

### Basic Import
```typescript
import { Quiz } from './page/Quiz';

<Quiz />
```

### With API Data
```typescript
import { Quiz, type QuizData } from './page/Quiz';

const data: QuizData = await fetchQuizData();
<Quiz quizData={data} />
```

### Import Individual Components
```typescript
import { 
  QuizButton, 
  QuizHeader, 
  QuizProgress,
  QuizQuestion,
  QuizNavigation,
  QuizFooter,
  SubmitModal
} from './page/Quiz';
```

## 🛠️ Customization

Each component can be easily customized:

1. **Colors**: Change gradient values in component styles
2. **Sizes**: Modify width, height, padding in props
3. **Icons**: Replace Ant Design icons
4. **Layout**: Adjust component arrangement in Quiz.tsx
5. **Logic**: Modify state management in Quiz.tsx

## 📝 Testing

Each component can be tested independently:

```typescript
// QuizButton.test.tsx
import { QuizButton } from './QuizButton';

test('calls onClick when clicked', () => {
  const onClick = jest.fn();
  render(<QuizButton onClick={onClick} />);
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalled();
});
```

## 🚀 Summary

The Quiz component has been successfully refactored into **10 smaller, focused files**:

✅ Main component reduced by **60%**  
✅ **8 reusable** child components  
✅ **Clear separation** of concerns  
✅ **Type-safe** with shared interfaces  
✅ **Easy to maintain** and extend  
✅ **Production-ready** architecture  

All functionality remains exactly the same, but the code is now much more organized and maintainable! 🎉

