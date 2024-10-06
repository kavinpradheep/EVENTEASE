import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends the original file extension
  },
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventEaseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Event schema
const eventSchema = new mongoose.Schema({
  collegeName: String,
  eventDate: Date,
  gformLink: String,
  registrationOpen: Date,
  registrationClose: Date,
  eventPoster: String, // Store file path as a string
  events: [
    {
      eventName: String,
    },
  ],
  contacts: [
    {
      contactName: String,
      contactNumber: String,
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

// Fetch all events route
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Event registration route
app.post('/api/registerEvent', upload.single('eventPoster'), async (req, res) => {
  const { collegeName, eventDate, gformLink, registrationOpen, registrationClose, events, contacts } = req.body;
  const eventPoster = req.file ? req.file.path : '';

  try {
    const newEvent = new Event({
      collegeName,
      eventDate,
      gformLink,
      registrationOpen,
      registrationClose,
      eventPoster, 
      events: JSON.parse(events), // Parse JSON data sent from frontend
      contacts: JSON.parse(contacts),
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
