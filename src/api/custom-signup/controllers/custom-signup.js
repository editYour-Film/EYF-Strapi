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
            const userAccount = await strapi.db
              .query("plugin::users-permissions.user")
              .create({
                data: {
                  customConfirmationToken: ctx.request.body.token,
                  expire: tempUserAccount.expire,
                  email: tempUserAccount.email.toLowerCase(),
                  username: tempUserAccount.email.toLowerCase(),
                  role: tempUserAccount.role,
                },
              });
            if (userAccount) {
              // delete temp user
              await strapi.db
                .query("api::pre-signup-user.pre-signup-user")
                .delete({
                  where: { id: tempUserAccount.id },
                });
              return true;
            } else return "error when creating account";
          } else return "token expired";
        }
      } else return "account not found";
    }
  },
};
