import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import nodemailer from 'nodemailer'; // Import nodemailer
import { body, validationResult } from 'express-validator';

// Initialize dotenv for environment variables
// dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads folder

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventEaseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kavinpradheep2005@gmail.com', // Your Gmail address
    pass: 'qkvk qhym drns htud', // Your Gmail password or App password
  },
});

// Subscription API route
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Define the email content
    const mailOptions = {
      from: '"EventEase" <kavinpradheep2005@gmail.com>',
      to: email,
      subject: 'Welcome to EventEase!',
      text: 'Thank you for subscribing to EventEase! Stay tuned for upcoming events and updates.',
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Subscription successful! Email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Admin schema
const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

// Admin login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Signup route with validation
app.post(
  '/api/signup',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

// Event schema
const eventSchema = new mongoose.Schema({
  collegeName: String,
  eventDate: Date,
  gformLink: String,
  registrationOpen: Date,
  registrationClose: Date,
  eventPoster: String, // Store the file path as a string
  description: String,  // Short description
  detailedInfo: String,  // Detailed information about the event
  eventName: String,  // Main Event Name (New field)
  webinarLink: String, // Webinar Link (New field)
  events: [
    {
      eventName: String, // Sub-events (typeOfEvent equivalent)
    },
  ],
  contacts: [
    {
      contactName: String,
      contactNumber: String, // Will be used to display contact details on frontend
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

// Locked Dates Schema
const lockedDateSchema = new mongoose.Schema({
  hallName: String,
  date: Date,
});

const LockedDate = mongoose.model('LockedDate', lockedDateSchema);

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

// Fetch locked dates route
app.get('/api/lockeddates', async (req, res) => {
  try {
    const lockedDates = await LockedDate.find(); // Fetch locked dates from the database
    res.status(200).json(lockedDates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch event details by ID route
app.get('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Event registration route
app.post('/api/registerEvent', upload.single('eventPoster'), async (req, res) => {
  const {
    collegeName,
    eventDate,
    gformLink,
    registrationOpen,
    registrationClose,
    description,
    detailedInfo,
    eventName,
    webinarLink,
    events,
    contacts,
  } = req.body;

  const eventPoster = req.file ? req.file.path : ''; // Ensure eventPoster is uploaded

  try {
    const newEvent = new Event({
      collegeName,
      eventDate,
      gformLink,
      registrationOpen,
      registrationClose,
      eventPoster,
      description,
      detailedInfo,
      eventName,
      webinarLink,
      events: JSON.parse(events),
      contacts: JSON.parse(contacts),
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Lock event dates route
app.post('/api/lockeddates', async (req, res) => {
  const { hallName, date } = req.body;

  try {
    // Check if the date is already locked
    const alreadyLocked = await LockedDate.findOne({ hallName, date: new Date(date) });
    if (alreadyLocked) {
      return res.status(400).json({ message: 'Date already locked for this hall' });
    }

    // Lock the date
    const lockedDate = new LockedDate({ hallName, date: new Date(date) });
    await lockedDate.save();
    res.status(200).json({ message: 'Date locked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
