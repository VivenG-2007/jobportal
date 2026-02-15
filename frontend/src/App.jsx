import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import JobDescription from './pages/JobDescription'
import Companies from './pages/admin/Companies'
import CompanyCreate from './pages/admin/CompanyCreate'
import CompanySetup from './pages/admin/CompanySetup'
import AdminJobs from './pages/admin/AdminJobs'
import PostJob from './pages/admin/PostJob'
import Applicants from './pages/admin/Applicants'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },

  // Admin routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )
}

export default App
