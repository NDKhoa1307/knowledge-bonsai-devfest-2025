import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout";
import { HomePage, GraphPage, NodesPage, UsersPage, ChatPage } from "../page";
import TreePage from "@/page/Tree/TreePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "graph",
        element: <GraphPage />,
      },
      {
        path: "nodes",
        element: <NodesPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "trees",
        element: <TreePage />,
      },
    ],
  },
]);
