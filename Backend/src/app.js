const express = require('express');
const cookiesParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookiesParser());




// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true // Allow cookies to be sent
}))

// require all the routes here
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')
// use the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);





// TO export the app for testing purposes
module.exports = app;