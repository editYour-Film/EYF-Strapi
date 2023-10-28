"use strict";

module.exports = {
  async get(ctx, next) {
    console.log(ctx.params.role);
    if (ctx.params.role) {
      return ctx.params.role === "editor"
        ? process.env.STRAPI_ADMIN_API_EDITOR_TOKEN_SALT
        : STRAPI_ADMIN_API_CREATOR_TOKEN_SALT;
    }
  },
};
