const mongoose = require('mongoose');

const ParticipationSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent volunteer from joining the same event twice
ParticipationSchema.index({ volunteerId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Participation', ParticipationSchema);
