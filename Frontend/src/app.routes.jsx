import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeBuilder from "./ResumeBuilder";
import ResumePreviewPage from "./preview/ResumePreviewPage";
import ATSAnalysisPage from "./atsOptimization/ATSAnalysisPage";
import CoverLetterGenerator from "./CoverLetterGenerator";
import CareerAgentPage from "./CareerAgentPage";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <Home />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/register",
    element: <Register />
  },
  {
    path:"/dashboard",
    element:(
      <ProtectedRoute>
        <Dashboard />
       </ProtectedRoute> 
    )
  },
  // {
  //   path:"/otp-verification",
  //   element: <OtpVerification />
  // },
  {
    path:"/resume-builder",
    element: <ResumeBuilder />
  },
  {
    path: "/resume/preview/:id",
    element: <ResumePreviewPage />
  },
  {
    path: "/ats-analysis/:id",
    element: <ATSAnalysisPage />
  },
  {
    path: "/cover-letter",
    element: (
      <ProtectedRoute>
        <CoverLetterGenerator />
      </ProtectedRoute>
    )
  },
  {
    path: "/career-agent",
    element: (
      <ProtectedRoute>
        <CareerAgentPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/resume/edit/:id",
    element: <ResumeBuilder />
  },

  {
    path: "/cover-letter/preview/:id",
    element:(
      <ProtectedRoute>
      <CoverLetterGenerator />
    </ProtectedRoute>
    )
  }
])