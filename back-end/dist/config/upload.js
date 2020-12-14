"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _multerS = require("multer-s3");

var _multerS2 = _interopRequireDefault(_multerS);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const s3 = new _awsSdk2.default.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
exports.default = {
  storage: (0, _multerS2.default)({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    contentType: _multerS2.default.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldname: file.fieldname
      });
    },
    key: function (req, file, cb) {
      const filename = `${_crypto2.default.randomBytes(10).toString('hex')}-${file.originalname}`;
      cb(null, filename);
    }
  })
};