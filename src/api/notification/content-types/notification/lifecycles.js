'use strict';

module.exports = {
  async afterCreate(event) {
  const { result, params: { data } } = event;

  if (data.type === "everyone") {
      const userInfos = await strapi.entityService.findMany('api::user-info.user-info')

      if (userInfos.length > 0) {
        const userInfosIds = userInfos.map(userInfo => userInfo.id);
  
        await strapi.query('api::notification.notification').update({
          where: { id: result.id },
          data: {
            user: userInfosIds
          }
        });
      }
    }
  }
}
