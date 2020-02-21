const router = require('express').Router();

const Users = require('../models/userModel');


router.get('/', (req, res) => {
    Users.findUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;