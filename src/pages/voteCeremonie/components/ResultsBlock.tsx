import { useEffect, useState } from 'react'
import { supabaseDb as supabase } from '../../../utils/client'

type Res = {
  candidat_id: number; author: string; title: string; url: string | null
  thumbnail: string | null; votes_count: number; public_score: number
  jury_score: number; score: number; rank: number
}

export default function ResultsBlock({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState('')
  const [list, setList] = useState<Res[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.rpc('get_vote_results')
      const r = data as { status: string; data: Res[] } | null
      setStatus(r?.status ?? '')
      setList(r?.data ?? [])
    }
    load()
    const i = setInterval(load, 5000)
    return () => clearInterval(i)
  }, [])

  if (status !== 'ready' || list.length === 0) {
    const text =
      status === 'before' ? 'Le vote n’a pas encore commencé.'
      : status === 'during' ? 'Les résultats seront annoncés à la fin du vote.'
      : status === 'pending' ? 'Le vote est terminé. Les résultats seront annoncés dans un instant…'
      : ''
    return text ? <p className={dark ? 'pres-empty' : 'pres-note'}>{text}</p> : null
  }

  const winner = list[0]
  return (
    <div className="pres-single">
      <span className="pres-flight-tag">🏆 Le gagnant</span>
      <div className="pres-single-name">{winner.author}</div>
      <h2 style={{ margin: 0 }}>{winner.title}</h2>
      {winner.url && (
        <video className="win-video" src={winner.url} poster={winner.thumbnail ?? undefined}
          controls playsInline />
      )}
      <p className="win-score">
        Score {winner.score.toFixed(2)} = public {winner.public_score.toFixed(2)} + jury {winner.jury_score}
      </p>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table className={`vote-table ${dark ? 'dark' : ''}`}>
          <thead><tr>
            <th>#</th><th>Candidat</th><th>Votes</th><th>Public</th><th>Jury</th><th>Score</th>
          </tr></thead>
          <tbody>
            {list.map(r => (
              <tr key={r.candidat_id}>
                <td>{r.rank}</td>
                <td>{r.author} <span className="pres-note">· {r.title}</span></td>
                <td>{r.votes_count}</td>
                <td>{r.public_score.toFixed(2)}</td>
                <td>{r.jury_score}</td>
                <td><strong>{r.score.toFixed(2)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}