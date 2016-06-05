'use strict';
const db = require('../lib/db');
const Sequelize = require('sequelize');
const validatePassword = require('../lib/validate-password');

const User = db.define('user', {
  role_id: Sequelize.INTEGER,
  email: Sequelize.STRING(120),
  username: Sequelize.STRING(30),
  password_hash: Sequelize.STRING(40),
  reset_hash: Sequelize.STRING(40),
  salt: Sequelize.STRING(7),
  last_login: Sequelize.DATE,
  last_ip: Sequelize.STRING(40),
  created_on: Sequelize.DATE,
  deleted: Sequelize.BOOLEAN,
  banned: Sequelize.BOOLEAN,
  ban_message: Sequelize.STRING(255),
  reset_by: Sequelize.INTEGER,
  display_name: Sequelize.STRING(255),
  display_name_changed: Sequelize.DATE,
  timezone: Sequelize.CHAR(4),
  language: Sequelize.STRING(20),
  active: Sequelize.BOOLEAN,
  activate_hash: Sequelize.STRING(40)
}, {
  timestamps: false,
  tableName: 'bf_users',
  instanceMethods: {
    validPassword: function(pass) {
      return validatePassword(this, pass);
    }
  }
});

module.exports = User;