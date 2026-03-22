/* ── Ticket Table ─────────────────────────────────────
   Full-width premium table with filters, skeleton loaders,
   and inline status update
──────────────────────────────────────────────────── */
import { useState } from 'react';
import { Badge, Dot, Spinner } from '../ui/Primitives';

const STATUSES   = ['NEW', 'INVESTIGATING', 'RESOLVED'];
const STATUS_VAR = { NEW: 'new', INVESTIGATING: 'inv', RESOLVED: 'res' };
const STATUS_LABEL = { NEW: 'New', INVESTIGATING: 'Investigating', RESOLVED: 'Resolved' };
const PRI_VAR   = { High: 'high', Medium: 'medium', Low: 'low' };
const PRI_ICON  = { High: '↑', Medium: '→', Low: '↓' };

const formatDate = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)  return `${days}d ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

/* ── Skeleton Row ─────────────────────────────────── */
const SkeletonRow = () => (
  <tr aria-hidden="true">
    <td className="px-4 py-3.5">
      <div className="skeleton h-3.5 w-44 rounded mb-1.5" />
      <div className="skeleton h-2.5 w-28 rounded" />
    </td>
    <td className="px-4 py-3.5"><div className="skeleton h-5 w-16 rounded-full" /></td>
    <td className="px-4 py-3.5"><div className="skeleton h-5 w-20 rounded-full" /></td>
    <td className="px-4 py-3.5"><div className="skeleton h-4 w-20 rounded" /></td>
    <td className="px-4 py-3.5"><div className="skeleton h-3 w-14 rounded" /></td>
  </tr>
);

/* ── Status Dropdown ──────────────────────────────── */
const StatusCell = ({ ticketId, status, onStatusChange }) => {
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

  const variant = STATUS_VAR[status] ?? 'default';

  return (
    <Badge variant={variant} className="cursor-pointer">
      {updating ? (
        <Spinner size="sm" className="w-2.5 h-2.5" />
      ) : (
        <Dot variant={variant} />
      )}
      <select
        value={status}
        onChange={handleChange}
        className="bg-transparent border-none outline-none cursor-pointer text-inherit font-inherit text-[11px] appearance-none p-0"
        aria-label={`Status: ${STATUS_LABEL[status]}. Click to change.`}
        disabled={updating}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{STATUS_LABEL[s]}</option>
        ))}
      </select>
    </Badge>
  );
};

/* ── Filters Bar ──────────────────────────────────── */
export const FiltersBar = ({ filters, onFilter, ticketCount }) => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
    <select
      className="custom-select"
      value={filters.status}
      onChange={(e) => onFilter('status', e.target.value)}
      aria-label="Filter by status"
    >
      <option value="">All statuses</option>
      <option value="NEW">New</option>
      <option value="INVESTIGATING">Investigating</option>
      <option value="RESOLVED">Resolved</option>
    </select>
    <select
      className="custom-select"
      value={filters.priority}
      onChange={(e) => onFilter('priority', e.target.value)}
      aria-label="Filter by priority"
    >
      <option value="">All priorities</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>

    {/* Active filter indicators */}
    {(filters.status || filters.priority) && (
      <button
        onClick={() => { onFilter('status', ''); onFilter('priority', ''); }}
        className="ml-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
        type="button"
      >
        Clear filters
      </button>
    )}

    <span className="ml-auto text-[11px] font-mono text-zinc-600">
      {ticketCount} result{ticketCount !== 1 ? 's' : ''}
    </span>
  </div>
);

/* ── Ticket Table ─────────────────────────────────── */
const TicketTable = ({ tickets, loading, onStatusChange }) => {
  /* Loading skeleton */
  if (loading) {
    return (
      <div className="overflow-x-auto" aria-busy="true" aria-label="Loading tickets">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60">
              {['Subject', 'Priority', 'Status', 'Category', 'Date'].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 uppercase tracking-wider font-mono whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }

  /* Empty state */
  if (!tickets.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center animate-fade-in" role="status">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-zinc-600">
            <path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z"/>
          </svg>
        </div>
        <p className="text-sm font-semibold text-zinc-400 mb-1">No tickets found</p>
        <p className="text-xs text-zinc-600 max-w-[240px] leading-relaxed">
          No tickets match your current filters. Try clearing the filters or create a new ticket.
        </p>
      </div>
    );
  }

  /* Ticket rows */
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" aria-label="Support tickets">
        <thead>
          <tr className="border-b border-zinc-800/60">
            {['Subject', 'Priority', 'Status', 'Category', 'Date'].map((h) => (
              <th key={h} scope="col" className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-600 uppercase tracking-wider font-mono whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/40">
          {tickets.map((t, i) => (
            <tr
              key={t._id}
              className="group hover:bg-zinc-900/60 transition-colors duration-100"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {/* Subject */}
              <td className="px-4 py-3.5 max-w-[240px]">
                <p className="font-medium text-zinc-200 truncate leading-snug" title={t.subject}>
                  {t.subject}
                </p>
                <p className="text-[11px] text-zinc-600 truncate mt-0.5">
                  {t.message.slice(0, 65)}{t.message.length > 65 ? '…' : ''}
                </p>
              </td>

              {/* Priority */}
              <td className="px-4 py-3.5 whitespace-nowrap">
                {t.priority ? (
                  <Badge variant={PRI_VAR[t.priority]}>
                    <span className="text-[10px] font-bold">{PRI_ICON[t.priority]}</span>
                    {t.priority}
                  </Badge>
                ) : (
                  <span className="text-xs text-zinc-700">—</span>
                )}
              </td>

              {/* Status */}
              <td className="px-4 py-3.5 whitespace-nowrap">
                <StatusCell
                  ticketId={t._id}
                  status={t.status}
                  onStatusChange={onStatusChange}
                />
              </td>

              {/* AI Category */}
              <td className="px-4 py-3.5">
                {t.aiCategory ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded whitespace-nowrap">
                    <span className="text-indigo-600 text-[9px]">✦</span>
                    {t.aiCategory}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-700">—</span>
                )}
              </td>

              {/* Date */}
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="text-[11px] text-zinc-600 font-mono" title={new Date(t.createdAt).toLocaleString()}>
                  {formatDate(t.createdAt)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
