const Event = require('../models/Event');
const Participation = require('../models/Participation');
const User = require('../models/User');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Organization only)
exports.createEvent = async (req, res) => {
  try {
    req.body.organizationId = req.user.id;
    req.body.organizationName = req.user.organizationName;

    const event = await Event.create(req.body);

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Organization only, own event)
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Make sure user is event owner
    if (event.organizationId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this event' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Organization only, own event)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Make sure user is event owner
    if (event.organizationId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    
    // Also delete participations for this event
    await Participation.deleteMany({ eventId: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Join an event
// @route   POST /api/events/:id/join
// @access  Private (Volunteer only)
exports.joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const volunteerId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if already joined
    const existingParticipation = await Participation.findOne({ eventId, volunteerId });
    if (existingParticipation) {
      return res.status(400).json({ success: false, message: 'Already joined this event' });
    }

    const participation = await Participation.create({
      eventId,
      volunteerId
    });

    res.status(201).json({ success: true, data: participation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get participants for an event
// @route   GET /api/events/:id/participants
// @access  Private (Organization only)
exports.getEventParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Must be owner
    if (event.organizationId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const participations = await Participation.find({ eventId: req.params.id }).populate('volunteerId', 'name email phone profileImage');

    const participants = participations.map(p => ({
      ...p.volunteerId.toObject(),
      joinedAt: p.joinedAt
    }));

    res.status(200).json({ success: true, count: participants.length, data: participants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in volunteer's joined events
// @route   GET /api/volunteer/my-events
// @access  Private (Volunteer only)
exports.getVolunteerEvents = async (req, res) => {
  try {
    const participations = await Participation.find({ volunteerId: req.user.id }).populate('eventId');
    
    // Extract events and add joinedAt
    const events = participations.map(p => {
      if(p.eventId) {
        return {
          ...p.eventId.toObject(),
          joinedAt: p.joinedAt
        }
      }
      return null;
    }).filter(e => e !== null);

    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recommended events for logged in volunteer
// @route   GET /api/volunteer/recommendations
// @access  Private (Volunteer only)
exports.getRecommendedEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.interests || user.interests.length === 0) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    // Recommendation logic: find events where 'requiredSkills' has at least one element in 'user.interests'
    const recommendedEvents = await Event.find({
      requiredSkills: { $in: user.interests }
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: recommendedEvents.length, data: recommendedEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
