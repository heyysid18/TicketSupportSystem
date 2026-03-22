/* ── Sidebar ─────────────────────────────────────────
   Linear-inspired left sidebar with nav + live stats
──────────────────────────────────────────────────── */

const NavIcon = ({ children }) => (
  <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-current">
    {children}
  </span>
);

const TicketIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z"/>
  </svg>
);

const InboxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const Sidebar = ({ stats }) => (
  <aside className="hidden md:flex flex-col w-56 flex-shrink-0 border-r border-zinc-800/60 bg-zinc-950 h-screen sticky top-0 overflow-y-auto">

    {/* Brand */}
    <div className="flex items-center gap-2.5 px-4 h-14 border-b border-zinc-800/60 flex-shrink-0">
      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[11px] font-bold tracking-tight">TQ</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-semibold text-zinc-100">TicketIQ</span>
        <span className="text-[10px] text-zinc-600 mt-0.5">Workspace</span>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-0.5 px-2 pt-3 flex-1" aria-label="Main navigation">
      <p className="px-2.5 mb-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
        Support
      </p>
      <a className="nav-item active" aria-current="page">
        <NavIcon><TicketIcon /></NavIcon>
        All Tickets
        <span className="ml-auto text-[11px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
          {stats.total}
        </span>
      </a>
      <a className="nav-item">
        <NavIcon><InboxIcon /></NavIcon>
        Inbox
        {stats.open > 0 && (
          <span className="ml-auto w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
            {stats.open > 9 ? '9+' : stats.open}
          </span>
        )}
      </a>

      <div className="mt-4 mb-1">
        <p className="px-2.5 mb-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
          Status
        </p>
      </div>

      {/* Status summary mini-section */}
      <div className="mx-2 rounded-lg border border-zinc-800/60 bg-zinc-900/40 divide-y divide-zinc-800/60 mb-3">
        {[
          { key: 'New', value: stats.open, dot: 'bg-sky-400' },
          { key: 'Investigating', value: stats.progress, dot: 'bg-orange-400' },
          { key: 'Resolved', value: stats.resolved, dot: 'bg-emerald-400' },
        ].map(({ key, value, dot }) => (
          <div key={key} className="flex items-center justify-between px-3 py-1.5">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
              <span className="text-xs text-zinc-500">{key}</span>
            </div>
            <span className="text-xs font-mono text-zinc-400">{value}</span>
          </div>
        ))}
      </div>
    </nav>

    {/* Bottom settings */}
    <div className="px-2 pb-3 border-t border-zinc-800/60 pt-2 flex-shrink-0">
      <a className="nav-item">
        <NavIcon><SettingsIcon /></NavIcon>
        Settings
      </a>
      {/* AI status indicator */}
      <div className="flex items-center gap-2 px-2.5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
        <span className="text-[11px] text-zinc-600 font-mono">AI · online</span>
      </div>
    </div>
  </aside>
);

export default Sidebar;
