'use strict';

/**
 * notification router
 */


module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/notification/global', 
        handler: 'custom-notification.postGlobal',
      }
    ]
  }