const db = require('../data/dbConfig');

module.exports = {
    // register,
    addUser,
    findUsers,
    findByName,
    findUserById
}

// function register(user) {
//     return db('users')
//         .insert(user);
// }

function findByName(username) {
    return db('users')
        .select('id', 'username', 'password')
        .where({ username: username });
}

function addUser(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
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