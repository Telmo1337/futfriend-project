/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import useAuthStore from '../store/authStore'

export default function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [game, setGame] = useState(null)
  const [players, setPlayers] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchGame = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/games/${id}`)
      setGame(res.data)
    } catch {
      setError('Erro ao carregar detalhes do jogo.')
    } finally {
      setLoading(false)
    }
  }

  const fetchPlayers = async () => {
    try {
      const res = await API.get(`/players/game/${id}/players`)
      setPlayers(res.data)
    } catch {
      setError('Erro ao carregar jogadores.')
    }
  }

  
const handleJoin = async () => {
  if (!user?.id) {
    setError('⚠️ É necessário iniciar sessão para entrar no jogo.')
    return
  }

  try {
    await API.post('/players', {
      userId: user.id,
      gameId: id,
      team: 'A',
    })
    await fetchPlayers()
    setMessage('Entraste no jogo com sucesso! ⚽')
  } catch (err) {
    setError(err.response?.data?.error || 'Erro ao entrar no jogo.')
  }
}


  const handleLeave = async () => {
    try {
      const player = players.find((p) => p.userId === user.id)
      if (!player) return setError('Não estás neste jogo.')
      await API.delete(`/players/${player.id}`)
      await fetchPlayers()
      setMessage('Saíste do jogo. 👋')
    } catch {
      setError('Erro ao sair do jogo.')
    }
  }

  

  useEffect(() => {
    fetchGame()
    fetchPlayers()
  }, [id])

  if (loading) return <p className="text-center mt-10">A carregar...</p>
  if (!game) return <p className="text-center mt-10">Jogo não encontrado.</p>

  const isInGame = players.some((p) => p.userId === user?.id)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* 🔙 Botão voltar */}
      <div className="max-w-2xl mx-auto mb-4">
        <button
          onClick={() => navigate('/games')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          ← Voltar aos Jogos
        </button>
      </div>

      {/* 🔹 Card principal */}
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          {game.teamA} 🆚 {game.teamB}
        </h1>
        <p className="text-gray-600 mb-2">{new Date(game.date).toLocaleString()}</p>
        <p className="text-gray-600 mb-2">📍 {game.location}</p>
        <p className="text-gray-600 mb-4">
          Criado por: <strong>{game.createdBy?.name || 'Desconhecido'}</strong>
        </p>

        {/* 🔸 Mensagens */}
        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        {/* 🔸 Botões */}
        {isInGame ? (
          <button
            onClick={handleLeave}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair do Jogo
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Entrar no Jogo
          </button>
        )}

        {/* 🔹 Lista de jogadores */}
        <h2 className="text-xl font-semibold mt-6 mb-3">Jogadores na Partida:</h2>
        {players.length === 0 ? (
          <p className="text-gray-500">Ainda não há jogadores neste jogo.</p>
        ) : (
          <ul className="space-y-2">
            {players.map((p) => (
              <li
                key={p.id}
                className="border rounded p-2 bg-gray-50 flex justify-between items-center"
              >
                <span>{p.user?.name || 'Jogador'}</span>
                <span className="text-sm text-gray-400">
                  Gols: {p.goals} | Resultado: {p.score || '-'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
