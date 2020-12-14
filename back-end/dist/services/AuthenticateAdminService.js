"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Admin = _interopRequireDefault(require("../models/Admin"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _ErrorHandler = _interopRequireDefault(require("../errors/ErrorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticateAdminService {
  async execute({
    email,
    password,
    code
  }) {
    const adminRepository = (0, _typeorm.getRepository)(_Admin.default);
    const user = await adminRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new _ErrorHandler.default('Invalid credentials');
    }

    if (user.code !== code) {
      throw new _ErrorHandler.default('Invalid credentials');
    }

    const passwordMatched = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatched) {
      throw new _ErrorHandler.default('Invalid credentials');
    }

    const token = (0, _jsonwebtoken.sign)({}, '80f6ec39777d807e9427ed5f5a71fe79', {
      subject: user.id,
      expiresIn: '5d'
    });
    delete user.password;
    return {
      user,
      token
    };
  }

}

var _default = AuthenticateAdminService;
exports.default = _default;