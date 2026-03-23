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

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyOtp />} />
      <Route path="/oauth-redirect" element={<OAuthRedirect />} />

      {/* Protected routes (each with its own back button) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><JobSearch /></ProtectedRoute>} />
      <Route path="/dashboard/ats" element={<ProtectedRoute><ResumeATS /></ProtectedRoute>} />
      <Route path="/resume-history" element={<ProtectedRoute><ResumeHistory /></ProtectedRoute>} />
      <Route path="/interview/setup" element={<ProtectedRoute><InterviewSetup /></ProtectedRoute>} />
      <Route path="/interview/test/:testId" element={<ProtectedRoute><InterviewTest /></ProtectedRoute>} />
      <Route path="/interview/result" element={<ProtectedRoute><InterviewResult /></ProtectedRoute>} />
      <Route path="/learning" element={<ProtectedRoute><LearningHub /></ProtectedRoute>} />
      <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/learning/:courseId" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
      <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
      <Route path="/latest-jobs" element={<ProtectedRoute><LatestJobs /></ProtectedRoute>} />
    </Routes>
  );
}