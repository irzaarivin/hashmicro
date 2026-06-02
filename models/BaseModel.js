'use strict';

const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const sequelize = db.getConnection();

class BaseModel extends Model {

  static getLabel() {
    return this.name;
  }

  static getDisplayFields() {
    return [];
  }

  formatDate(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getDisplayName() {
    return `Record #${this.id}`;
  }
}

module.exports = { BaseModel, sequelize, DataTypes };
