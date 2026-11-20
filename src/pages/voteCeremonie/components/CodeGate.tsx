import { useEffect, useState, type ReactNode } from 'react'
import { supabaseDb as supabase } from '../../../utils/client'
import '../../presenatation/presentation.css'

type Props = {
  title: string
  storageKey: string
  checkFn: 'check_admin_code' | 'check_jury_code'
  children: (code: string, logout: () => void) => ReactNode
}

export default function CodeGate({ title, storageKey, checkFn, children }: Props) {
  const [code, setCode] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function check(c: string) {
    const { data, error } = await supabase.rpc(checkFn, { p_code: c })
    return !error && data === true
  }

  useEffect(() => {
    let saved: string | null = null
    try { saved = sessionStorage.getItem(storageKey) } catch { /* ignore */ }
    if (!saved) { setLoading(false); return }
    check(saved).then(ok => {
      if (ok) setCode(saved)
      else { try { sessionStorage.removeItem(storageKey) } catch { /* ignore */ } }
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const c = input.trim()
    if (await check(c)) {
      try { sessionStorage.setItem(storageKey, c) } catch { /* ignore */ }
      setCode(c)
    } else setError('Code invalide.')
  }

  function logout() {
    try { sessionStorage.removeItem(storageKey) } catch { /* ignore */ }
    setCode(null); setInput('')
  }

  if (loading) return <div className="pres-page"><p>Chargement…</p></div>

  if (!code) {
    return (
      <div className="pres-page"><div className="pres-wrap">
        <form className="pres-panel pres-gate" onSubmit={submit}>
          <h1>{title}</h1>
          <p>Entre le code pour continuer.</p>
          <input className="pres-input" placeholder="Code d'accès" value={input}
            onChange={e => setInput(e.target.value)} autoFocus required />
          {error && <p className="pres-error">{error}</p>}
          <button className="pres-btn" type="submit">Entrer</button>
        </form>
      </div></div>
    )
  }
  return <>{children(code, logout)}</>
}