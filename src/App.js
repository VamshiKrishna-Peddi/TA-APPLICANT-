import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TAApplicationForm from './components/TAApplicationForm';
import CourseManagement from './components/CourseManagement';
import RecommendationSummaryPage from './components/RecommendationSummaryPage';
import NotificationPage from './components/NotificationPage';
import PerformanceAssessmentPage from './components/PerformanceAssessmentPage';
import FeedbackSummaryPage from './components/FeedbackSummaryPage';
import DashboardOverview from './components/DashboardOverview';
import CommonLayout from './components/CommonLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import LandingPage from './components/LandingPage';
import ApplicantApprovalPage from './components/ApplicantApprovalPage';
import AllMyApplications from './components/AllMyApplications';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/reset-password"
            element={<ForgotPasswordPage></ForgotPasswordPage>}
          />
          <Route path="/signup" element={<SignupPage></SignupPage>} />
          <Route
            path="/profile"
            element={
              <CommonLayout>
                <ProfilePage></ProfilePage>
              </CommonLayout>
            }
          />
          <Route
            path="/"
            element={
              <CommonLayout>
                <LandingPage></LandingPage>
              </CommonLayout>
            }
          />
          <Route
            path="/applications"
            element={
              <CommonLayout>
                <TAApplicationForm></TAApplicationForm>
              </CommonLayout>
            }
          />
          <Route
            path="/courses-management"
            element={
              <CommonLayout>
                <CourseManagement></CourseManagement>
              </CommonLayout>
            }
          />
          <Route
            path="/recommendation"
            element={
              <CommonLayout>
                <RecommendationSummaryPage></RecommendationSummaryPage>
              </CommonLayout>
            }
          />
          <Route
            path="/performance-assessment"
            element={
              <CommonLayout>
                <PerformanceAssessmentPage></PerformanceAssessmentPage>
              </CommonLayout>
            }
          />
          <Route
            path="/view-performance-assessments"
            element={
              <CommonLayout>
                <FeedbackSummaryPage></FeedbackSummaryPage>
              </CommonLayout>
            }
          />
          <Route
            path="/approve"
            element={
              <CommonLayout>
                <ApplicantApprovalPage></ApplicantApprovalPage>
              </CommonLayout>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <CommonLayout>
                <DashboardOverview></DashboardOverview>
              </CommonLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <CommonLayout>
                <AllMyApplications></AllMyApplications>
              </CommonLayout>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
