import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layout';
import { HomePage, GraphPage, NodesPage, UsersPage, ChatPage } from '../page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'graph',
        element: <GraphPage />,
      },
      {
        path: 'nodes',
        element: <NodesPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]);

