const db = require('../data/dbConfig');

module.exports = {
    addUser,
    findUsers,
    findByName,
    findUserById
}


function findByName(username) {
    return db('users')
        .select('id', 'username', 'password')
        .where({ username: username });
}

async function addUser(user) {
    const [id] = await db('users').insert(user);

    return findUserById(id);
}

function findUsers() {
    return db('users')
        .select('id', 'username');
}

function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
}