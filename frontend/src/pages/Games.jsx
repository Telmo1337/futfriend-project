import { useNavigate } from 'react-router-dom'



import { useEffect, useState } from 'react'
import API from '../api/axios'
import useAuthStore from '../store/authStore'


export default function Games() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ teamA: '', teamB: '', date: '', location: '' })
  const { user } = useAuthStore()
  const navigate = useNavigate()
  // 🔹 Buscar todos os jogos
  const fetchGames = async () => {
    try {
      setLoading(true)
      const res = await API.get('/games')
      setGames(res.data)
    } catch (err) {
      setError(`Erro ao carregar jogos: ${err.response?.data?.error || 'Erro desconhecido'}`)
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Criar novo jogo
  const handleCreateGame = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/games', form)
      setGames([...games, res.data])
      setForm({ teamA: '', teamB: '', date: '', location: '' })
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar jogo')
    }
  }

  // 🔹 Apagar jogo
  const handleDelete = async (id) => {
    if (!confirm('Tens a certeza que queres apagar este jogo?')) return
    try {
      await API.delete(`/games/${id}`)
      setGames(games.filter((g) => g.id !== id))
    } catch (err) {
      setError(`Erro ao apagar jogo: ${err.response?.data?.error || 'Erro desconhecido'}`)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">⚽ Jogos</h1>

      {/* 🔹 Formulário para criar jogo */}
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Criar Novo Jogo</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleCreateGame} className="grid grid-cols-1 gap-3">
          <input
            type="text"
            placeholder="Equipa A"
            value={form.teamA}
            onChange={(e) => setForm({ ...form, teamA: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Equipa B"
            value={form.teamB}
            onChange={(e) => setForm({ ...form, teamB: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Localização"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Criar
          </button>
        </form>
      </div>

      {/* 🔹 Lista de jogos */}
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <p className="text-center">A carregar jogos...</p>
        ) : games.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum jogo encontrado</p>
        ) : (
          <ul className="space-y-4">
            {games.map((game) => (
              <li
                key={game.id}
                onClick={() => navigate(`/games/${game.id}`)}
                className="bg-white shadow p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {game.teamA} 🆚 {game.teamB}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(game.date).toLocaleString()} — {game.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Criado por: {game.createdBy?.name || 'Desconhecido'}
                  </p>
                </div>
                {game.createdById === user?.id && (
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Apagar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
