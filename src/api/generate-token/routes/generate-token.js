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
  ],
};
