'use strict';

/**
 * pre-signup-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pre-signup-user.pre-signup-user');
