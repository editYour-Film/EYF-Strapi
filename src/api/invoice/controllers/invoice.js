'use strict';

/**
 * Invoice controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::invoice.invoice", ({ strapi }) => ({
  async calculate(ctx) {
    if (ctx.request.body.objective_min && ctx.request.body.rushes_min && ctx.request.body.complexity) {
      // check rushes total >= 5 times objective
      if (ctx.request.body.rushes_min < 5 * ctx.request.body.objective_min) {
        return { error: "Rushes total must be greater than or equal to 5 times the objective minimum." };
      }

      // check complexity value
      let complex = 0;
      if (ctx.request.body.complexity === "basic") {
        complex = 1;
      } else if (ctx.request.body.complexity === "medium") {
        complex = 1.125;
      } else if (ctx.request.body.complexity === "complex") {
        complex = 1.25;
      } else {
        return { error: "Invalid complexity. Must be 'basic', 'medium' or 'complex'" };
      }
      const { data, meta } = await super.find(ctx);

      //logarithme formula = 0.041 * ln(1253 * rushes_min - 980) + 0.78
      const logarithme = 0.041 * Math.log(1253 * ctx.request.body.rushes_min - 980) + 0.78;

      // rushes total minutes * daily price * complexity * logarithme formula * 1.2 (taxes) * 1.2 (margin) * 1.2 (TVA)
      const total = ctx.request.body.objective_min * data.attributes.daily_price * complex * logarithme * 1.2 * 1.2 * 1.2;

      const roundedTotal = Math.round(total);

      return { total: roundedTotal };
    }
    return { error: "Invalid request parameters." };
  },
}));
