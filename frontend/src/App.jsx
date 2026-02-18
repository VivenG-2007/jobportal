import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/shared/ProtectedRoute'
import Loading from './components/shared/Loading'

// Lazy load components
const Login = lazy(() => import('./components/auth/Login'))
const Signup = lazy(() => import('./components/auth/Signup'))
const Home = lazy(() => import('./pages/Home'))
const Jobs = lazy(() => import('./pages/Jobs'))
const Browse = lazy(() => import('./pages/Browse'))
const Profile = lazy(() => import('./pages/Profile'))
const JobDescription = lazy(() => import('./pages/JobDescription'))
const Companies = lazy(() => import('./pages/admin/Companies'))
const CompanyCreate = lazy(() => import('./pages/admin/CompanyCreate'))
const CompanySetup = lazy(() => import('./pages/admin/CompanySetup'))
const AdminJobs = lazy(() => import('./pages/admin/AdminJobs'))
const PostJob = lazy(() => import('./pages/admin/PostJob'))
const Applicants = lazy(() => import('./pages/admin/Applicants'))

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<Loading />}><Home /></Suspense>
  },
  {
    path: '/login',
    element: <Suspense fallback={<Loading />}><Login /></Suspense>
  },
  {
    path: '/signup',
    element: <Suspense fallback={<Loading />}><Signup /></Suspense>
  },
  {
    path: '/jobs',
    element: <Suspense fallback={<Loading />}><Jobs /></Suspense>
  },
  {
    path: '/description/:id',
    element: <Suspense fallback={<Loading />}><JobDescription /></Suspense>
  },
  {
    path: '/browse',
    element: <Suspense fallback={<Loading />}><Browse /></Suspense>
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Suspense fallback={<Loading />}><Profile /></Suspense></ProtectedRoute>
  },

  // Admin routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Suspense fallback={<Loading />}><Companies /></Suspense></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><Suspense fallback={<Loading />}><CompanyCreate /></Suspense></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><Suspense fallback={<Loading />}><CompanySetup /></Suspense></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><Suspense fallback={<Loading />}><AdminJobs /></Suspense></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><Suspense fallback={<Loading />}><PostJob /></Suspense></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Suspense fallback={<Loading />}><Applicants /></Suspense></ProtectedRoute>
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
