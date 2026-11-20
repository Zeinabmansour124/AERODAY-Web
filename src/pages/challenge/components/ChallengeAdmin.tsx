import { useEffect, useState } from 'react'
import { supabaseDb as supabase } from '../../../utils/client'
import { useChallenge, useCountdown, fmt, type Challenge, type CTeam } from '../../../hooks/useChallenge'
import '../../presenatation/presentation.css'

async function checkCode(code: string) {
  const { data, error } = await supabase.rpc('check_admin_code', { p_code: code })
  return !error && data === true
}

/* ---------- Étape 1 : saisie du code ---------- */
export default function ChallengeAdmin({ challenge, title }: { challenge: Challenge; title: string }) {
  const KEY = `admin_code_${challenge}`
  const [code, setCode] = useState<string | null>(null)
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

/* ---------- Une liste d'équipes ---------- */
function TeamList({
  teams, current, advanceLabel, onAdvance, onMove, onRemove,
}: {
  teams: CTeam[]
  current?: boolean // la 1re équipe de la liste est l'équipe en cours
  advanceLabel?: string
  onAdvance?: (id: number) => void
  onMove: (id: number, dir: 'up' | 'down') => void
  onRemove: (t: CTeam, isCurrent: boolean) => void
}) {
  if (teams.length === 0) return <p className="pres-note">Aucune équipe dans cette liste.</p>
  return (
    <ol className="pres-qlist">
      {teams.map((t, i) => {
        const isCurrent = !!current && i === 0
        return (
          <li key={t.id} className={`pres-qitem ${isCurrent ? 'first' : ''}`}>
            <span className="pres-qname">
              {isCurrent ? '▶ ' : ''}{t.team}
              {isCurrent && <span className="pres-note"> (en cours)</span>}
            </span>
            {onAdvance && (
              <button className="pres-btn" onClick={() => onAdvance(t.id)}>{advanceLabel}</button>
            )}
            <button className="pres-icon" disabled={teams.length < 2}
              title={i === 0 ? 'Envoyer à la dernière place' : 'Monter'}
              onClick={() => onMove(t.id, 'up')}>↑</button>
            <button className="pres-icon" disabled={teams.length < 2}
              title={i === teams.length - 1 ? 'Passer en première place' : 'Descendre'}
              onClick={() => onMove(t.id, 'down')}>↓</button>
            <button className="pres-icon danger" title="Retirer"
              onClick={() => onRemove(t, isCurrent)}>✕</button>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Étape 2 : contenu réel ---------- */
function Panel({
  code, onLogout, challenge, title,
}: { code: string; onLogout: () => void; challenge: Challenge; title: string }) {
  const { lists, queue, timer, offset, reload } = useChallenge(challenge)
  const { remaining, state } = useCountdown(timer, offset)
  const [name, setName] = useState('')
  const [minutes, setMinutes] = useState(5)
  const [msg, setMsg] = useState('')

  const multi = lists.length === 3

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

  async function removeTeam(t: CTeam, isCurrent: boolean) {
    const extra = isCurrent ? ' Elle est en cours : le minuteur sera remis à zéro.' : ''
    if (confirm(`Retirer « ${t.team} » ?${extra}`)) {
      await run('challenge_delete', { p_id: t.id })
    }
  }

  const startTimer = () => run('timer_start', { p_duration: Math.round(minutes * 60) })
  const pauseTimer = () => run('timer_pause')
  const resumeTimer = () => run('timer_resume')
  const stopTimer = () => run('timer_reset')
  const nextTeam = () => run('challenge_next')
  const move = (id: number, dir: 'up' | 'down') => run('challenge_move', { p_id: id, p_dir: dir })
  const advance = (id: number) => run('challenge_advance', { p_id: id })

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
          {multi && <p className="pres-note">Les nouvelles équipes arrivent dans la liste 1.</p>}
        </div>

        <div className="pres-panel">
          <h2>Minuteur</h2>
          <div className="ch-admin-timer">
            <span className={`ch-timer-sm ${state}`}>{fmt(remaining)}</span>
            <span className="pres-note">
              {state === 'idle' && 'Prêt'}
              {state === 'running' && 'En cours'}
              {state === 'paused' && 'En pause'}
              {state === 'done' && 'Temps écoulé'}
            </span>
            <label>
              Durée (minutes){' '}
              <input
                className="pres-input"
                type="number" min={0.5} step={0.5}
                value={minutes}
                onChange={e => setMinutes(Number(e.target.value))}
                disabled={state === 'running' || state === 'paused'}
                style={{ width: 90, flex: 'none' }}
              />
            </label>
          </div>
          <p className="pres-row">
            <button className="pres-btn pres-btn-lg" onClick={startTimer}
              disabled={queue.length === 0 || state === 'running' || state === 'paused'}>
              ▶ Démarrer
            </button>
            {state === 'paused' ? (
              <button className="pres-btn pres-btn-lg" onClick={resumeTimer}>⏯ Reprendre</button>
            ) : (
              <button className="pres-btn pres-btn-lg" onClick={pauseTimer} disabled={state !== 'running'}>
                ⏸ Suspendre
              </button>
            )}
            <button className="pres-btn pres-btn-lg pres-btn-off" onClick={stopTimer}
              disabled={state === 'idle'}>
              ⏹ Arrêter
            </button>
          </p>
          <p className="pres-note">
            Suspendre garde le temps restant, Reprendre continue. Arrêter remet le minuteur à zéro.
          </p>
        </div>

        {multi ? (
          <>
            <div className="pres-panel">
              <h2>Liste 1 : équipes inscrites ({lists[0].length})</h2>
              <TeamList teams={lists[0]} advanceLabel="Passer en liste 2 →"
                onAdvance={advance} onMove={move} onRemove={removeTeam} />
            </div>

            <div className="pres-panel">
              <h2>Liste 2 : en préparation ({lists[1].length})</h2>
              <TeamList teams={lists[1]} advanceLabel="Passer en liste 3 →"
                onAdvance={advance} onMove={move} onRemove={removeTeam} />
              <p className="pres-note">La première équipe envoyée est en première place.</p>
            </div>

            <div className="pres-panel">
              <h2>Liste 3 : en piste ({lists[2].length})</h2>
              <TeamList teams={lists[2]} current onMove={move} onRemove={removeTeam} />
              
            </div>
          </>
        ) : (
          <div className="pres-panel">
            <h2>File d'attente ({queue.length})</h2>
            <TeamList teams={queue} current onMove={move} onRemove={removeTeam} />
            
            
          </div>
        )}
      </div>
    </div>
  )
}