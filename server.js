// Import secret to use for JWT
const secret = require('./config/secrets')
// User must create a config folder containing a file 

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

// Alive messages
server.get('/', (req, res) => {
    res.send(`<h2>jeffreyo3's server is alive</h2>`);
});
server.get('/api', (req, res) => {
    res.send(`<h2>jeffreyo3's api server is alive</h2>`);
});

server.get('/token', (req, res) => {
    const tokenPayload = {
        username: "jeffreyo3",
        game: "RocketLeague"
    };

    const options = {
        expiresIn: "2h"
    };

    const token = jwt.sign(tokenPayload, secret, options);

    res.json(token);
});

module.exports = server;