import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobSearch from "./pages/JobSearch";
import VerifyOtp from "./pages/VerifyOtp";
import ResumeATS from "./pages/ResumeATS";
import ResumeHistory from "./pages/ResumeHistory";  
import InterviewSetup from "./pages/InterviewSetup";
import InterviewTest from "./pages/InterviewTest";
import InterviewResult from "./pages/InterviewResult";
import LearningHub from "./pages/LearningHub";
import Certificates from "./pages/Certificates";
import Notifications from "./pages/Notifications";
import CourseDetails from "./pages/CourseDetails";
import SavedJobs from "./pages/SavedJobs";
import LatestJobs from "./pages/LatestJobs";  
import OAuthRedirect from "./pages/OAuthRedirect";
import Layout from "./layouts/Layout";  

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyOtp />} />
      <Route path="/jobs" element={<JobSearch />} />
      <Route path="/oauth-redirect" element={<OAuthRedirect />} />

            <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/dashboard/ats" element={<ResumeATS />} />
          <Route path="/resume-history" element={<ResumeHistory />} />
          <Route path="/interview/setup" element={<InterviewSetup />} />
          <Route path="/interview/test/:testId" element={<InterviewTest />} />
          <Route path="/interview/result" element={<InterviewResult />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/learning/:courseId" element={<CourseDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/latest-jobs" element={<LatestJobs />} />
        </Route>
      </Route>
    </Routes>
  );
}