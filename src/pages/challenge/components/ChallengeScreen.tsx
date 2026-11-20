import { useChallenge, useCountdown, fmt, type Challenge } from '../../../hooks/useChallenge'
import '../../presenatation/presentation.css'

export default function ChallengeScreen({ challenge, title }: { challenge: Challenge; title: string }) {
  const { queue, timer, offset } = useChallenge(challenge)
  const { remaining, state } = useCountdown(timer, offset)
  const current = queue[0]
  const nexts = queue.slice(1, 3)

  return (
    <div className="pres-page pres-screen">
      <div className="pres-wrap">
        {current ? (
          <section className="pres-single">
            <span className="pres-flight-tag">{title}</span>

            <div className="ch-row">
              <div className="pres-single-name ch-name">{current.team}</div>
              <div className={`ch-timer ${state}`}>
                {state === 'paused' && <small className="ch-pause-tag">⏸ En pause</small>}
                {fmt(remaining)}
              </div>
            </div>

            {nexts.length > 0 && (
              <div className="ch-nexts">
                {nexts.map((t, i) => (
                  <div key={t.id} className="pres-next">
                    <span className="pres-next-label">{i === 0 ? 'Suivante' : 'Ensuite'}</span>
                    <span className="pres-next-name">{t.team}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <p className="pres-empty">Aucune équipe pour le moment.</p>
        )}
      </div>
    </div>
  )
}