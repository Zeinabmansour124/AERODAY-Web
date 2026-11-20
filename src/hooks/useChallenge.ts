import { useEffect, useState, useCallback } from 'react'
import { supabaseDb as supabase } from '../utils/client'

export type Challenge = 'aeromodelisme' | 'airshow'
export type CTeam = { id: number; team: string; pos: number | null; stage?: number }
export type TimerState = {
  duration: number
  startedAt: number | null
  pausedRemaining: number | null
}

export function useChallenge(challenge: Challenge) {
  // lists : 3 listes pour l'aéromodélisme, 1 seule pour l'airshow
  const [lists, setLists] = useState<CTeam[][]>([[]])
  const [timer, setTimer] = useState<TimerState>({ duration: 300, startedAt: null, pausedRemaining: null })
  const [offset, setOffset] = useState(0)

  const load = useCallback(async () => {
    const { data } = await supabase.from(challenge).select('*').order('pos').order('id')
    const all = (data ?? []) as CTeam[]
    if (challenge === 'aeromodelisme') {
      setLists([1, 2, 3].map(s => all.filter(t => (t.stage ?? 1) === s)))
    } else {
      setLists([all])
    }

    const { data: t } = await supabase
      .from('challenge_timer')
      .select('duration_seconds, started_at, paused_remaining')
      .eq('challenge', challenge)
      .maybeSingle()
    if (t) {
      setTimer({
        duration: t.duration_seconds,
        startedAt: t.started_at ? new Date(t.started_at).getTime() : null,
        pausedRemaining: t.paused_remaining ?? null,
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

  // queue = la liste qui joue (liste 3 pour l'aéromodélisme)
  const queue = lists[lists.length - 1]
  return { lists, queue, timer, offset, reload: load }
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

  if (timer.pausedRemaining !== null) {
    return { remaining: timer.pausedRemaining, state: 'paused' as const }
  }
  if (timer.startedAt === null) {
    return { remaining: timer.duration, state: 'idle' as const }
  }
  const remaining = Math.max(
    0,
    Math.ceil(timer.duration - (now + offset - timer.startedAt) / 1000),
  )
  return { remaining, state: remaining === 0 ? ('done' as const) : ('running' as const) }
}