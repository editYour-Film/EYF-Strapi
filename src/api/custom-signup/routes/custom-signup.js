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
    {
      method: "POST",
      path: "/signup-empty",
      handler: "custom-signup.signupEmpty",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/custom-register",
      handler: "custom-signup.register",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
