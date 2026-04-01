// src/components/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar"; // adjust the path if needed

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}