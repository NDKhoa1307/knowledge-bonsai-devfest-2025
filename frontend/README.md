# 🌳 Knowledge Bonsai - Frontend

A modern React application for visualizing and managing knowledge graphs. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## 🚀 Tech Stack

- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework (latest version)
- **React Router** - Client-side routing
- **ReactFlow** - Interactive node-based graph visualization
- **Axios** - HTTP client for API calls
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable React components
│   ├── layout/          # Layout components (Header, Sidebar, MainLayout)
│   ├── page/            # Page components (Home, Graph, Nodes, Users)
│   ├── routes/          # React Router configuration
│   ├── service/         # API services and HTTP client
│   ├── App.tsx          # Main App component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── public/              # Public static files
├── .env                 # Environment variables
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if not already created)
   - Update the `VITE_API_BASE_URL` to point to your backend API

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_APP_NAME=Knowledge Bonsai
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 🧹 Linting

Run ESLint:

```bash
npm run lint
```

## 📄 Available Pages

- **Home (`/`)** - Dashboard with statistics and quick actions
- **Knowledge Graph (`/graph`)** - Interactive visualization of knowledge nodes
- **Nodes (`/nodes`)** - List and manage knowledge nodes
- **Users (`/users`)** - User management with API integration

## 🎨 Styling

This project uses **Tailwind CSS v4** with the new Vite plugin. No configuration file is needed - just import Tailwind in your CSS:

```css
@import "tailwindcss";
```

The utility classes are available throughout the application.

## 🔌 API Integration

API calls are handled through Axios with:
- Base URL configuration via environment variables
- Request/response interceptors for auth and error handling
- TypeScript interfaces for type safety

Example service usage:

```typescript
import { userService } from './service';

// Get all users
const users = await userService.getAllUsers();

// Create a user
const newUser = await userService.createUser({
  email: 'user@example.com',
  name: 'John Doe'
});
```

## 🗺️ Routing

React Router v6 is configured with nested routes:

```typescript
- / (MainLayout)
  ├── / (HomePage)
  ├── /graph (GraphPage)
  ├── /nodes (NodesPage)
  └── /users (UsersPage)
```

## 🎯 Key Features

- ✅ Modern React 19 with TypeScript
- ✅ Tailwind CSS v4 for styling
- ✅ React Router for navigation
- ✅ ReactFlow for knowledge graph visualization
- ✅ Axios for API communication
- ✅ Responsive design
- ✅ Type-safe development
- ✅ ESLint for code quality

## 🐳 Docker

Build the Docker image:

```bash
docker build -t knowledge-bonsai-frontend .
```

Run the container:

```bash
docker run -p 80:80 knowledge-bonsai-frontend
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [ReactFlow](https://reactflow.dev)
- [TypeScript](https://www.typescriptlang.org)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Test your changes
5. Submit a pull request

## 📝 License

This project is part of DevFest 2025.

---

Built with ❤️ for DevFest 2025
