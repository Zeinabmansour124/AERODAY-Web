interface StatItem {
  id: number;
  value: string;      // "500+" plutôt que juste un nombre, pour flexibilité (+, %, etc.)
  label: string;
  icon?: string;       // optionnel, si tu veux une icône par stat
}

const stats: StatItem[] = [
  { id: 1, value: '500+', label: 'Participants' },
  { id: 2, value: '15', label: 'Conférenciers experts' },
  { id: 3, value: '3', label: "Éditions organisées" },
  { id: 4, value: '10+', label: 'Ateliers pratiques' },
];

function KeyNumbers() {
  return (
    <section className="key-numbers mb-5">
      <div className="key-numbers-container">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default KeyNumbers;