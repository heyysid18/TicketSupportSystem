/* ── Create Ticket Modal ──────────────────────────────
   Notion/Linear-style centered modal with backdrop
──────────────────────────────────────────────────── */
import { useState, useEffect, useCallback } from 'react';
import { Button, Input, Textarea } from '../ui/Primitives';

const PRIORITIES = ['High', 'Medium', 'Low'];
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 1000;

const PRIORITY_STYLES = {
  High:   { ring: 'ring-red-500/40 border-red-500/40 bg-red-500/10 text-red-400',   dot: 'bg-red-400'    },
  Medium: { ring: 'ring-amber-500/40 border-amber-500/40 bg-amber-500/10 text-amber-400', dot: 'bg-amber-400' },
  Low:    { ring: 'ring-green-500/40 border-green-500/40 bg-green-500/10 text-green-400',  dot: 'bg-green-400' },
};

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CreateTicketModal = ({ open, onClose, onSubmit }) => {
  const [subject,    setSubject]    = useState('');
  const [message,    setMessage]    = useState('');
  const [priority,   setPriority]   = useState('');
  const [aiHint,     setAiHint]     = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);
  const [touched,    setTouched]    = useState({ subject: false, message: false });

  const reset = useCallback(() => {
    setSubject(''); setMessage(''); setPriority('');
    setAiHint(null); setError(null);
    setTouched({ subject: false, message: false });
  }, []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  /* Reset state when modal closes */
  useEffect(() => { if (!open) setTimeout(reset, 250); }, [open, reset]);

  /* Validation */
  const subjectEmpty = subject.trim().length === 0;
  const messageEmpty = message.trim().length === 0;
  const subjectOver  = subject.length > MAX_SUBJECT;
  const messageOver  = message.length > MAX_MESSAGE;

  const subjectError = touched.subject && subjectEmpty ? 'Subject is required' :
                       subjectOver ? `Subject must be under ${MAX_SUBJECT} characters` : null;
  const messageError = touched.message && messageEmpty ? 'Message is required' :
                       messageOver ? `Message must be under ${MAX_MESSAGE} characters` : null;

  const canSubmit = !submitting && !subjectEmpty && !messageEmpty && !subjectOver && !messageOver;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ subject: true, message: true });
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await onSubmit({ subject, message, priority: priority || undefined });
      if (res?.ai && !priority) setAiHint(res.ai);
      onClose();
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-overlay-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-zinc-900 border border-zinc-700/60 rounded-2xl shadow-soft-lg animate-modal-in overflow-hidden">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/60">
          <div>
            <h2 id="modal-title" className="text-sm font-semibold text-zinc-100">
              New Support Ticket
            </h2>
            <p className="text-[11px] text-zinc-600 mt-0.5">
              AI will automatically categorize &amp; prioritize
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600
              hover:text-zinc-300 hover:bg-zinc-800 transition-all duration-150"
          >
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-5">

          {/* API error */}
          {error && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-fade-in" role="alert">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* AI hint */}
          {aiHint && (
            <div className="flex items-start gap-3 px-3.5 py-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 animate-fade-in" role="status">
              <span className="text-indigo-400 text-sm flex-shrink-0 mt-0.5">✦</span>
              <p className="text-xs text-indigo-300 leading-relaxed">
                AI classified as <span className="font-semibold">{aiHint.suggested_priority}</span> priority
                {aiHint.suggested_category && <> · <span className="font-medium">{aiHint.suggested_category}</span></>}
                {aiHint.reasoning && <> — {aiHint.reasoning}</>}
              </p>
            </div>
          )}

          {/* Subject */}
          <Input
            id="modal-subject"
            label="Subject"
            placeholder="Brief description of the issue"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
            error={subjectError}
            counter={{ current: subject.length, max: MAX_SUBJECT, warn: subjectOver }}
            required
            aria-required="true"
            autoComplete="off"
            autoFocus
          />

          {/* Message */}
          <Textarea
            id="modal-message"
            label="Details"
            placeholder="Describe your issue in detail. The more context you provide, the faster we can help."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            error={messageError}
            counter={{ current: message.length, max: MAX_MESSAGE, warn: messageOver }}
            required
            aria-required="true"
            rows={4}
          />

          {/* Priority selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider" id="priority-group">
                Priority
              </span>
              {!priority && (
                <span className="text-[11px] text-indigo-500/80 font-mono">✦ AI will decide</span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="priority-group">
              {PRIORITIES.map((p) => {
                const active = priority === p;
                const s = PRIORITY_STYLES[p];
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(active ? '' : p)}
                    aria-pressed={active}
                    className={`
                      flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium
                      transition-all duration-150
                      ${active
                        ? `ring-1 ${s.ring}`
                        : 'border-zinc-700/60 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 bg-zinc-900'
                      }
                    `}
                  >
                    {active && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />}
                    {p}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPriority('')}
                aria-pressed={priority === ''}
                className={`
                  flex items-center justify-center gap-1 py-2 rounded-lg border text-xs font-medium
                  transition-all duration-150
                  ${priority === ''
                    ? 'ring-1 ring-indigo-500/40 border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
                    : 'border-zinc-700/60 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 bg-zinc-900'
                  }
                `}
              >
                <span className="text-[10px]">✦</span> AI
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-zinc-800/60 bg-zinc-950/40">
          <Button variant="ghost" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={submitting}
            disabled={submitting}
            onClick={handleSubmit}
            type="submit"
          >
            {submitting ? 'Submitting…' : 'Submit Ticket'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModal;
