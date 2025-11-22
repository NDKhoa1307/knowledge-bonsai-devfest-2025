import { createBrowserRouter, useParams } from "react-router-dom";
import { MainLayout } from "../layout";
import { HomePage, NodesPage, UsersPage, ChatPage, WelcomePage } from "../page";
import TreePage from "@/page/Tree/TreePage";

// Wrapper component to pass treeId from route params to TreePage
const TreePageWrapper = () => {
  const { treeId } = useParams<{ treeId: string }>();
  return <TreePage treeId={treeId} />;
};

export const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
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
        element: <TreePage />,
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
        path: "trees/:treeId",
        element: <TreePageWrapper />,
      },
      {
        path: "trees",
        element: <TreePage />,
      },
    ],
  },
]);
