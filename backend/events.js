import express from 'express';
import Event from '../models/Event.js'; // Ensure you create an Event model

const router = express.Router();

// Fetch all events route
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Event registration route
router.post('/register', async (req, res) => {
  const { collegeName, eventName, eventDate, gformLink, registrationOpen, registrationClose } = req.body;

  try {
    const newEvent = new Event({
      collegeName,
      eventName,
      eventDate,
      gformLink,
      registrationOpen,
      registrationClose,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
