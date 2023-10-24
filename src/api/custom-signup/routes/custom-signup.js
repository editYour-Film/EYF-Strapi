"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/custom-signup",
      handler: "custom-signup.signup",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
