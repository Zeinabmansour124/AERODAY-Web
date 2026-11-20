import { useEffect, useState, type ReactNode } from 'react'
import { supabaseDb as supabase } from '../../../utils/client'
import '../../presenatation/presentation.css'

const KEY = 'pres_admin_code'

async function checkCode(code: string) {
  const { data, error } = await supabase.rpc('check_admin_code', { p_code: code })
  return !error && data === true
}

export default function AdminGate({
  children,
}: {
  children: (code: string, logout: () => void) => ReactNode
}) {
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

  return <>{children(code, logout)}</>
}