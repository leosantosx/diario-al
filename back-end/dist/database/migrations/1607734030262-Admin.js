"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin1607734030262 = undefined;

var _typeorm = require("typeorm");

class Admin1607734030262 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'admin',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        default: 'uuid_generate_v4()'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'code',
        type: 'varchar'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('admin');
  }

}

exports.Admin1607734030262 = Admin1607734030262;