"use strict";

module.exports = {
  async signup(ctx, next) {
    if (
      ctx.request.body.email &&
      ctx.request.body.token &&
      ctx.request.body.email.length > 0 &&
      ctx.request.body.token.length > 0
    ) {
      // check temp user
      const tempUserAccount = await strapi.db
        .query("api::pre-signup-user.pre-signup-user")
        .findOne({
          populate: true,
          where: {
            email: ctx.request.body.email.toLowerCase(),
          },
        });

      if (tempUserAccount) {
        // check token
        if (tempUserAccount.token !== ctx.request.body.token)
          return "code not valid";
        else {
          const date = Date.parse(new Date());
          const tokenExpire = Date.parse(tempUserAccount.expire);
          // check token validity
          if (date < tokenExpire) {
            // create user
            const createUserAccount = await strapi.db
              .query("plugin::users-permissions.user")
              .create({
                data: {
                  customConfirmationToken: ctx.request.body.token,
                  expire: tempUserAccount.expire,
                  email: tempUserAccount.email.toLowerCase(),
                  username: tempUserAccount.email.toLowerCase(),
                  role: tempUserAccount.role,
                  confirmed: true,
                },
              });
            if (createUserAccount) {
              // delete temp user
              await strapi.db
                .query("api::pre-signup-user.pre-signup-user")
                .delete({
                  where: { id: tempUserAccount.id },
                });

              // create user info account
              const createUserInfoAccount = await strapi.db
                .query("api::user-info.user-info")
                .create({
                  data: {
                    f_name: "",
                    l_name: "",
                    user_account: createUserAccount.id,
                  },
                });

              if (createUserInfoAccount) return true;
              else return "error when creating account";
            } else return "error when creating account";
          } else return "token expired";
        }
      } else return "account not found";
    }
  },

  async signupEmpty(ctx, next) {
    if (ctx.request.body.accountId) {
      // create user info account
      const createUserInfoAccount = await strapi.db
        .query("api::user-info.user-info")
        .create({
          data: {
            f_name: "",
            l_name: "",
            user_account: ctx.request.body.accountId,
          },
        });

      if (createUserInfoAccount) return true;
      else return "error when creating account";
    }
  },

  async register(ctx, next) {
    if (ctx.request.body.email && ctx.request.body.email.length > 0) {
      // update user
      const updateAccount = await strapi.db
        .query("plugin::users-permissions.user")
        .update({
          populate: true,
          where: { email: ctx.request.body.email.toLowerCase() },
          data: {
            username: ctx.request.body.username,
          },
        });

      if (updateAccount) {
        const updateAccountInfo = await strapi.db
          .query("api::user-info.user-info")
          .update({
            populate: true,
            where: { user_account: updateAccount.id },
            data: {
              f_name: ctx.request.body.f_name,
              l_name: ctx.request.body.l_name,
              bio: ctx.request.body.description,
              languages: ctx.request.body["languages[]"],
              skills: ctx.request.body["skills[]"],
            },
          });

        if (updateAccountInfo) {
          if (updateAccountInfo) updateAccountInfo.user_account = undefined;
          return {
            jwt:
              updateAccount.role.type === "editor"
                ? process.env.STRAPI_ADMIN_API_EDITOR_TOKEN_SALT
                : process.env.STRAPI_ADMIN_API_CREATOR_TOKEN_SALT,
            user: {
              createdAt: updateAccount.createdAt,
              email: updateAccount.email,
              id: updateAccount.id,
              username: updateAccount.username,
              role: updateAccount.role,
            },
            details: updateAccountInfo,
          };
        } else return "error when updating account";
      } else return "error when updating account";
    }
  },
};
