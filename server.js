const express = require('express');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();
const Users = require('./data/models/userModel')

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());


// Alive messages
server.get('/', (req, res) => {
    res.send(`<h2>jeffreyo3's server is alive</h2>`);
});
server.get('/api', (req, res) => {
    res.send(`<h2>jeffreyo3's api server is alive</h2>`);
});


module.exports = server;