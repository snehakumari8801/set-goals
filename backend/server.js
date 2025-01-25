const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const userGoals = require('./routes/goals')

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);
//app.use('/api', userRoutes);

app.use('/api/auth', userRoutes);
app.use('/api/goal', userGoals);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
