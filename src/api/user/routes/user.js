"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/check-username",
      handler: "user.checkUsername",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/validate-user-by-code",
      handler: "user.validateUserByCode",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
