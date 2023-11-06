'use strict';

/**
 * notification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification');

// module.exports = createCoreController('api::notification.notification', ({strapi}) => ({
//     async postGlobal(ctx, next) {
//         return true
//     },
// }));
