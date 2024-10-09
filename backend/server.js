const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection URL with your database name "test"
const mongoURL = 'mongodb+srv://ahmedfalahalharbi:dB7i57y5aYDUpj8P@cluster0.a9e42.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define the schema for your collection "test1"
const test1Schema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create a model based on the "test1" collection
const Test1 = mongoose.model('test1', test1Schema);

// Insert a sample document to create the database and collection
app.post('/create-database', async (req, res) => {
  try {
    // Create a sample document for the "test1" collection
    const sampleData = new Test1({
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 28
    });

    // Save the document to the collection
    await sampleData.save();
    res.status(201).send('Database "test" and collection "test1" created with sample data!');
  } catch (error) {
    res.status(500).send('Error creating database or collection');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
