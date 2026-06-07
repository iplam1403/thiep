require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Event = require('./models/Event');
const Guest = require('./models/Guest');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Auth - Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });
    const user = new User({ username, password });
    const saved = await user.save();
    res.json({ _id: saved._id, username: saved.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User Events
app.get('/api/users/:userId/events', async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Event
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Event
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Event
app.put('/api/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Guest
app.post('/api/guests', async (req, res) => {
  try {
    const newGuest = new Guest(req.body);
    const savedGuest = await newGuest.save();
    res.json(savedGuest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Guest
app.put('/api/guests/:id', async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGuest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Guest (with Event info)
app.get('/api/guests/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).populate('eventId');
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Guests by Event
app.get('/api/events/:id/guests', async (req, res) => {
  try {
    const guests = await Guest.find({ eventId: req.params.id }).sort({ createdAt: -1 });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
