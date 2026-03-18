const VALID_STATUSES = ['NEW', 'INVESTIGATING', 'RESOLVED'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

const validateCreateTicket = (req, res, next) => {
  const { subject, message, priority } = req.body;
  const errors = [];

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    errors.push('subject is required and must be a non-empty string');
  }
  if (subject && subject.trim().length > 200) {
    errors.push('subject cannot exceed 200 characters');
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('message is required and must be a non-empty string');
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

const validateUpdateTicket = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, errors: ['status is required'] });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      errors: [`status must be one of: ${VALID_STATUSES.join(', ')}`],
    });
  }
  next();
};

module.exports = { validateCreateTicket, validateUpdateTicket };
