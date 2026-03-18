const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/ticket.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        db: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});

app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);

module.exports = app;
