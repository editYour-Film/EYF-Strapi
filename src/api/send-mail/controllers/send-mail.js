"use strict";

module.exports = {
  async send(ctx, next) {
    if (ctx.request.body.email && ctx.request.body.email.length > 0) {
      try {
        await strapi.plugins["email"].services.email.send({
          to: ctx.request.body.email,
          from: "contact@edityour.film",
          subject: ctx.request.body.subject,
          text: "Bonjour " + ctx.request.body.email,
        });
        return true;
      } catch {
        return false;
      }
    }
  },
};
