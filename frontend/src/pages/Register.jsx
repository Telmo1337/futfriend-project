import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/register', { email, name, password })
      localStorage.setItem('token', res.data.token)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao registar')
    }
  }

 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Registar</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          autoComplete='email'
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome"
          autoComplete='name'
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete='new-password'
          className="w-full border p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registar
        </button>
        <p className="mt-3 text-sm text-center">
          Já tens conta? <Link to="/login" className="text-blue-600 hover:underline">Entrar</Link>
        </p>
      </form>
    </div>
  )
}
