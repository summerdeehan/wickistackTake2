const db = require("./db");
const Sequelize = require('sequelize');

const Page = db.define('page', {
    title: {
      type: Sequelize.STRING, allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT, allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  });

  Page.beforeValidate = (page) =>  {
    console.log("testing hook");
    if (!page.slug) page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  }

  module.exports = Page;