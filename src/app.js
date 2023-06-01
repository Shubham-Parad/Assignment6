const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Import routes
const blogRoute = require('./routes/blog');

//connect to DB
mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://shubhamparad19:Uf0MLs0bKe9w9kyX@cluster0.uwhtkg2.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

//Router MIddlewares
app.use(express.json());
app.use('/blog', blogRoute);

module.exports = app;
