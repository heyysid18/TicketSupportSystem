const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, errors });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({ success: false, errors: ['Ticket not found'] });
  }

  res.status(err.status || 500).json({
    success: false,
    errors: [err.message || 'Internal server error'],
  });
};

module.exports = errorHandler;
