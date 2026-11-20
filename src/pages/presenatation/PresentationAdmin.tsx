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
  const { queue, doneTeams, flights, mode, reload } = usePresentation()
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  const inBlocks = flights.reduce((s, f) => s + f.teams.length, 0)
  const remaining = queue.length + inBlocks // équipes pas encore présentées

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

  const toggleDone = (id: number) => run('toggle_done', { p_id: id })
  const moveTeam = (id: number, dir: 'up' | 'down') => run('move_team', { p_id: id, p_dir: dir })
  const moveFlight = (batch: number, dir: 'up' | 'down') =>
    run('move_flight', { p_batch: batch, p_dir: dir })

  async function shuffle() {
    if (remaining === 0) return
    const blocks = Math.ceil(remaining / 6)
    const text = flights.length > 0
      ? `Re-mélanger les ${remaining} équipes restantes en ${blocks} bloc(s) de 6 ?`
      : `Mélanger les ${remaining} équipes non présentées en ${blocks} bloc(s) de 6 ?`
    if (confirm(text)) await run('draw_all_blocks', { p_size: 6 })
  }

  async function returnFlight(batch: number, label: string) {
    if (confirm(`Remettre les équipes de ${label} dans la file d'attente ?`)) {
      await run('return_flight', { p_batch: batch })
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
            <strong>{mode === 'flight' && flights.length > 0 ? 'blocs de 6 équipes' : 'une équipe à la fois'}</strong>
          </p>

          {queue.length === 0 ? (
            <p>Aucune équipe en attente.</p>
          ) : (
            <ol className="pres-qlist">
              {queue.map((t, i) => (
                <li key={t.id} className={`pres-qitem ${i === 0 ? 'first' : ''}`}>
                  <button className="pres-check" title="Marquer comme déjà présentée"
                    onClick={() => toggleDone(t.id)} />
                  <span className="pres-qname">{i === 0 ? '▶ ' : ''}{t.team}</span>
                  <button className="pres-icon" disabled={queue.length < 2}
                    title={i === 0 ? 'Envoyer à la dernière place' : 'Monter'}
                    onClick={() => moveTeam(t.id, 'up')}>↑</button>
                  <button className="pres-icon" disabled={queue.length < 2}
                    title={i === queue.length - 1 ? 'Passer en première place' : 'Descendre'}
                    onClick={() => moveTeam(t.id, 'down')}>↓</button>
                </li>
              ))}
            </ol>
          )}

          <p>
            <button className="pres-btn pres-btn-lg" onClick={shuffle} disabled={remaining === 0}>
              {flights.length > 0 ? 'Re-mélanger les équipes restantes' : 'Mélanger en blocs de 6'}
            </button>
          </p>
          <p className="pres-note">
            Mélange toutes les équipes non cochées (file et blocs actuels) en blocs de 6.
            
          </p>
        </div>

        <h2>presentation</h2>
        {flights.length === 0 && <p>Aucune présentation pour le moment.</p>}
        {flights.map((f, i) => {
          const label = `Flight ${i + 1}`
          return (
            <div key={f.batch} className={`pres-flight ${i === 0 ? 'current' : ''}`}>
              <div className="pres-flight-head">
                <strong>{label}{i === 0 && <span className="pres-note"> (en cours)</span>}</strong>
                <div>
                  <button className="pres-icon" disabled={flights.length < 2}
                    title={i === 0 ? 'Envoyer à la dernière place' : 'Monter'}
                    onClick={() => moveFlight(f.batch, 'up')}>↑</button>
                  <button className="pres-icon" disabled={flights.length < 2}
                    title={i === flights.length - 1 ? 'Passer en première place' : 'Descendre'}
                    onClick={() => moveFlight(f.batch, 'down')}>↓</button>
                  <button className="pres-icon" title="Retourner ce bloc dans la file d'attente"
                    onClick={() => returnFlight(f.batch, label)}>↩</button>
                </div>
              </div>
              <ul className="pres-chips" style={{ marginTop: 10 }}>
                {f.teams.map(t => (
                  <li key={t.id} className="pres-chip">
                    <button className="pres-check" title="Marquer comme déjà présentée"
                      onClick={() => toggleDone(t.id)} />
                    
                    {t.team}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}

        <div className="pres-panel" style={{ marginTop: 24 }}>
          <h2>Équipes déjà présentées ({doneTeams.length})</h2>
          {doneTeams.length === 0 ? (
            <p className="pres-note">Aucune équipe cochée pour le moment.</p>
          ) : (
            <ul className="pres-qlist">
              {doneTeams.map(t => (
                <li key={t.id} className="pres-qitem done">
                  <button className="pres-check on" title="Décocher (remettre dans la file)"
                    onClick={() => toggleDone(t.id)}>✔</button>
                  <span className="pres-qname">{t.team}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}