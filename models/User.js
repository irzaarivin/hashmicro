'use strict';

const bcrypt = require('bcryptjs');
const { BaseModel, sequelize, DataTypes } = require('./BaseModel');

class User extends BaseModel {
  static getLabel() {
    return 'User';
  }

  getDisplayName() {
    return this.username || `User #${this.id}`;
  }

  async verifyPassword(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  }

  static async hashPassword(plainPassword) {
    const SALT_ROUNDS = 10;
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Username tidak boleh kosong' },
        len: { args: [3, 80], msg: 'Username minimal 3 karakter' },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Format email tidak valid' },
        notEmpty: { msg: 'Email tidak boleh kosong' },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password tidak boleh kosong' },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: { exclude: [] },
    },
  }
);

module.exports = User;
