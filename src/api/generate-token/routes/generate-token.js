"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/generate-token",
      handler: "generate-token.generate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/generate-token-signup",
      handler: "generate-token.generateSignup",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
