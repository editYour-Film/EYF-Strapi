const crypto = require("crypto");

module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET") || crypto.randomBytes(16).toString("base64"),
    },
  },
  seo: {
    enabled: true,
  },
  /*upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },*/

  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("SCALEWAY_ACCESS_KEY"),
        secretAccessKey: env("SCALEWAY_SECRET_KEY"),
        endpoint: env("SCALEWAY_ENDPOINT"), // e.g. "s3.fr-par.scw.cloud"
        params: {
          Bucket: env("SCALEWAY_BUCKET"),
        },
      },
    },
  },

  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "contact@edityour.film",
        defaultReplyTo: "contact@edityour.film",
        testAddress: "contact@edityour.film",
      },
    },
  },
});
