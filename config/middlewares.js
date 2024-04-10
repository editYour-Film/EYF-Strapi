module.exports = [
  "strapi::errors",
  { resolve: "./src/middlewares/admin-redirect" },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "*"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "edityourfilm.s3.fr-par.scw.cloud",
            "*",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "edityourfilm.s3.fr-par.scw.cloud",
            "*",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      multipart: true,
      formLimit: 10737418240,
      jsonLimit: 10737418240,
      textLimit: 10737418240,
      formidable: {
        maxFileSize: 10737418240, // limit of uploaded file size (10gb)
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
