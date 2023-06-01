const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Import routes
const blogRoute = require('./routes/blog');

//connect to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

//Router MIddlewares
app.use(express.json());
app.use('/blog', blogRoute);

module.exports = app;
