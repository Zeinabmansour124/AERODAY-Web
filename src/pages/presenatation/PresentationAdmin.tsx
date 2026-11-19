import { useEffect, useState } from 'react'
import { supabaseDb as supabase } from '../../utils/client'
import { usePresentation } from '../../hooks/usePresentation'
import './presentation.css'

const KEY = 'pres_admin_code'

async function checkCode(code: string) {
  const { data, error } = await supabase.rpc('check_admin_code', { p_code: code })
  return !error && data === true
}

/* ---------- Étape 1 : saisie du code ---------- */
export default function PresentationAdmin() {
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
  }, [])

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
            <h1>Accès admin</h1>
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

  return <AdminPanel code={code} onLogout={logout} />
}

/* ---------- Étape 2 : contenu réel ---------- */
function AdminPanel({ code, onLogout }: { code: string; onLogout: () => void }) {
  const { queue, flights, mode, reload } = usePresentation()
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  // Quand le tirage de 6 est activé, la présentation une par une est terminée
  const singleDone = mode === 'flight'

  async function run(fn: string, args: Record<string, unknown> = {}) {
    const { error } = await supabase.rpc(fn, { p_code: code, ...args })
    setMsg(error ? error.message : '')
    if (!error) reload()
    return !error
  }

  async function addTeam(e: React.FormEvent) {
    e.preventDefault()
    if (await run('add_team', { p_team: name })) setName('')
  }

  // Tirage de 6 : l'écran bascule sur les 6 équipes et le mode un par un se termine
  async function draw() {
    if (await run('draw_teams', { p_count: 6 })) {
      await run('set_display', { p_mode: 'flight' })
    }
  }

  const showSingle = () => run('set_display', { p_mode: 'single' })

  async function nextTeam() {
    if (!queue[0]) return
    if (await run('delete_team', { p_id: queue[0].id })) {
      await run('set_display', { p_mode: 'single' })
    }
  }

  async function reopenSingle() {
    if (confirm('Réactiver la présentation une par une ?')) {
      await run('reset_display')
    }
  }

  const moveTeam = (id: number, dir: 'up' | 'down') =>
    run('move_team', { p_id: id, p_dir: dir })

  const moveFlight = (batch: number, dir: 'up' | 'down') =>
    run('move_flight', { p_batch: batch, p_dir: dir })

  async function removeFlight(batch: number, label: string) {
    if (confirm(`Supprimer ${label} et ses équipes ?`)) {
      await run('delete_flight', { p_batch: batch })
    }
  }

  return (
    <div className="pres-page">
      <div className="pres-wrap">
        <button className="pres-logout" onClick={onLogout}>Verrouiller</button>
        <h1>Admin présentation</h1>
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
          <h2>File d'attente ({queue.length})</h2>
          <p>
            Affichage actuel sur l'écran :{' '}
            <strong>{singleDone ? 'tirage de 6 équipes' : 'première équipe de la file'}</strong>
          </p>
          {singleDone && (
            <p className="pres-note">
              La présentation une par une est terminée. Tu peux encore ranger la file et tirer
              d'autres équipes.{' '}
              <button className="pres-logout" style={{ float: 'none' }} onClick={reopenSingle}>
                Réactiver le mode un par un
              </button>
            </p>
          )}

          {queue.length === 0 ? (
            <p>Aucune équipe en attente.</p>
          ) : (
            <ol className="pres-qlist">
              {queue.map((t, i) => (
                <li key={t.id} className={`pres-qitem ${i === 0 && !singleDone ? 'first' : ''}`}>
                  <span className="pres-qname">
                    {i === 0 && !singleDone ? '▶ ' : ''}{t.team}
                  </span>
                  <button className="pres-icon" title="Monter" disabled={i === 0}
                    onClick={() => moveTeam(t.id, 'up')}>↑</button>
                  <button className="pres-icon" title="Descendre" disabled={i === queue.length - 1}
                    onClick={() => moveTeam(t.id, 'down')}>↓</button>
                  <button className="pres-icon danger" title="Retirer de la file"
                    onClick={() => run('delete_team', { p_id: t.id })}>✕</button>
                </li>
              ))}
            </ol>
          )}

          <p className="pres-row">
            <button className="pres-btn pres-btn-lg" onClick={draw} disabled={queue.length === 0}>
              Tirer 6 équipes au hasard
            </button>
            <button className="pres-btn pres-btn-lg" onClick={showSingle}
              disabled={queue.length === 0 || singleDone}>
              Afficher la 1re équipe de la file
            </button>
            <button className="pres-btn pres-btn-lg" onClick={nextTeam}
              disabled={queue.length === 0 || singleDone}>
              Équipe suivante
            </button>
          </p>
        </div>

        <h2>Présentations</h2>
        {flights.length === 0 && <p>Aucune présentation pour le moment.</p>}
        {flights.map((f, i) => {
          const label = `presentation ${i + 1}`
          return (
            <div key={f.batch} className="pres-flight">
              <div className="pres-flight-head">
                <strong>{label}</strong>
                <div>
                  <button className="pres-icon" title="Monter" disabled={i === 0}
                    onClick={() => moveFlight(f.batch, 'up')}>↑</button>
                  <button className="pres-icon" title="Descendre" disabled={i === flights.length - 1}
                    onClick={() => moveFlight(f.batch, 'down')}>↓</button>
                  <button className="pres-icon danger" title="Supprimer le flight"
                    onClick={() => removeFlight(f.batch, label)}>🗑</button>
                </div>
              </div>
              <p>{f.teams.length} équipe(s) : {f.teams.map(t => t.team).join(', ')}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}