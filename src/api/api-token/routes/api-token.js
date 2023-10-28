"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/api-token/:role",
      handler: "api-token.get",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
