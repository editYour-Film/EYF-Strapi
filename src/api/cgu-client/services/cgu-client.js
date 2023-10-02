'use strict';

/**
 * cgu-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cgu-client.cgu-client');
