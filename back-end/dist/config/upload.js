"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const s3 = new _awsSdk.default.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var _default = {
  storage: (0, _multerS.default)({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    contentType: _multerS.default.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldname: file.fieldname
      });
    },
    key: function (req, file, cb) {
      const filename = `${_crypto.default.randomBytes(10).toString('hex')}-${file.originalname}`;
      cb(null, filename);
    }
  })
};
exports.default = _default;