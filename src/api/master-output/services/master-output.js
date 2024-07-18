'use strict';

/**
 * master-output service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::master-output.master-output');
