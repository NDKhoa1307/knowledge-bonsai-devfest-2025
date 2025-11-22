import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import SVGProvider from "@/components/Trees/SVGProvider";

export const MainLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content - No padding, no overflow for full-height pages */}
        <main className="flex-1 overflow-hidden">
          <SVGProvider />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
