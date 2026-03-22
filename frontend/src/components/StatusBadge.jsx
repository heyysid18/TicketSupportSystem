const STATUS_MAP = {
  NEW:           { cls: 'badge-new', dot: true, label: 'New' },
  INVESTIGATING: { cls: 'badge-inv', dot: true, label: 'Investigating' },
  RESOLVED:      { cls: 'badge-res', dot: true, label: 'Resolved' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] ?? STATUS_MAP.NEW;
  return (
    <span className={`badge ${s.cls}`} aria-label={`Status: ${s.label}`}>
      {s.dot && <span className="badge-dot" aria-hidden="true" />}
      {s.label}
    </span>
  );
};

export default StatusBadge;
