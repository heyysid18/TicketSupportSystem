const express = require('express');
const router = express.Router();
const { createTicket, getTickets, updateTicketStatus } = require('../controllers/ticket.controller');
const { validateCreateTicket, validateUpdateTicket } = require('../middleware/validate');

router.post('/', validateCreateTicket, createTicket);
router.get('/', getTickets);
router.patch('/:id', validateUpdateTicket, updateTicketStatus);

module.exports = router;
