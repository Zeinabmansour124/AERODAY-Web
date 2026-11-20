import { usePresentation } from '../../hooks/usePresentation'
import './presentation.css'

export default function Presentation() {
  const { queue, flights, mode } = usePresentation()

  const showFlights = mode === 'flight' && flights.length > 0
  const curFlight = flights[0]
  const nextFlight = flights[1]
  const current = queue[0]
  const next = queue[1]

  return (
    <div className="pres-page pres-screen">
      <div className="pres-wrap">
        {showFlights ? (
          <section>
            <span className="pres-flight-tag">Flight en cours</span>
            <h1 className="pres-title">Équipes à présenter</h1>
            <ol className="pres-teams">
              {curFlight.teams.map((t, i) => (
                <li key={t.id} className="pres-team">
                  <span className="pres-num">{i + 1}</span>
                  {t.team}
                </li>
              ))}
            </ol>

            {nextFlight && (
              <div className="pres-next" style={{ marginTop: 28 }}>
                <span className="pres-next-label">Flight suivant</span>
                <span className="pres-next-name">
                  {nextFlight.teams.map(t => t.team).join(' · ')}
                </span>
              </div>
            )}
          </section>
        ) : current ? (
          <section className="pres-single">
            <span className="pres-flight-tag">À présenter</span>
            <div className="pres-single-name">{current.team}</div>

            {next && (
              <div className="pres-next">
                <span className="pres-next-label">Équipe suivante</span>
                <span className="pres-next-name">{next.team}</span>
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