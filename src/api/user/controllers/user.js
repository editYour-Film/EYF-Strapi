"use strict";

module.exports = {
  async checkUsername(ctx, next) {
    if (ctx.request.body.username && ctx.request.body.username.length > 0) {
      // check user
      const userAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({ where: { username: ctx.request.body.username } });

      return userAccount === null;
    }
  },
};
