"use strict";

module.exports = {
  async send(ctx, next) {
    if (ctx.request.body.email && ctx.request.body.email.length > 0) {
      try {
        await strapi.plugins["email"].services.email.send({
          to: ctx.request.body.email,
          from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
          subject: ctx.request.body.subject,
          text: ctx.request.body.text,
        });
        return true;
      } catch {
        return false;
      }
    }
  },
};
