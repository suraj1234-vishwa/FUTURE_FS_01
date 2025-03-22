// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API to handle contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).send({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send message' });
    }
});

// API to fetch all contact messages (optional)
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching messages' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
