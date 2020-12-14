"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.News1607013977291 = void 0;

var _typeorm = require("typeorm");

class News1607013977291 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'news',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        default: 'uuid_generate_v4()'
      }, {
        name: 'images',
        type: 'json',
        isNullable: true
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'content',
        type: 'varchar'
      }, {
        name: 'slug',
        type: 'varchar'
      }, {
        name: 'date',
        type: 'varchar'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('news');
  }

}

exports.News1607013977291 = News1607013977291;