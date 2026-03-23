import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0B1120] via-[#1A1F36] to-[#111827]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}