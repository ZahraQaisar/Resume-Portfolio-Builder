const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Enable CORS properly
app.use(
  cors({
    origin: 'http://localhost:5173',         // frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'], // allow your auth header
    credentials: true,                       // allow auth headers/cookies
  })
);

// Parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/payment', require('./routes/payment'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
