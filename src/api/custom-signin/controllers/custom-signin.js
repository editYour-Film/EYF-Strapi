"use strict";

module.exports = {
  async signin(ctx, next) {
    if (
      ctx.request.body.email &&
      ctx.request.body.token &&
      ctx.request.body.email.length > 0 &&
      ctx.request.body.token.length > 0
    ) {
      // check user
      const userAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          populate: true,
          where: {
            email: ctx.request.body.email,
          },
        });

      if (userAccount) {
        if (userAccount.customConfirmationToken !== ctx.request.body.token)
          return "code not valid";
        else {
          const date = Date.parse(new Date());
          const tokenExpire = Date.parse(userAccount.expire);
          if (date < tokenExpire) {
            const userInfo = await strapi.db
              .query("api::user-info.user-info")
              .findOne({
                populate: true,
                where: {
                  user_account: userAccount.id,
                },
              });
            if (userInfo) userInfo.user_account = undefined;

            return {
              jwt:
                userAccount.role.type === "editor"
                  ? process.env.STRAPI_ADMIN_API_EDITOR_TOKEN_SALT
                  : process.env.STRAPI_ADMIN_API_CREATOR_TOKEN_SALT,
              user: {
                createdAt: userAccount.createdAt,
                email: userAccount.email,
                id: userAccount.id,
                username: userAccount.username,
                role: userAccount.role,
              },
              details: userInfo,
              models: userInfo.editor_videos,
            };
          } else return "token expired";
        }
      } else return "account not found";
    }
  },
};
