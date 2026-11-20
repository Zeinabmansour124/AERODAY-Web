import { useCallback, useEffect, useState } from 'react'
import { supabaseDb as supabase } from '../../utils/client'
import CodeGate from './components/CodeGate'
import { makeSheet, downloadBlob, PER_SHEET } from '../../utils/qrSheets'
import '../presenatation/presentation.css'

type Cand = { id: number; author: string; title: string; votes_count: number; jury_score: number; scored: boolean }
type Overview = {
  phase: string; published: boolean; jury_code: string
  tokens_total: number; tokens_used: number; candidates: Cand[]
}
type Tok = { token: string; used: boolean }

export default function VoteAdmin() {
  return (
    <CodeGate title="Accès admin : Vote" storageKey="admin_code_vote" checkFn="check_admin_code">
      {(code, logout) => <Panel code={code} onLogout={logout} />}
    </CodeGate>
  )
}

function Panel({ code, onLogout }: { code: string; onLogout: () => void }) {
  const [o, setO] = useState<Overview | null>(null)
  const [tokens, setTokens] = useState<Tok[]>([])
  const [msg, setMsg] = useState('')
  const [newJury, setNewJury] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const load = useCallback(async () => {
    const a = await supabase.rpc('admin_overview', { p_code: code })
    if (a.error) setMsg(a.error.message); else setO(a.data as Overview)
    const t = await supabase.rpc('admin_list_tokens', { p_code: code })
    if (t.error) setMsg(t.error.message); else setTokens((t.data ?? []) as Tok[])
  }, [code])

  useEffect(() => {
    load()
    const i = setInterval(load, 5000)
    return () => clearInterval(i)
  }, [load])

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview) }
  }, [preview])

  async function run(fn: string, args: Record<string, unknown> = {}) {
    const { error } = await supabase.rpc(fn, { p_code: code, ...args })
    setMsg(error ? error.message : '')
    if (!error) load()
    return !error
  }

  const base = `${window.location.origin}/vote?token=`

  async function exportSheet(list: string[], filename: string) {
    const blob = await makeSheet(list.map(t => ({ url: base + t, label: t.slice(0, 8) })))
    downloadBlob(blob, filename)
    setPreview(URL.createObjectURL(blob))
  }

  // Génère 24 nouveaux QR codes et télécharge l'image
  async function generateSheet() {
    setBusy(true)
    setMsg('')
    const { data, error } = await supabase.rpc('admin_generate_tokens', {
      p_code: code, p_count: PER_SHEET,
    })
    if (error || !Array.isArray(data)) {
      setBusy(false)
      return setMsg(error?.message ?? 'Erreur de génération')
    }
    try {
      await exportSheet(data as string[], `qr-codes-${Date.now()}.png`)
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Erreur image')
    }
    setBusy(false)
    load()
  }

  // Réexporte une feuille avec 24 QR codes encore non utilisés
  async function reexportSheet() {
    const unused = tokens.filter(t => !t.used).slice(0, PER_SHEET).map(t => t.token)
    if (unused.length === 0) return setMsg('Aucun QR code non utilisé.')
    setBusy(true)
    try {
      await exportSheet(unused, `qr-codes-reexport-${Date.now()}.png`)
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Erreur image')
    }
    setBusy(false)
  }

  if (!o) return <div className="pres-page"><p>{msg || 'Chargement…'}</p></div>

  const labels: Record<string, string> = {
    before: 'Avant le vote', during: 'Vote ouvert', after: 'Vote terminé',
  }
  const unscored = o.candidates.filter(c => !c.scored).length
  const totalVotes = o.candidates.reduce((s, c) => s + c.votes_count, 0)
  const unusedCount = tokens.filter(t => !t.used).length

  async function changePhase(p: string) {
    if (confirm(`Passer en phase « ${labels[p]} » ?` +
      (p !== 'after' && o!.published ? '\nLes résultats publiés seront masqués.' : ''))) {
      await run('set_phase', { p_phase: p })
    }
  }

  async function publish() {
    let force = false
    if (unscored > 0) {
      if (!confirm(`${unscored} candidat(s) pas encore noté(s) par le jury. Publier quand même ?`)) return
      force = true
    }
    await run('set_results_published', { p_publish: true, p_force: force })
  }

  async function changeJuryCode() {
    if (await run('set_jury_code', { p_new: newJury })) setNewJury('')
  }

  return (
    <div className="pres-page">
      <div className="pres-wrap">
        <button className="pres-logout" onClick={onLogout}>Verrouiller</button>
        <h1>Admin : Vote</h1>
        {msg && <p className="pres-error">{msg}</p>}

        <div className="pres-panel">
          <h2>1. Phase du vote</h2>
          <div className="pres-row">
            {(['before', 'during', 'after'] as const).map(p => (
              <button key={p} className={`pres-btn ${o.phase === p ? '' : 'pres-btn-off'}`}
                disabled={o.phase === p} onClick={() => changePhase(p)}>
                {labels[p]}
              </button>
            ))}
          </div>
          <p className="pres-note">
            Avant : le public voit « vote pas ouvert ». Vote ouvert : QR codes actifs. Terminé : les votes sont fermés.
          </p>
        </div>

        <div className="pres-panel">
          <h2>2. Résultats</h2>
          <p>
            État : <strong>{o.published ? 'publiés (visibles au public)' : 'non publiés'}</strong>
            {' · '}Notes du jury : {o.candidates.length - unscored}/{o.candidates.length}
          </p>
          <div className="pres-row">
            <button className="pres-btn" onClick={publish} disabled={o.phase !== 'after' || o.published}>
              Publier les résultats
            </button>
            <button className="pres-btn pres-btn-off" onClick={() => run('set_results_published', { p_publish: false })}
              disabled={!o.published}>
              Masquer les résultats
            </button>
          </div>
          {o.phase !== 'after' && <p className="pres-note">Disponible une fois le vote marqué terminé.</p>}
        </div>

        <div className="pres-panel">
          <h2>3. Accès jury</h2>
          <p>Page : <code>{window.location.origin}/jury</code></p>
          <p>Code jury : <code className="mono">{o.jury_code}</code></p>
          <div className="pres-row">
            <input className="pres-input" placeholder="Nouveau code jury (8 caractères min.)"
              value={newJury} onChange={e => setNewJury(e.target.value)} />
            <button className="pres-btn" onClick={changeJuryCode} disabled={newJury.trim().length < 8}>
              Changer
            </button>
            <button className="pres-btn pres-btn-off"
              onClick={() => confirm('Générer un nouveau code aléatoire ?') && run('set_jury_code', { p_new: crypto.randomUUID() })}>
              Générer un code aléatoire
            </button>
          </div>
          <p className="pres-note">Ce code est différent du code admin et ne donne accès qu'à la notation.</p>
        </div>

        <div className="pres-panel">
          <h2>Suivi en direct · {totalVotes} vote(s)</h2>
          <div style={{ overflowX: 'auto' }}>
           <div className="table-responsive">
  <table className="table table-hover table-striped align-middle mb-0">
    <thead className="table-dark">
      <tr>
        <th scope="col">Candidat</th>
        <th scope="col" className="text-center">Votes</th>
        <th scope="col" className="text-center">Note jury</th>
      </tr>
    </thead>
    <tbody>
      {o.candidates.map(c => (
        <tr key={c.id}>
          <td>
            <strong className="d-block">{c.author}</strong>
            <small className="text-muted">{c.title}</small>
          </td>
          <td className="text-center">
            <span className="badge bg-primary rounded-pill">{c.votes_count}</span>
          </td>
          <td className="text-center">
            {c.scored ? (
              <span className="badge bg-success">{c.jury_score}</span>
            ) : (
              <span className="badge bg-secondary fst-italic">pas encore noté</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>
        </div>

        <div className="pres-panel">
          <h2>4. QR codes de vote</h2>
          <p className="pres-note">
            {tokens.length} QR code(s) au total : {unusedCount} disponible(s), {o.tokens_used} utilisé(s).
          </p>
          <div className="pres-row">
            <button className="pres-btn" onClick={generateSheet} disabled={busy}>
              {busy ? 'Génération…' : `Générer ${PER_SHEET} QR codes (image PNG)`}
            </button>
            <button className="pres-btn pres-btn-off" onClick={reexportSheet}
              disabled={busy || unusedCount === 0}>
              Réexporter {Math.min(PER_SHEET, unusedCount)} QR non utilisés
            </button>
          </div>
          <p className="pres-note">
            Chaque clic télécharge une feuille A4 (2480 × 3508 px, 300 dpi) avec {PER_SHEET} QR codes de 3 × 3 cm.
            Imprimez l'image à 100 %, sans « ajuster à la page ».
          </p>

          {preview && (
            <img src={preview} alt="Feuille de QR codes"
              style={{ maxWidth: '100%', width: 420, border: '1px solid #ccc', marginTop: 12 }} />
          )}
        </div>
      </div>
    </div>
  )
}