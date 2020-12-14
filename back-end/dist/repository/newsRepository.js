"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _class;

var _typeorm = require("typeorm");

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _News = require("../models/News");

var _News2 = _interopRequireDefault(_News);

var _ErrorHandler = require("../errors/ErrorHandler");

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

let NewsRepository = (_dec = (0, _typeorm.EntityRepository)(_News2.default), _dec(_class = class NewsRepository extends _typeorm.Repository {
  async getPage({
    pageId
  }) {
    const [news, total] = await this.findAndCount({
      skip: (pageId - 1) * 10,
      take: 10
    });
    return {
      news,
      count: total
    };
  }

  async deleteNews({
    id
  }) {
    const news = await this.findOne({
      where: {
        id
      }
    });

    if (!news) {
      throw new _ErrorHandler2.default('News not found');
    }

    const imagesKeys = this.getKeysImages(news.images);
    this.deleteImageS3(imagesKeys);
    await this.remove(news);
    return {
      status: 'Ok'
    };
  }

  getKeysImages(images) {
    const imagesKeys = [];
    images.forEach(image => {
      let imageKey = image.split('/').slice(-1)[0];
      imagesKeys.push({
        Key: imageKey
      });
    });
    return imagesKeys;
  }

  deleteImageS3(images) {
    const s3 = new _awsSdk2.default.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Delete: {
        Objects: images
      }
    };
    s3.deleteObjects(params, function (err, data) {
      if (err) console.log(err, err.stack);else console.log('delete', data);
    });
  }

}) || _class);
exports.default = NewsRepository;