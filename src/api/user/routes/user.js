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
  ],
};
