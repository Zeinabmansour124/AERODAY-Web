import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabaseDb as supabase } from '../../utils/client'
import '../presenatation/Presentation.css'

const VOTE_FN = 'cast_vote'

type Phase = 'before' | 'during' | 'after'
type TokenStatus = 'valid' | 'used' | 'invalid'

type Candidat = {
  id: number
  author: string
  title: string
  description: string | null
  url: string | null
  thumbnail: string | null
}

type ApiRow = {
  candidat_id: number
  author: string
  title: string
  votes_count: number
  public_score: number
  jury_score: number
  score: number
  rank: number
}

type ResultRow = {
  id: number
  author: string
  title: string
  votes: number
  public_score: number
  jury_score: number
  final_score: number
}

/* Cadre commun : tout est centré et harmonisé */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pres-page">
      <div className="vp-page">{children}</div>
    </div>
  )
}

function Hero({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <header className="vp-hero">
      <span className="vp-tag">{tag}</span>
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </header>
  )
}

function Notice({ title, text }: { title: string; text?: string }) {
  return (
    <div className="vp-notice">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default function Vote() {
  const [params] = useSearchParams()
  const token = params.get('token')

  const [phase, setPhase] = useState<Phase | null>(null)
  const [loadErr, setLoadErr] = useState('')
  const [candidats, setCandidats] = useState<Candidat[]>([])
  const [candErr, setCandErr] = useState('')
  const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null)
  const [tokenErr, setTokenErr] = useState('')
  const [published, setPublished] = useState(false)
  const [results, setResults] = useState<ResultRow[]>([])

  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const loadPhase = useCallback(async () => {
    const { data, error } = await supabase
      .from('vote_config')
      .select('phase')
      .order('updated_at', { ascending: false })
      .limit(1)
    if (error) return setLoadErr(error.message)
    if (!data || data.length === 0) {
      return setLoadErr('Lecture impossible : vérifiez la policy de vote_config')
    }
    setLoadErr('')
    setPhase(data[0].phase as Phase)
  }, [])

  useEffect(() => {
    loadPhase()
    const t = setInterval(loadPhase, 8000)
    return () => clearInterval(t)
  }, [loadPhase])

  useEffect(() => {
    if (phase !== 'during' && phase !== 'after') return
    supabase
      .from('candidats')
      .select('id, author, title, description, url, thumbnail')
      .order('id')
      .then(({ data, error }) => {
        if (error) return setCandErr(error.message)
        setCandErr('')
        setCandidats((data as Candidat[]) ?? [])
      })
  }, [phase])

  useEffect(() => {
    if (phase !== 'during' || !token) return
    supabase.rpc('check_token', { p_token: token }).then(({ data, error }) => {
      if (error) {
        setTokenErr(error.message)
        return setTokenStatus('invalid')
      }
      setTokenErr('')
      const s = typeof data === 'string' ? data : data?.status
      setTokenStatus(s === 'valid' || s === 'used' ? s : 'invalid')
    })
  }, [phase, token])

  useEffect(() => {
    if (phase !== 'after') {
      setPublished(false)
      setResults([])
      return
    }
    const load = async () => {
      const { data, error } = await supabase.rpc('get_vote_results')
      const r = data as { status: string; data: ApiRow[] } | null
      if (!error && r?.status === 'ready' && Array.isArray(r.data) && r.data.length > 0) {
        setResults(
          r.data.map(x => ({
            id: x.candidat_id,
            author: x.author,
            title: x.title,
            votes: Number(x.votes_count),
            public_score: Number(x.public_score),
            jury_score: Number(x.jury_score),
            final_score: Number(x.score),
          })),
        )
        setPublished(true)
      } else {
        setPublished(false)
        setResults([])
      }
    }
    load()
    const t = setInterval(load, 8000)
    return () => clearInterval(t)
  }, [phase])

  async function vote(cand: Candidat) {
    if (!window.confirm(`Confirmer votre vote pour « ${cand.author} » ? Il sera définitif.`)) return
    setBusy(true)
    setMsg(null)
    const { data, error } = await supabase.rpc(VOTE_FN, {
      p_token_uuid: token,
      p_candidat_id: cand.id,
      p_username: 'Anonyme',
    })
    setBusy(false)
    if (error || !data?.success) {
      return setMsg({ ok: false, text: data?.message ?? error?.message ?? 'Erreur' })
    }
    setMsg({ ok: true, text: 'Merci, votre vote est enregistré !' })
    setTokenStatus('used')
  }

  // ---------- Écrans d'attente ----------
  if (!phase) {
    return <Shell><Notice title={loadErr || 'Chargement…'} /></Shell>
  }
  if (phase === 'before') {
    return (
      <Shell>
        <Hero tag="Vote du public" title="Bientôt le vote" />
        <Notice title="Le vote n'est pas encore lancé" text="Reviens dans quelques instants." />
      </Shell>
    )
  }
  if (phase === 'during' && !token) {
    return (
      <Shell>
        <Hero tag="Vote du public" title="Prêt à voter ?" />
        <Notice title="Scannez votre QR code personnel pour voter" />
      </Shell>
    )
  }
  if (phase === 'during' && tokenStatus === null) {
    return <Shell><Notice title="Vérification du QR code…" /></Shell>
  }
  if (phase === 'during' && tokenStatus === 'invalid') {
    return (
      <Shell>
        <Notice title="QR code invalide" text={tokenErr || undefined} />
      </Shell>
    )
  }

  const canVote = phase === 'during' && tokenStatus === 'valid'

  return (
    <Shell>
      <Hero
        tag={phase === 'during' ? 'Vote du public' : 'Cérémonie'}
        title={phase === 'during' ? 'Votez pour votre vidéo préférée' : 'Le vote est terminé'}
        sub={phase === 'during' ? 'Regardez les vidéos puis choisissez. Un seul vote par QR code.' : undefined}
      />

      {phase === 'during' && tokenStatus === 'used' && !msg?.ok && (
        <div className="vp-alert warn">Ce QR code a déjà été utilisé.</div>
      )}
      {msg && <div className={`vp-alert ${msg.ok ? 'ok' : 'err'}`}>{msg.text}</div>}
      {candErr && <div className="vp-alert err">{candErr}</div>}

      {/* Les vidéos : visibles pendant le vote, masquées pendant la cérémonie */}
      {phase === 'during' && (
        <div className="vp-grid">
          {candidats.map(c => (
            <article key={c.id} className="vp-card">
              {c.url && (
                <video src={c.url} poster={c.thumbnail ?? undefined} controls preload="metadata" playsInline />
              )}
              <div className="vp-card-body">
                <h3>{c.author}</h3>
                <p className="vp-card-title">{c.title}</p>
                {c.description && <p className="vp-card-desc">{c.description}</p>}
                <button className="pres-btn vp-btn" onClick={() => vote(c)} disabled={!canVote || busy}>
                  {busy ? 'Envoi…' : 'Voter pour celui-ci'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {phase === 'after' && !published && (
        <Notice title="Les résultats seront annoncés prochainement" />
      )}

      {phase === 'after' && published && <Results rows={results} candidats={candidats} />}
    </Shell>
  )
}

/* ---------- Graphique de cérémonie ---------- */
const COLORS = ['#2FA8E0', '#FF3D5A', '#FF8A1F', '#A4C921', '#8A3C9E', '#8B6B55', '#F43F8E', '#14B8A6']

function Results({ rows, candidats }: { rows: ResultRow[]; candidats: Candidat[] }) {
  const sorted = [...rows].sort((a, b) => b.final_score - a.final_score)
  const winner = sorted[0]
  const winnerVideo = candidats.find(c => c.id === winner.id)
  const totalVotes = rows.reduce((s, r) => s + r.votes, 0)

  // Échelle de l'axe : arrondie à la dizaine supérieure
  const maxScore = Math.max(...sorted.map(r => r.final_score), 1)
  const scaleMax = Math.max(10, Math.ceil(maxScore / 10) * 10)
  const ticks = [0, 1, 2, 3, 4].map(k => ({ pct: k * 25, value: Math.round((scaleMax * k) / 4) }))

  // Les barres montent avec une animation à l'affichage
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="vp-results">
      <div className="vp-winner">
        <span className="vp-crown">Le gagnant</span>
        <div className="vp-winner-name">{winner.author}</div>
        <div className="vp-winner-score">{winner.final_score.toFixed(2)} points</div>
        {winnerVideo?.url && <video src={winnerVideo.url} controls playsInline />}
      </div>

      <div className="vp-chart-card">
        <h2>Résultats du vote</h2>

        <div className="vp-chart-scroll">
          <div className="vp-chart" style={{ minWidth: Math.max(sorted.length * 90, 320) + 56 }}>
            <div className="vp-yaxis">
              {ticks.map(t => (
                <span key={t.pct} style={{ bottom: `${t.pct}%` }}>{t.value}</span>
              ))}
            </div>

            <div className="vp-plot">
              <div className="vp-grid-lines">
                {ticks.map(t => <i key={t.pct} style={{ bottom: `${t.pct}%` }} />)}
              </div>

              <div className="vp-cols">
                {sorted.map((r, i) => {
                  const h = on ? (r.final_score / scaleMax) * 100 : 0
                  return (
                    <div key={r.id} className="vp-col">
                      <div className="vp-barzone">
                        <div className="vp-bar" style={{ height: `${h}%`, background: COLORS[i % COLORS.length] }}>
                          <span className="vp-val">{r.final_score.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="vp-xlabel">{r.author}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vp-legend">
        {sorted.map((r, i) => (
          <div key={r.id} className="vp-legend-card" style={{ borderTopColor: COLORS[i % COLORS.length] }}>
            <span className="vp-legend-rank" style={{ background: COLORS[i % COLORS.length] }}>{i + 1}</span>
            <strong>{r.author}</strong>
            <small>{r.title}</small>
            <div className="vp-legend-nums">
              <span>{r.votes} vote(s)</span>
              <span>Public {r.public_score.toFixed(1)}</span>
              <span>Jury {r.jury_score}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="vp-total">{totalVotes} vote(s) au total</p>
    </section>
  )
}