"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/custom-signin",
      handler: "custom-signin.signin",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
