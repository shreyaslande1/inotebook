require('dotenv').config();

const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get("/", (req, res) => {
    res.json({ message: "Backend working 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});