const STATUS_MAP = {
  NEW:          { cls: 'badge-new', dot: 'dot-new', label: 'New' },
  INVESTIGATING:{ cls: 'badge-inv', dot: 'dot-inv', label: 'Investigating' },
  RESOLVED:     { cls: 'badge-res', dot: 'dot-res', label: 'Resolved' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.NEW;
  return (
    <span className={`badge ${s.cls}`}>
      <span className={`badge-dot ${s.dot}`} />
      {s.label}
    </span>
  );
};

export default StatusBadge;
