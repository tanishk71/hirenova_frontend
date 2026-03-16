import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import "../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="dashboard-inner">{children}</div>
      </div>
    </div>
  );
}
