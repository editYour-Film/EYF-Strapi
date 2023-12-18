'use strict';

/**
 * calculate-invoice custom router
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/invoice/calculate', 
      handler: 'invoice.calculate',
    }
  ]
}