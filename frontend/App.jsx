import { useState, useEffect } from 'react';
import { useTickets } from './src/hooks/useTickets';
import TicketForm from './components/TicketForm';
import TicketTable from './src/components/TicketTable';

const STATUSES  = ['', 'NEW', 'INVESTIGATING', 'RESOLVED'];
const PRIORITIES = ['', 'High', 'Medium', 'Low'];

const App = () => {
  const { tickets, loading, error, fetchTickets, createTicket, updateStatus } = useTickets();
  const [filters, setFilters] = useState({ status: '', priority: '' });

  useEffect(() => {
    fetchTickets(filters);
  }, [filters, fetchTickets]);

  const handleFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  // Compute stats from current full list (refetch without filters for accurate counts)
  const [allTickets, setAllTickets] = useState([]);
  useEffect(() => {
    import('./src/services/api').then(({ api }) =>
      api.getTickets().then((r) => setAllTickets(r.data)).catch(() => {})
    );
  }, [tickets]);

  const stats = {
    total:       allTickets.length,
    open:        allTickets.filter((t) => t.status === 'NEW').length,
    progress:    allTickets.filter((t) => t.status === 'INVESTIGATING').length,
    resolved:    allTickets.filter((t) => t.status === 'RESOLVED').length,
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <div className="header-logo-mark">TQ</div>
          <span className="header-title">TicketIQ</span>
        </div>
        <span className="header-subtitle">Support Inquiry Dashboard</span>
      </header>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--new-text)' }}>{stats.open}</div>
          <div className="stat-label">New</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--inv-text)' }}>{stats.progress}</div>
          <div className="stat-label">Investigating</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--res-text)' }}>{stats.resolved}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">

        {/* Left — Create Ticket */}
        <aside>
          <div className="card">
            <div className="card-header">
              <span className="card-title">New Inquiry</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent)' }}>✦ AI-assisted</span>
            </div>
            <div className="card-body">
              <TicketForm onSubmit={createTicket} />
            </div>
          </div>
        </aside>

        {/* Right — Ticket List */}
        <section>
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="card-title">All Tickets</span>
                <span className="count-badge">{tickets.length}</span>
              </div>
              <div className="filters">
                <select
                  className="filter-select"
                  value={filters.status}
                  onChange={(e) => handleFilter('status', e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s || 'All statuses'}</option>
                  ))}
                </select>
                <select
                  className="filter-select"
                  value={filters.priority}
                  onChange={(e) => handleFilter('priority', e.target.value)}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p || 'All priorities'}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div style={{ padding: '0 1.4rem' }}>
                <div className="error-msg" style={{ margin: '1rem 0 0' }}>{error}</div>
              </div>
            )}

            <TicketTable
              tickets={tickets}
              loading={loading}
              onStatusChange={updateStatus}
            />
          </div>
        </section>

      </div>
    </>
  );
};

export default App;
