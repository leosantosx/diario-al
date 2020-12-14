"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _News = _interopRequireDefault(require("../models/News"));

var _ErrorHandler = _interopRequireDefault(require("../errors/ErrorHandler"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

let NewsRepository = (_dec = (0, _typeorm.EntityRepository)(_News.default), _dec(_class = class NewsRepository extends _typeorm.Repository {
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
      throw new _ErrorHandler.default('News not found');
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
    const s3 = new _awsSdk.default.S3({
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
var _default = NewsRepository;
exports.default = _default;