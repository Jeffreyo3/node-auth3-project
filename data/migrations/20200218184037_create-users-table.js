
exports.up = function (knex) {
    return (
        knex.schema.createTable('users', tbl => {
            tbl.increments()
            tbl.string('username', 20)
                .notNullable()
                .unique();
            tbl.string('password', 128)
                .notNullable();
            tbl.string('role', 255)
                .notNullable();
        })
    )
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
