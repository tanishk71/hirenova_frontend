import "../styles/dashboard.css";
import TopHeader from "../components/dashboard/TopHeader";
import Kpis from "../components/dashboard/Kpis";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import BottomSection from "../components/dashboard/BottomSection";

export default function Dashboard() {
  return (
    <div className="text-white">
      <TopHeader />
      <Kpis />
      <RecommendedJobs />
      <BottomSection />
    <div className="h-6" />
    </div>
  );
}