'use strict';

/**
 * project-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::project-info.project-info');
