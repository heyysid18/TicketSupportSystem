const Ticket = require('../models/ticket.model');
const { classifyTicket } = require('../services/gemini.service');

// POST /api/tickets
const createTicket = async (req, res, next) => {
  try {
    const { subject, message, priority } = req.body;

    // Run AI classification in parallel with any prep work
    const aiResult = await classifyTicket(subject, message);

    const ticket = await Ticket.create({
      subject: subject.trim(),
      message: message.trim(),
      priority: priority || aiResult.suggested_priority,
      aiSuggested: !priority, // true if priority came from AI
      aiCategory: aiResult.suggested_category,
    });

    res.status(201).json({
      success: true,
      data: ticket,
      ai: aiResult,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/tickets
const getTickets = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, count: tickets.length, data: tickets });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/tickets/:id
const updateTicketStatus = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ success: false, errors: ['Ticket not found'] });
    }

    res.json({ success: true, data: ticket });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTicket, getTickets, updateTicketStatus };
