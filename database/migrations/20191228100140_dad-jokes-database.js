exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();

      tbl
        .string("username", 255)
        .notNullable()
        .unique();
      tbl
        .string("email", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
    })

    .createTable("jokes", tbl => {
      tbl.increments();

      tbl.string("question", 255).notNullable();
      tbl.string("answer", 255).notNullable();
      tbl.boolean("private", false).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("jokes").dropTableIfExists("users");
};
