const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${'http://localhost:'}${PORT}`));
