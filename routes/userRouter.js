const router = require('express').Router();

const Users = require('../models/userModel');
const restrict = require('../middleware/restrict');
const roleCheck = require('../middleware/roleCheck');


router.get('/', restrict, roleCheck, (req, res) => {
    Users.findUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;