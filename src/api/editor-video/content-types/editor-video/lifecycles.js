'use strict';

module.exports = {
  async afterCreate(event) {
    const { result, params: { data } } = event;

    await strapi.plugins["email"].services.email.send({
    to: "admin@edityour.film",
    from: process.env.STRAPI_ADMIN_EMAIL_SENDER,
    subject: "Nouveau modèle ajouté",
    text: "Un nouveau modèle a été ajouté",
    });
  }
}
