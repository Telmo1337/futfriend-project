import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, clearUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    clearUser()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user?.name} 👋</h1>
      <p className="text-gray-700 mb-4">Email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Terminar Sessão
      </button>
    </div>
  )
}
