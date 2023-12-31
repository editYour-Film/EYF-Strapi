module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT"),
    connection: {
      host: env("DATABASE_HOST"),
      port: env("DATABASE_PORT"),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USER"),
      password: env("DATABASE_PWD"),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});
