'use strict';

/**
 * Invoice controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::invoice.invoice", ({ strapi }) => ({
  async calculate(ctx) {
    if (ctx.request.body.total_min && ctx.request.body.complexity) {
      return 200;
    }
    return 400;
  },
}));
