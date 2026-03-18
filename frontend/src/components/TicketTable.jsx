import { useState } from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const STATUSES = ['NEW', 'INVESTIGATING', 'RESOLVED'];

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const STATUS_STYLES = {
  NEW:           'badge badge-new',
  INVESTIGATING: 'badge badge-inv',
  RESOLVED:      'badge badge-res',
};

const DOT_CLASSES = {
  NEW:           'dot-new',
  INVESTIGATING: 'dot-inv',
  RESOLVED:      'dot-res',
};

const StatusDropdown = ({ ticketId, status, onStatusChange }) => {
  const [updating, setUpdating] = useState(false);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await onStatusChange(ticketId, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <span className={STATUS_STYLES[status]} style={{ cursor: 'pointer' }}>
      <span className={`badge-dot ${DOT_CLASSES[status]}`} />
      {updating ? (
        <span style={{ fontSize: '0.72rem' }}>…</span>
      ) : (
        <select
          className="status-select"
          value={status}
          onChange={handleChange}
          style={{ background: 'transparent', color: 'inherit' }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} style={{ background: '#141620', color: '#e2e5f5' }}>
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      )}
    </span>
  );
};

const TicketTable = ({ tickets, loading, onStatusChange }) => {
  if (loading) {
    return (
      <div className="empty-state">
        <div className="spinner" style={{ width: 24, height: 24, borderWidth: 3, margin: '0 auto 0.75rem' }} />
        <p className="empty-state-text">Loading tickets…</p>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <p className="empty-state-text">No tickets found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Category</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t._id}>
              <td>
                <div className="ticket-subject" title={t.subject}>{t.subject}</div>
                <div className="ticket-category" style={{ marginTop: '0.2rem' }}>
                  {t.message.slice(0, 60)}{t.message.length > 60 ? '…' : ''}
                </div>
              </td>
              <td><PriorityBadge priority={t.priority} /></td>
              <td>
                <StatusDropdown
                  ticketId={t._id}
                  status={t.status}
                  onStatusChange={onStatusChange}
                />
              </td>
              <td>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {t.aiCategory || '—'}
                </span>
              </td>
              <td>
                <span className="ticket-date">{formatDate(t.createdAt)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
