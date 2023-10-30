'use strict';

module.exports = {
  async afterCreate(event) {
    const { result, params: { data } } = event;
    let userInfos = [];

    if (data.type === "everyone") {
        userInfos = await strapi.entityService.findMany('api::user-info.user-info')
    } else if (data.type === "all-editor") {
      const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: {
          role: {
            name: 'editor',
          },
        },
        populate: ['role']
      });
      const userIds = users.map(users => users.id);

      userInfos = await strapi.entityService.findMany('api::user-info.user-info', {
        filters: {
          user_account: {
            id: userIds,
          },
        }
      })
    }

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
