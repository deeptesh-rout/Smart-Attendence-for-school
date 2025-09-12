const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticateToken, authorize(['admin']), createEvent);
router.get('/all', authenticateToken, authorize(['admin']), getAllEvents);
router.get('/:id', authenticateToken, authorize(['admin']), getEventById);
router.put('/:id', authenticateToken, authorize(['admin']), updateEvent);
router.delete('/:id', authenticateToken, authorize(['admin']), deleteEvent);

module.exports = router;