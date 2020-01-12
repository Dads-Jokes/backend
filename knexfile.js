// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/dadjokesdb",
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
    // pool: {
    //   afterCreate: function(connection, done) {
    //     connection.run("PRAGMA foreign_keys = ON", done);
    //   }
  },

  test: {
    client: "pg",
    connection: "postgres://localhost/dadjokesdb",
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
    // pool: {
    //   afterCreate: function(connection, done) {
    //     connection.run("PRAGMA foreign_keys = ON", done);
    //   }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
