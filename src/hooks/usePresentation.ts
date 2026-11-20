import { useEffect, useState, useCallback } from 'react'
import { supabaseDb as supabase } from '../utils/client'

export type Team = {
  id: number
  team: string
  turn: number | null
  batch: number | null
  pos: number | null
  done: boolean
  priority: number | null
}
export type Flight = { batch: number; teams: Team[] }
export type Mode = 'single' | 'flight'

export function usePresentation() {
  const [queue, setQueue] = useState<Team[]>([])
  const [doneTeams, setDoneTeams] = useState<Team[]>([])
  const [flights, setFlights] = useState<Flight[]>([])
  const [mode, setMode] = useState<Mode>('single')

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('presentation').select('*').order('pos').order('id')
    const all = (data ?? []) as Team[]

    setQueue(all.filter(t => t.batch === null && !t.done))
    setDoneTeams(all.filter(t => t.batch === null && t.done))

    const byBatch = new Map<number, Team[]>()
    all.filter(t => t.batch !== null).forEach(t => {
      byBatch.set(t.batch!, [...(byBatch.get(t.batch!) ?? []), t])
    })
    setFlights(
      [...byBatch.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([batch, teams]) => ({
          batch,
          teams: teams.sort((a, b) => (a.turn ?? 0) - (b.turn ?? 0)),
        })),
    )

    const { data: d } = await supabase
      .from('presentation_display').select('mode').eq('id', 1).maybeSingle()
    if (d?.mode) setMode(d.mode as Mode)
  }, [])

  useEffect(() => {
    load()
    const channel = supabase
      .channel('presentation-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'presentation' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'presentation_display' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [load])

  return { queue, doneTeams, flights, mode, reload: load }
}