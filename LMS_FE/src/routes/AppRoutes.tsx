import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/forbidden" element={<ErrorPage kind="forbidden" />} />
          <Route path="*" element={<ErrorPage kind="notFound" />} />
        </Route>
      </Route>
    </Routes>
  )
}
