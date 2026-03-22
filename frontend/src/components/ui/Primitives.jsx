/* ── Reusable UI Primitives ──────────────────────────── */

/* Badge */
export const Badge = ({ variant = 'default', children, className = '' }) => {
  const variants = {
    default:  'bg-zinc-800 text-zinc-300 border-zinc-700/50',
    new:      'bg-sky-500/10  text-sky-400  border-sky-500/20',
    inv:      'bg-orange-500/10 text-orange-400 border-orange-500/20',
    res:      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    high:     'bg-red-500/10 text-red-400 border-red-500/20',
    medium:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low:      'bg-green-500/10 text-green-400 border-green-500/20',
    ai:       'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border font-mono tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

/* Dot indicator */
export const Dot = ({ variant = 'default' }) => {
  const colors = {
    default: 'bg-zinc-500',
    new:     'bg-sky-400',
    inv:     'bg-orange-400',
    res:     'bg-emerald-400',
    high:    'bg-red-400',
    medium:  'bg-amber-400',
    low:     'bg-green-400',
  };
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-dot ${colors[variant]}`} />
  );
};

/* Button */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus:outline-none select-none';

  const variants = {
    primary:   'bg-indigo-600 hover:bg-indigo-500 text-white shadow-soft-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]',
    ghost:     'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed',
    danger:    'bg-red-600 hover:bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin-slow w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

/* Spinner */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-7 h-7' };
  return (
    <svg className={`animate-spin-slow flex-shrink-0 ${sizes[size]} ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
};

/* Input */
export const Input = ({
  label,
  id,
  hint,
  error,
  counter,
  className = '',
  ...rest
}) => (
  <div className="space-y-1.5">
    {label && (
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
        {counter && (
          <span className={`text-[11px] font-mono ${counter.warn ? 'text-red-400' : 'text-zinc-600'}`}>
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
    )}
    <input
      id={id}
      className={`w-full bg-zinc-900 border rounded-lg text-sm text-zinc-100 px-3.5 py-2.5
        placeholder:text-zinc-600 outline-none transition-all duration-150
        hover:border-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30' : 'border-zinc-700/60'}
        ${className}`}
      {...rest}
    />
    {(hint || error) && (
      <p className={`text-[11px] ${error ? 'text-red-400' : 'text-zinc-600'}`}>
        {error || hint}
      </p>
    )}
  </div>
);

/* Textarea */
export const Textarea = ({
  label,
  id,
  hint,
  error,
  counter,
  className = '',
  ...rest
}) => (
  <div className="space-y-1.5">
    {label && (
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
        {counter && (
          <span className={`text-[11px] font-mono ${counter.warn ? 'text-red-400' : 'text-zinc-600'}`}>
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
    )}
    <textarea
      id={id}
      className={`w-full bg-zinc-900 border rounded-lg text-sm text-zinc-100 px-3.5 py-2.5
        placeholder:text-zinc-600 outline-none transition-all duration-150 resize-none
        hover:border-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-red-500/60 focus:border-red-500  focus:ring-red-500/30' : 'border-zinc-700/60'}
        ${className}`}
      {...rest}
    />
    {(hint || error) && (
      <p className={`text-[11px] ${error ? 'text-red-400' : 'text-zinc-600'}`}>
        {error || hint}
      </p>
    )}
  </div>
);
