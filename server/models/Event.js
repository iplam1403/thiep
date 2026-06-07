const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventType: { type: String, default: 'graduation' }, // graduation, birthday
  hostName: String,
  universityName: String, // Or Party Theme
  universitySubName: String, // Or Age
  universityLogo: String, // Or Icon
  title: { type: String, default: 'GRADUATION' },
  subtitle: { type: String, default: 'Ceremony' },
  timeLine1: String,
  timeLine2: String,
  timeLine3: String,
  locationLine1: String,
  locationLine2: String,
  footerMessage: String,
  templateId: { type: String, default: 'template1' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
