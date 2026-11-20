import { useEffect, useState, useCallback } from 'react'
import { supabaseDb as supabase } from '../utils/client'

export type Challenge = 'aeromodelisme' | 'airshow'
export type CTeam = { id: number; team: string; pos: number | null }
export type TimerState = { duration: number; startedAt: number | null }

export function useChallenge(challenge: Challenge) {
  const [queue, setQueue] = useState<CTeam[]>([])
  const [timer, setTimer] = useState<TimerState>({ duration: 300, startedAt: null })
  const [offset, setOffset] = useState(0) // décalage horloge navigateur / serveur

  const load = useCallback(async () => {
    const { data } = await supabase.from(challenge).select('*').order('pos').order('id')
    setQueue((data ?? []) as CTeam[])

    const { data: t } = await supabase
      .from('challenge_timer')
      .select('duration_seconds, started_at')
      .eq('challenge', challenge)
      .maybeSingle()
    if (t) {
      setTimer({
        duration: t.duration_seconds,
        startedAt: t.started_at ? new Date(t.started_at).getTime() : null,
      })
    }
  }, [challenge])

  useEffect(() => {
    supabase.rpc('get_server_time').then(({ data }) => {
      if (data) setOffset(new Date(data as string).getTime() - Date.now())
    })
    load()
    const channel = supabase
      .channel(`challenge-${challenge}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: challenge }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'challenge_timer' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [challenge, load])

  return { queue, timer, offset, reload: load }
}

export function fmt(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function useCountdown(timer: TimerState, offset: number) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (timer.startedAt === null) return
    setNow(Date.now())
    const i = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(i)
  }, [timer.startedAt])

  if (timer.startedAt === null) {
    return { remaining: timer.duration, state: 'idle' as const }
  }
  const remaining = Math.max(
    0,
    Math.ceil(timer.duration - (now + offset - timer.startedAt) / 1000)
  )
  return { remaining, state: remaining === 0 ? ('done' as const) : ('running' as const) }
}