# 🔧 Knowledge Bonsai Frontend - Setup Guide

This guide will help you set up and configure the Knowledge Bonsai frontend application.

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher (comes with Node.js)
- **Backend API**: Running on `http://localhost:3000` (or configured URL)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Knowledge Bonsai
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration Details

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the application:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |
| `VITE_APP_NAME` | Application name | `Knowledge Bonsai` |

### TypeScript Configuration

Three TypeScript config files:

1. **`tsconfig.json`** - Base configuration (references other configs)
2. **`tsconfig.app.json`** - Application-specific settings
3. **`tsconfig.node.json`** - Node/Vite configuration

### Vite Configuration

The `vite.config.ts` includes:
- React plugin for Fast Refresh
- Tailwind CSS v4 plugin

### ESLint Configuration

Configured in `eslint.config.js` with:
- TypeScript ESLint
- React Hooks rules
- React Refresh rules

## Project Architecture

### Folder Structure Explained

```
src/
├── assets/          # Images, icons, static files
├── components/      # Reusable UI components
│   └── (empty - add your components here)
├── layout/          # Layout wrappers
│   ├── MainLayout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── index.ts
├── page/            # Route pages
│   ├── HomePage.tsx
│   ├── GraphPage.tsx
│   ├── NodesPage.tsx
│   ├── UsersPage.tsx
│   └── index.ts
├── routes/          # React Router configuration
│   └── index.tsx
├── service/         # API layer
│   ├── api.ts              # Axios instance
│   ├── userService.ts      # User API calls
│   └── index.ts
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Adding New Features

### 1. Add a New Page

Create a new page component in `src/page/`:

```typescript
// src/page/MyNewPage.tsx
export const MyNewPage = () => {
  return (
    <div>
      <h1>My New Page</h1>
    </div>
  );
};
```

Export it from `src/page/index.ts`:

```typescript
export * from './MyNewPage';
```

Add the route in `src/routes/index.tsx`:

```typescript
{
  path: 'my-new-page',
  element: <MyNewPage />,
}
```

### 2. Add a New Service

Create a new service in `src/service/`:

```typescript
// src/service/myService.ts
import api from './api';

export interface MyData {
  id: string;
  name: string;
}

export const myService = {
  getData: async (): Promise<MyData[]> => {
    const response = await api.get<MyData[]>('/my-endpoint');
    return response.data;
  },
};
```

Export it from `src/service/index.ts`:

```typescript
export * from './myService';
```

### 3. Add a New Component

Create a component in `src/components/`:

```typescript
// src/components/MyButton.tsx
interface MyButtonProps {
  label: string;
  onClick: () => void;
}

export const MyButton = ({ label, onClick }: MyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      {label}
    </button>
  );
};
```

## Tailwind CSS v4 Usage

Import Tailwind in your CSS files:

```css
@import "tailwindcss";
```

Use utility classes in your components:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
    Action
  </button>
</div>
```

## ReactFlow Integration

The Knowledge Graph page uses ReactFlow. Example usage:

```typescript
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
];

<ReactFlow nodes={nodes} edges={edges}>
  <Controls />
  <MiniMap />
  <Background />
</ReactFlow>
```

## API Integration

### Making API Calls

Use the service layer:

```typescript
import { userService } from '../service';

const MyComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // ...
};
```

### Adding Authentication

Modify `src/service/api.ts`:

```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Common Issues & Solutions

### Issue: Port Already in Use

**Solution**: Change the port in `package.json`:

```json
"dev": "vite --port 3001"
```

### Issue: API Connection Refused

**Solution**: 
1. Ensure backend is running on the correct port
2. Check `VITE_API_BASE_URL` in `.env`
3. Verify CORS is enabled on the backend

### Issue: Tailwind Classes Not Working

**Solution**: 
1. Verify `@import "tailwindcss";` is in `src/index.css`
2. Restart the dev server
3. Check that `@tailwindcss/vite` is in `vite.config.ts`

## Building for Production

### Development Build

```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Docker Build

```bash
docker build -t knowledge-bonsai-frontend .
docker run -p 80:80 knowledge-bonsai-frontend
```

## Performance Tips

1. **Code Splitting**: React Router automatically code-splits by route
2. **Lazy Loading**: Use `React.lazy()` for heavy components
3. **Memoization**: Use `useMemo` and `useCallback` for expensive operations
4. **ReactFlow**: Use `fitView` and node virtualization for large graphs

## Development Workflow

1. **Start backend**: Ensure API is running
2. **Start frontend**: `npm run dev`
3. **Make changes**: Edit files and see hot reload
4. **Check types**: TypeScript will show errors in IDE
5. **Run linter**: `npm run lint`
6. **Build**: `npm run build` before committing
7. **Test**: Manual testing in browser

## Next Steps

- Add authentication
- Create more reusable components
- Add form validation
- Implement real-time updates
- Add unit tests
- Set up CI/CD

## Support

For issues or questions:
- Check the main README.md
- Review React/Vite documentation
- Check backend API documentation

---

Happy coding! 🚀

