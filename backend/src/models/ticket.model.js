const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['NEW', 'INVESTIGATING', 'RESOLVED'],
        message: 'Status must be NEW, INVESTIGATING, or RESOLVED',
      },
      default: 'NEW',
    },
    aiSuggested: {
      type: Boolean,
      default: false,
    },
    aiCategory: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for common query patterns
ticketSchema.index({ status: 1 });
ticketSchema.index({ priority: 1 });
ticketSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Ticket', ticketSchema);
