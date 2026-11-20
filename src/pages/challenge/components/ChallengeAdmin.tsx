import { useEffect, useState } from 'react'
import { supabaseDb as supabase } from '../../../utils/client'
import { useChallenge, useCountdown, fmt, type Challenge } from '../../../hooks/useChallenge'
import '../../presenatation/presentation.css'

async function checkCode(code: string) {
  const { data, error } = await supabase.rpc('check_admin_code', { p_code: code })
  return !error && data === true
}

/* ---------- Étape 1 : saisie du code ---------- */
export default function ChallengeAdmin({ challenge, title }: { challenge: Challenge; title: string }) {
  const KEY = `admin_code_${challenge}` // une clé par challenge
  const [code, setCode] = useState<string | null>(null) // null = verrouillé
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let saved: string | null = null
    try { saved = sessionStorage.getItem(KEY) } catch { /* ignore */ }
    if (!saved) { setLoading(false); return }
    checkCode(saved).then(ok => {
      if (ok) setCode(saved)
      else { try { sessionStorage.removeItem(KEY) } catch { /* ignore */ } }
      setLoading(false)
    })
  }, [KEY])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const c = input.trim()
    if (await checkCode(c)) {
      try { sessionStorage.setItem(KEY, c) } catch { /* ignore */ }
      setCode(c)
    } else {
      setError('Code invalide.')
    }
  }

  function logout() {
    try { sessionStorage.removeItem(KEY) } catch { /* ignore */ }
    setCode(null)
    setInput('')
  }

  if (loading) return <div className="pres-page"><p>Chargement…</p></div>

  if (!code) {
    return (
      <div className="pres-page">
        <div className="pres-wrap">
          <form className="pres-panel pres-gate" onSubmit={submit}>
            <h1>Accès admin : {title}</h1>
            <p>Entre le code pour continuer.</p>
            <input
              className="pres-input"
              placeholder="Code admin"
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              required
            />
            {error && <p className="pres-error">{error}</p>}
            <button className="pres-btn" type="submit">Entrer</button>
          </form>
        </div>
      </div>
    )
  }

  return <Panel code={code} onLogout={logout} challenge={challenge} title={title} />
}

/* ---------- Étape 2 : contenu réel ---------- */
function Panel({
  code, onLogout, challenge, title,
}: { code: string; onLogout: () => void; challenge: Challenge; title: string }) {
  const { queue, timer, offset, reload } = useChallenge(challenge)
  const { remaining, state } = useCountdown(timer, offset)
  const [name, setName] = useState('')
  const [minutes, setMinutes] = useState(5)
  const [msg, setMsg] = useState('')

  async function run(fn: string, args: Record<string, unknown> = {}) {
    const { error } = await supabase.rpc(fn, { p_code: code, p_challenge: challenge, ...args })
    setMsg(error ? error.message : '')
    if (!error) reload()
    return !error
  }

  async function addTeam(e: React.FormEvent) {
    e.preventDefault()
    if (await run('challenge_add', { p_team: name })) setName('')
  }

  async function removeTeam(id: number, teamName: string, isCurrent: boolean) {
    const extra = isCurrent ? ' Elle est en cours : le timer sera remis à zéro.' : ''
    if (confirm(`Retirer « ${teamName} » ?${extra}`)) {
      await run('challenge_delete', { p_id: id })
    }
  }

  const startTimer = () => run('timer_start', { p_duration: Math.round(minutes * 60) })
  const resetTimer = () => run('timer_reset')
  const nextTeam = () => run('challenge_next')
  const move = (id: number, dir: 'up' | 'down') => run('challenge_move', { p_id: id, p_dir: dir })

  return (
    <div className="pres-page">
      <div className="pres-wrap">
        <button className="pres-logout" onClick={onLogout}>Verrouiller</button>
        <h1>Admin : {title}</h1>
        {msg && <p className="pres-error">{msg}</p>}

        <div className="pres-panel">
          <h2>Ajouter une équipe</h2>
          <form className="pres-row" onSubmit={addTeam}>
            <input
              className="pres-input"
              placeholder="Nom de l'équipe"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <button className="pres-btn" type="submit">Ajouter</button>
          </form>
        </div>

        <div className="pres-panel">
          <h2>Timer</h2>
          <div className="ch-admin-timer">
            <span className={`ch-timer-sm ${state}`}>
              {state === 'done' ? '00:00' : fmt(remaining)}
            </span>
            <label>
              Durée (minutes){' '}
              <input
                className="pres-input"
                type="number" min={0.5} step={0.5}
                value={minutes}
                onChange={e => setMinutes(Number(e.target.value))}
                style={{ width: 90, flex: 'none' }}
              />
            </label>
          </div>
          <p className="pres-row">
            <button className="pres-btn pres-btn-lg" onClick={startTimer}
              disabled={queue.length === 0 || state === 'running'}>
              ▶ Démarrer le challenge
            </button>
            <button className="pres-btn pres-btn-lg" onClick={resetTimer}>
              ↺ Réinitialiser
            </button>
          </p>
        </div>

        <div className="pres-panel">
          <h2>File d'attente ({queue.length})</h2>
          {queue.length === 0 ? (
            <p>Aucune équipe en attente.</p>
          ) : (
            <ol className="pres-qlist">
              {queue.map((t, i) => (
                <li key={t.id} className={`pres-qitem ${i === 0 ? 'first' : ''}`}>
                  <span className="pres-qname">
                    {i === 0 ? '▶ ' : ''}{t.team}
                    {i === 0 && <span className="pres-note"> (en cours)</span>}
                  </span>
                  <button className="pres-icon" title="Monter" disabled={i === 0}
                    onClick={() => move(t.id, 'up')}>↑</button>
                  <button className="pres-icon" title="Descendre" disabled={i === queue.length - 1}
                    onClick={() => move(t.id, 'down')}>↓</button>
                  <button className="pres-icon danger" title="Retirer"
                    onClick={() => removeTeam(t.id, t.team, i === 0)}>✕</button>
                </li>
              ))}
            </ol>
          )}
          <p>
            <button className="pres-btn pres-btn-lg" onClick={nextTeam} disabled={queue.length === 0}>
              Équipe suivante
            </button>
          </p>
          <p className="pres-note">
            « Équipe suivante » retire l'équipe en cours et remet le timer à zéro pour la suivante.
          </p>
        </div>
      </div>
    </div>
  )
}