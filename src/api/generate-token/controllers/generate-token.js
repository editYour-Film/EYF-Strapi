"use strict";

module.exports = {
  async generate(ctx, next) {
    const expireTime = () => {
      const date = new Date();
      // expire after one hour
      date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
      return date;
    };

    if (ctx.request.body.email && ctx.request.body.email.length > 0) {
      // check user
      const userAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({ where: { email: ctx.request.body.email } });

      if (userAccount) {
        // generate random 6 digits
        const characters = "123456789EYF";
        const codeLength = 6;
        let code = "";

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }

        const token = String(code);

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
      } else return "email not found";
    }
  },
};
