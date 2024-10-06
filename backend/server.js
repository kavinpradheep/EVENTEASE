const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Firebase Admin SDK Initialization
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your service account file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Example Google Sign-In route
app.post('/api/google-signin', async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ message: 'User authenticated', uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const serviceAccount = require('./config/serviceAccountKey.json'); // Update the path accordingly
const serviceAccount = require('./serviceAccountKey.json');
