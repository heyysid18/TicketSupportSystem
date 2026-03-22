/* ── Top Header / Topbar ──────────────────────────────
   Stripe-style sticky topbar with action CTA
──────────────────────────────────────────────────── */
import { Button } from '../ui/Primitives';

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Header = ({ ticketCount, onCreateClick }) => (
  <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/60 flex-shrink-0">

    {/* Left — page context */}
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-sm font-semibold text-zinc-100 leading-none">
          All Tickets
        </h1>
        <p className="text-[11px] text-zinc-600 mt-0.5 font-mono">
          {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
        </p>
      </div>
    </div>

    {/* Right — actions */}
    <div className="flex items-center gap-2">
      {/* Mobile brand */}
      <div className="md:hidden flex items-center gap-2 mr-2">
        <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">TQ</span>
        </div>
        <span className="text-sm font-semibold text-zinc-100">TicketIQ</span>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onCreateClick}
        aria-label="Create new ticket"
      >
        <PlusIcon />
        New Ticket
      </Button>
    </div>
  </header>
);

export default Header;
