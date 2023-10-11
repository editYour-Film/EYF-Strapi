"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/send-mail",
      handler: "send-mail.send",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
