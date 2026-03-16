import "../styles/dashboard.css";
import Sidebar from "../components/dashboard/Sidebar";
import TopHeader from "../components/dashboard/TopHeader";
import Kpis from "../components/dashboard/Kpis";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import BottomSection from "../components/dashboard/BottomSection";


export default function Dashboard() {
  return (
    <div className="min-h-screen gradient-bg text-white overflow-hidden">
      <div className="flex h-screen">
        <Sidebar />

        <main className="flex-1 overflow-auto p-8">
          <TopHeader />
          <Kpis />
          <RecommendedJobs />
          <BottomSection />
          
          <div className="h-6" />
        </main>
      </div>
    </div>
  );
}
