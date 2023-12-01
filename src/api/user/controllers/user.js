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

  async validateUserByCode(ctx, next) {
    const noExpire = ctx.request.body.noExpire;

    if (ctx.request.body.code && ctx.request.body.code.length > 0) {
      // check user
      const userAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          populate: true,
          where: { customConfirmationToken: ctx.request.body.code },
        });

      if (userAccount) {
        const date = Date.parse(new Date());
        const tokenExpire = Date.parse(userAccount.expire);
        if (noExpire || date < tokenExpire) {
          const userInfo = await strapi.db
            .query("api::user-info.user-info")
            .findOne({
              populate: true,
              where: {
                user_account: userAccount.id,
              },
            });

          if (userInfo) {
            userInfo.user_account = undefined;
            userInfo.editor_videos = undefined;

            const editorVideo = await strapi.db
              .query("api::editor-video.editor-video")
              .findMany({
                populate: true,
                where: {
                  user_info: userInfo.id,
                },
              });

            if (editorVideo)
              editorVideo.map((x) => {
                x.user_info = undefined;
              });

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
                code: userAccount.customConfirmationToken,
              },
              details: userInfo,
              models: editorVideo,
            };
          } else return "account details not found";
        } else return "token expired";
      } else return "account not found";
    }
  },
};
