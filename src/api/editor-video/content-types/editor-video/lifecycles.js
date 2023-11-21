'use strict';

module.exports = {
  async afterCreate(event) {
    const { result, params: { data } } = event;

    await strapi.plugins["email"].services.email.send({
      to: process.env.STRAPI_ADMIN_EMAIL_RECEIVER,
      from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
      subject: "Nouveau modèle ajouté",
      text: "Un nouveau modèle a été ajouté",
    });
  },
  async beforeUpdate(event) {
    const params = event.params;
  
    const { id } = params.where;
    const previousData = await strapi.entityService.findOne('api::editor-video.editor-video', id, {
        populate: '*'
    })

    const previousApprove = previousData.approved;
    const currentApprove = params.data.approved;

    if (!previousApprove && currentApprove) {
      const user = await strapi.entityService.findOne('api::user-info.user-info', previousData.user_info.id, {
        populate: '*'
      })

      await strapi.plugins["email"].services.email.send({
        to: user.user_account.email,
        from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
        subject: "Votre modèle a été publié",
        text: user.user_account.username + "\nVotre modèle a été publié",
      });
    }
  }
}
