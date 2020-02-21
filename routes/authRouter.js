const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import secret to use for JWT
const secret = require('../config/secrets')
// User must create a config folder containing a file 
// secrets.js must contain an object with the secret key titled jwtSecret

const Users = require('../models/userModel');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.addUser(user)
        .then(saved => {
            const token = getToken(saved);
            res.status(201).json({ user: saved, token: token })
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findUserByName({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = getToken(user);
                res.status(200).json({ username: user.username, token: token })
            } else {
                res.status(401).json({ message: "Invalid Access Credentials" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function getToken(user) {
    const tokenPayload = {
        userid: user.id,
        username: user.username,
        roles: ["Student"]
    };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(tokenPayload, secrets.jwtSecret, options);

    return token;
}

module.exports = router;