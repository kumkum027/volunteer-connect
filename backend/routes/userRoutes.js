const express = require('express');
const { getMe, updateDetails } = require('../controllers/authController');
const { getVolunteerEvents, getRecommendedEvents } = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

// Volunteer routes (prefixed with /api/volunteer in server.js)
router.get('/profile', authorize('volunteer', 'organization'), getMe);
router.put('/profile', authorize('volunteer', 'organization'), updateDetails);

// Only for volunteers
router.get('/my-events', authorize('volunteer'), getVolunteerEvents);
router.get('/recommendations', authorize('volunteer'), getRecommendedEvents);

module.exports = router;
