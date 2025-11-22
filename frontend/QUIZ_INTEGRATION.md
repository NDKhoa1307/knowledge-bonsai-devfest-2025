# Quiz Button Integration - TreePage

## ✅ Integration Complete!

The Quiz button has been successfully added to the **TreePage** in the **top-right corner**.

## 📍 Location

```
┌─────────────────────────────────────────────────────────┐
│                  Somebody's bonsai             [QUIZ]  │ ← Top right corner
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    Knowledge Tree                       │
│                   (ReactFlow Graph)                     │
│                                                         │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Button Appearance

The Quiz button appears as:
- **Gradient styled** button (Purple-Blue gradient)
- **"Start Quiz"** text with quiz icon
- **Floating** in the top-right corner
- **Professional** design matching your Bonsai theme

## 🔧 Implementation Details

### File Modified: `src/page/Tree/TreePage.tsx`

```tsx
import { Quiz } from "../Quiz";

// ...inside ReactFlow component

<Panel position="top-right" style={{ margin: 0 }}>
  <Quiz />
</Panel>
```

## 📱 User Flow

1. **User visits Tree page** (`/trees` route)
2. **Sees knowledge tree** with ReactFlow graph
3. **Quiz button visible** in top-right corner
4. **Clicks "Start Quiz"** button
5. **Drawer opens** from the right side
6. **Takes quiz** with all features:
   - Live timer
   - Progress tracking
   - Question navigation
   - Answer selection with color changes
   - Submit with confirmation
7. **Receives results** with score and time

## 🎯 Features Available

When user clicks the Quiz button on TreePage:

### ✨ Full Quiz Experience:
- ✅ 720px wide drawer from right side
- ✅ Live timer (MM:SS)
- ✅ Progress bar and statistics
- ✅ Single choice questions (A, B, C, D)
- ✅ Answer selection with color changes:
  - Selected: Blue border, gradient background, bold, shadow
  - Not selected: White background, gray border
- ✅ Navigation buttons (Previous/Next)
- ✅ Quick navigation circles (jump to any question)
- ✅ Submit button in bottom-right
- ✅ Confirmation modal:
  - **All answered**: Green checkmark, ready to submit
  - **Incomplete**: Yellow warning, shows answered/unanswered count
- ✅ Results modal with score and percentage

## 📊 Quiz Data Integration

The Quiz component accepts data from your backend:

```typescript
// When you fetch quiz data from API:
const quizData = {
  quizzes: [
    {
      question: "Your question?",
      choices: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option A"
    }
  ]
};

// Pass it to Quiz component:
<Quiz quizData={quizData} />
```

## 🔄 Current Setup

Currently using **mock data** (4 sample questions) for demonstration.

To integrate with your backend:

1. **Fetch quiz data** when TreePage loads
2. **Pass data to Quiz component**

Example:

```tsx
import { useState, useEffect } from 'react';
import { Quiz } from '../Quiz';

function TreePage() {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    // Fetch from your API
    fetch('http://localhost:3000/api/quiz')
      .then(res => res.json())
      .then(data => setQuizData(data));
  }, []);

  return (
    <div>
      {/* Your tree visualization */}
      <ReactFlow>
        {/* ... */}
        <Panel position="top-right">
          <Quiz quizData={quizData} />
        </Panel>
      </ReactFlow>
    </div>
  );
}
```

## 🎨 Styling

The Quiz button is styled to match your Bonsai theme:
- **Gradient**: Purple to Blue (`#667eea` to `#764ba2`)
- **Shadow**: Subtle glow effect
- **Size**: Large (48px height)
- **Icon**: Question circle icon
- **Hover**: Smooth transitions

## 📝 Testing

To test the Quiz button:

1. Navigate to `/trees` route
2. Look for **"Start Quiz"** button in top-right corner
3. Click the button
4. Drawer should open from the right
5. Try answering questions
6. Click answers to see color changes
7. Use navigation buttons
8. Submit and check modals

## 🚀 Summary

✅ Quiz button added to TreePage  
✅ Positioned in top-right corner  
✅ Opens drawer with full quiz functionality  
✅ Beautiful UI with Ant Design  
✅ All requested features implemented  
✅ Ready for backend integration  

The Quiz is now fully integrated and ready to use! 🎉

