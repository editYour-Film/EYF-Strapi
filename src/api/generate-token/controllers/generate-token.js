"use strict";

const expireTime = () => {
  const date = new Date();
  // expire after one hour
  date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
  return date;
};

// generate random 6 digits
const generateToken = () => {
  const characters = "123456789EDY";
  const codeLength = 6;
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

module.exports = {
  async generate(ctx, next) {
    const token = generateToken();

    if (ctx.request.body.email && ctx.request.body.email.length > 0) {
      // check user
      const userAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({ where: { email: ctx.request.body.email } });

      if (userAccount) {
        const updateQuery = await strapi.db
          .query("plugin::users-permissions.user")
          .update({
            where: { email: ctx.request.body.email },
            data: {
              customConfirmationToken: token,
              expire: expireTime(),
            },
          });

        if (updateQuery) {
          if (
            ctx.request.body.sendEmail != undefined &&
            ctx.request.body.sendEmail === false
          )
            return true;
          else {
            try {
              await strapi.plugins["email"].services.email.send({
                to: ctx.request.body.email,
                from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
                subject: "Code de vérification de votre email",
                text: "votre code de vérification est " + token,
              });
              return true;
            } catch {
              return "email not sent";
            }
          }
        }
      } else return "email not found";
    }
  },

  async generateSignup(ctx, next) {
    const token = generateToken();

    if (ctx.request.body.email && ctx.request.body.email.length > 0) {
      // check user
      const userAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({ where: { email: ctx.request.body.email } });

      if (!userAccount) {
        // check if temp user
        const tempUserAccount = await strapi.db
          .query("api::pre-signup-user.pre-signup-user")
          .findOne({ where: { email: ctx.request.body.email } });

        // if temp user exists => update temp user
        if (tempUserAccount) {
          // update temporary user
          const updateQuery = await strapi.db
            .query("api::pre-signup-user.pre-signup-user")
            .update({
              where: { email: ctx.request.body.email },
              data: {
                token: token,
                expire: expireTime(),
              },
            });

          if (updateQuery) {
            try {
              await strapi.plugins["email"].services.email.send({
                to: ctx.request.body.email,
                from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
                subject: "Code de vérification de votre email",
                text: "votre code de vérification est " + token,
              });
              return true;
            } catch {
              return "email not sent";
            }
          }
        } else {
          // add to a temporary stored users
          const createQuery = await strapi.db
            .query("api::pre-signup-user.pre-signup-user")
            .create({
              data: {
                token: token,
                expire: expireTime(),
                email: ctx.request.body.email,
                role: ctx.request.body.role,
              },
            });

          if (createQuery) {
            try {
              await strapi.plugins["email"].services.email.send({
                to: ctx.request.body.email,
                from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
                subject: "Code de vérification de votre email",
                text: "votre code de vérification est " + token,
              });
              return true;
            } catch {
              return "email not sent";
            }
          }
        }
      } else return "already exist";
    }
  },
};
