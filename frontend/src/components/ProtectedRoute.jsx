import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function ProtectedRoute({ children }) {
  const { user } = useAuthStore()
  const token = localStorage.getItem('token')

  if (!user && !token) {
    return <Navigate to="/login" replace />
  }

  return children
}
