const PRIORITY_MAP = {
  High:   { cls: 'badge-high', icon: '▲' },
  Medium: { cls: 'badge-med',  icon: '●' },
  Low:    { cls: 'badge-low',  icon: '▼' },
};

const PriorityBadge = ({ priority }) => {
  const p = PRIORITY_MAP[priority] || PRIORITY_MAP.Medium;
  return (
    <span className={`badge ${p.cls}`}>
      <span style={{ fontSize: '0.6rem' }}>{p.icon}</span>
      {priority}
    </span>
  );
};

export default PriorityBadge;
