/* ── Stats Row — Stripe-style metric cards ─────────── */

const STATS = (data) => [
  {
    label: 'Total',
    value: data.total,
    description: 'All tickets',
    accent: 'text-indigo-400',
    bar: 'bg-indigo-500',
    pct: 100,
  },
  {
    label: 'New',
    value: data.open,
    description: 'Awaiting review',
    accent: 'text-sky-400',
    bar: 'bg-sky-500',
    pct: data.total ? Math.round((data.open / data.total) * 100) : 0,
  },
  {
    label: 'Investigating',
    value: data.progress,
    description: 'In progress',
    accent: 'text-orange-400',
    bar: 'bg-orange-500',
    pct: data.total ? Math.round((data.progress / data.total) * 100) : 0,
  },
  {
    label: 'Resolved',
    value: data.resolved,
    description: 'Closed',
    accent: 'text-emerald-400',
    bar: 'bg-emerald-500',
    pct: data.total ? Math.round((data.resolved / data.total) * 100) : 0,
  },
];

const StatCard = ({ label, value, description, accent, bar, pct }) => (
  <div className="group relative rounded-xl border border-zinc-800/60 bg-zinc-900/50 px-5 py-4
    hover:border-zinc-700/70 hover:bg-zinc-900/80 transition-all duration-200 overflow-hidden">
    {/* Top highlight */}
    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

    <div className="flex items-start justify-between mb-3">
      <span className="text-xs text-zinc-500 font-medium">{label}</span>
      <span className={`text-2xl font-bold tracking-tight ${accent} tabular-nums`}>{value}</span>
    </div>

    {/* Progress bar */}
    <div className="h-1 rounded-full bg-zinc-800 overflow-hidden mb-2">
      <div
        className={`h-full rounded-full ${bar} transition-all duration-700`}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% of total`}
      />
    </div>

    <span className="text-[11px] text-zinc-600">{description}</span>
  </div>
);

const StatsRow = ({ stats }) => (
  <div
    className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 animate-fade-up"
    role="region"
    aria-label="Ticket statistics"
  >
    {STATS(stats).map((s) => (
      <StatCard key={s.label} {...s} />
    ))}
  </div>
);

export default StatsRow;
