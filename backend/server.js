import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads folder

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Name file with timestamp and its original extension
  },
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventEaseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin schema
const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kavinpradheep2005@gmail.com', // Your email address
    pass: 'ihnc qgwq srgz djfn', // Your app password (replace with actual password)
  },
});

// Email subscription route
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Sending confirmation email
    const mailOptions = {
      from: '"EVENTEASE" <kavinpradheep2005@gmail.com>', // Sender name and email
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to EventEase!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending confirmation email' });
      } else {
        res.status(200).json({ message: 'Subscription successful, confirmation email sent' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
