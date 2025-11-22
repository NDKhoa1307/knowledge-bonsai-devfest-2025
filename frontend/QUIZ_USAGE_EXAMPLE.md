# Quiz Component - API Integration Guide

## ✅ What's Been Implemented

The Quiz component now fetches real quiz data from your backend API! Here's what's working:

### 1. **Quiz Service** (`src/service/quizServices.ts`)
- `getQuizzes(treeId)` - Fetches quiz questions from `GET /quizzes/:treeId`
- `createQuiz(treeId, data)` - Creates quiz using `POST /quizzes/:treeId`

### 2. **Updated Quiz Component** (`src/page/Quiz/Quiz.tsx`)
- ✅ Fetches quiz data when drawer opens
- ✅ Shows loading spinner while fetching
- ✅ Displays error message if fetch fails
- ✅ Falls back to mock data if no backend available
- ✅ Accepts `treeId` prop to know which quiz to fetch

### 3. **Integration in TreePage** (`src/page/Tree/TreePage.tsx`)
- ✅ Quiz button now passes the current tree ID
- ✅ Will fetch quiz questions specific to that tree

## 🚀 How It Works

### When User Clicks Quiz Button:

1. **Quiz drawer opens**
2. **Loading state shows** (spinner with "Loading quiz questions...")
3. **API call is made** to `GET /quizzes/:treeId`
4. **Two possible outcomes:**
   - ✅ **Success**: Quiz questions display from backend
   - ⚠️ **Failure**: Warning message shows + mock data is used as fallback

## 📝 Backend Requirements

The service now uses **POST** method with username in the request body:

### API Request Format

```typescript
// POST /quizzes/:treeId
{
  "username": "User"
}
```

The username is automatically retrieved from `localStorage` (or defaults to "User"). The backend endpoint you provided:

```typescript
@Post('/quizzes/:treeId')
async createQuiz(
  @Param('treeId', ParseIntPipe) treeId: number,
  @Body() data: CreateQuizDto, // Should contain { username: string }
): Promise<any> {
  return await this.createQuizService.createQuiz(treeId, data);
}
```

## 📊 Expected API Response Format

Your backend should return data in this format:

```json
{
  "quizzes": [
    {
      "question": "What is React?",
      "choices": [
        "A JavaScript library",
        "A programming language",
        "A database",
        "An operating system"
      ],
      "answer": "A JavaScript library"
    },
    {
      "question": "What does JSX stand for?",
      "choices": [
        "JavaScript XML",
        "Java Syntax Extension",
        "JSON X-Type",
        "JavaScript Extension"
      ],
      "answer": "JavaScript XML"
    }
  ]
}
```

## 🧪 Testing

### Test with Mock Data (No Backend):
```bash
# Quiz will automatically use mock data if API call fails
npm run dev
```

### Test with Real Backend:
```bash
# Make sure your backend is running
# Set your API URL in .env file
VITE_API_BASE_URL=http://localhost:3000

# Start frontend
npm run dev
```

## 🔍 Debugging

Open browser console to see detailed logs:
- `[QuizService] Fetching quizzes for tree X as user "User"...` - When fetch starts
- `[QuizService] Quizzes fetched successfully` - When data arrives
- `[QuizService] Error fetching quizzes` - If fetch fails

### Request Details
The service sends:
```
POST /quizzes/:treeId
Content-Type: application/json

{
  "username": "User"
}
```

## 💡 Usage Examples

### Example 1: In TreePage (Already Implemented)
```tsx
<Quiz treeId={metadata?.id ? parseInt(metadata.id) : undefined} />
```

### Example 2: With React Router
```tsx
import { useParams } from 'react-router-dom';
import { Quiz } from '@/page/Quiz';

const QuizRoute = () => {
  const { treeId } = useParams();
  return <Quiz treeId={treeId ? parseInt(treeId) : undefined} />;
};
```

### Example 3: With Hardcoded Tree ID
```tsx
<Quiz treeId={123} />
```

### Example 4: With Pre-fetched Data (No API call)
```tsx
const myQuizData = {
  quizzes: [/* ... */]
};

<Quiz quizData={myQuizData} />
```

## 🎯 Priority of Data Sources

The Quiz component uses data in this order:
1. **Fetched data** from API (if treeId provided)
2. **Prop data** (if quizData prop provided)
3. **Mock data** (fallback if everything else fails)

## ✨ Features

- ✅ Automatic data fetching on drawer open
- ✅ Loading state with spinner
- ✅ Error handling with user-friendly messages
- ✅ Automatic fallback to mock data
- ✅ TypeScript type safety
- ✅ Console logging for debugging
- ✅ Works with or without backend

## 🚨 Common Issues

### Issue: "Failed to load quiz data"
**Solution**: Check that:
- Backend is running
- `VITE_API_BASE_URL` is set correctly
- Backend endpoint `/quizzes/:treeId` exists
- CORS is configured properly

### Issue: Quiz shows mock data instead of real data
**Solution**: 
- Open browser console and check for error messages
- Verify `treeId` prop is being passed to Quiz component
- Test backend endpoint directly with Postman/curl

## 📚 Related Files

- `src/service/quizServices.ts` - API service
- `src/page/Quiz/Quiz.tsx` - Main component
- `src/page/Quiz/types.ts` - TypeScript types
- `src/page/Quiz/mockData.ts` - Fallback data
- `src/page/Tree/TreePage.tsx` - Usage example

