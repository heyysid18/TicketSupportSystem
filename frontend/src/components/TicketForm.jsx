import { useState } from 'react';

const PRIORITIES = ['High', 'Medium', 'Low'];

const TicketForm = ({ onSubmit }) => {
  const [subject, setSubject]   = useState('');
  const [message, setMessage]   = useState('');
  const [priority, setPriority] = useState('');
  const [aiHint, setAiHint]     = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await onSubmit({ subject, message, priority: priority || undefined });
      // Show AI suggestion if priority was auto-assigned
      if (res?.ai && !priority) {
        setAiHint(res.ai);
      }
      setSubject('');
      setMessage('');
      setPriority('');
      setTimeout(() => setAiHint(null), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const activeCls = (p) => {
    if (p === 'ai') return priority === '' ? 'active-ai' : '';
    return priority === p ? `active-${p.toLowerCase().slice(0, 3) === 'hig' ? 'high' : p.toLowerCase().slice(0, 3) === 'med' ? 'med' : 'low'}` : '';
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="error-msg">{error}</div>}

      {aiHint && (
        <div className="ai-banner">
          <span className="ai-banner-icon">✦</span>
          <span>
            AI classified as <strong>{aiHint.suggested_priority}</strong> priority
            · {aiHint.suggested_category}
            {aiHint.reasoning ? ` — ${aiHint.reasoning}` : ''}
          </span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Subject</label>
        <input
          className="form-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief description of the issue"
          maxLength={200}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea
          className="form-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue in detail…"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Priority</label>
        <div className="priority-grid">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              className={`priority-btn ${activeCls(p)}`}
              onClick={() => setPriority(priority === p ? '' : p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className={`priority-btn ${activeCls('ai')}`}
            onClick={() => setPriority('')}
            title="Let AI decide"
          >
            ✦ AI
          </button>
        </div>
        {!priority && (
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Priority will be auto-classified by AI
          </p>
        )}
      </div>

      <button className="btn-submit" type="submit" disabled={submitting || !subject.trim() || !message.trim()}>
        {submitting ? <><span className="spinner" /> Submitting…</> : '+ Submit Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;
