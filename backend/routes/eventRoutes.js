const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  getEventParticipants
} = require('../controllers/eventController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getEvents)
  .post(protect, authorize('organization'), createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('organization'), updateEvent)
  .delete(protect, authorize('organization'), deleteEvent);

router.post('/:id/join', protect, authorize('volunteer'), joinEvent);
router.get('/:id/participants', protect, authorize('organization'), getEventParticipants);

module.exports = router;
