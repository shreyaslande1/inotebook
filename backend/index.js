const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 5000;

// Middleware to read JSON
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});