module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env(
    "PUBLIC_URL",
    "https://1b48b31f-5be7-4ddd-a28d-1d70627c1cfe.pub.instances.scw.cloud"
  ),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
