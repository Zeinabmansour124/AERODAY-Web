import { useCallback, useEffect, useState } from 'react'
import { supabaseDb as supabase } from '../../utils/client'
import CodeGate from './components/CodeGate'
import '../presenatation/presentation.css'

type Cand = { id: number; author: string; title: string; jury_score: number; scored: boolean }
type Info = { published: boolean; max: number; candidates: Cand[] }

export default function Jury() {
  return (
    <CodeGate title="Accès jury" storageKey="jury_code" checkFn="check_jury_code">
      {(code, logout) => <Panel code={code} onLogout={logout} />}
    </CodeGate>
  )
}

function Panel({ code, onLogout }: { code: string; onLogout: () => void }) {
  const [info, setInfo] = useState<Info | null>(null)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.rpc('jury_list', { p_code: code })
    if (error) setMsg(error.message)
    else setInfo(data as Info)
  }, [code])

  useEffect(() => { load() }, [load])

  async function save(id: number, score: number) {
    const { error } = await supabase.rpc('jury_set_score', { p_code: code, p_id: id, p_score: score })
    setMsg(error ? error.message : '')
    if (!error) load()
  }

  if (!info) return <div className="pres-page"><p>{msg || 'Chargement…'}</p></div>
  const done = info.candidates.filter(c => c.scored).length

  return (
    <div className="pres-page">
      <div className="pres-wrap">
        <button className="pres-logout" onClick={onLogout}>Verrouiller</button>
        <h1>Notation du jury</h1>
        <p>
          Note chaque candidat entre 0 et <strong>{info.max}</strong>. Notés : {done}/{info.candidates.length}.
        </p>
        {info.published && <p className="pres-note">Résultats publiés : les notes sont verrouillées.</p>}
        {msg && <p className="pres-error">{msg}</p>}

        <div className="pres-panel">
          {info.candidates.map(c => (
            <ScoreRow key={c.id} c={c} max={info.max} locked={info.published}
              onSave={v => save(c.id, v)} />
          ))}
          {info.candidates.length === 0 && <p>Aucun candidat.</p>}
        </div>
      </div>
    </div>
  )
}

function ScoreRow({ c, max, locked, onSave }: {
  c: Cand; max: number; locked: boolean; onSave: (v: number) => void
}) {
  const [v, setV] = useState(c.scored ? String(c.jury_score) : '')
  useEffect(() => setV(c.scored ? String(c.jury_score) : ''), [c.scored, c.jury_score])
  const changed = v !== '' && (!c.scored || Number(v) !== Number(c.jury_score))

  return (
    <div className="jury-row">
      <div className="jury-name">
        <strong>{c.author}</strong>
        <span className="pres-note">{c.title}</span>
      </div>
      <input className="pres-input" type="number" min={0} max={max} step={0.5}
        placeholder={`/ ${max}`} value={v} disabled={locked}
        onChange={e => setV(e.target.value)} style={{ width: 100, flex: 'none' }} />
      <button className="pres-btn" disabled={!changed || locked} onClick={() => onSave(Number(v))}>
        Enregistrer
      </button>
      <span className={`badge ${c.scored ? 'ok' : ''}`}>{c.scored ? '✔ noté' : 'à noter'}</span>
    </div>
  )
}