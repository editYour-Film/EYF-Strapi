'use strict';

/**
 * notification router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::notification.notification');

// const defaultRouter = createCoreRouter('api::notification.notification');

// const customRouter = (innerRouter, extraRoutes = []) => {
//   let routes;
//   return {
//     get prefix() {
//       return innerRouter.prefix;
//     },
//     get routes() {
//       if (!routes) routes = innerRouter.routes.concat(extraRoutes);
//       return routes;
//     },
//   };
// };

// const myExtraRoutes = [
//   {
//     method: 'POST',
//     path: '/notifications/global',
//     handler: 'notification.postGlobal',
//   },
// ];

// module.exports = customRouter(defaultRouter, myExtraRoutes);