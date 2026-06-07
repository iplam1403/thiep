const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guest', GuestSchema);
