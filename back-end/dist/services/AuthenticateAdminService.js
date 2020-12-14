"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeorm = require("typeorm");

var _Admin = require("../models/Admin");

var _Admin2 = _interopRequireDefault(_Admin);

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _ErrorHandler = require("../errors/ErrorHandler");

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticateAdminService {
  async execute({
    email,
    password,
    code
  }) {
    const adminRepository = (0, _typeorm.getRepository)(_Admin2.default);
    const user = await adminRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new _ErrorHandler2.default('Invalid credentials');
    }

    if (user.code !== code) {
      throw new _ErrorHandler2.default('Invalid credentials');
    }

    const passwordMatched = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatched) {
      throw new _ErrorHandler2.default('Invalid credentials');
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

exports.default = AuthenticateAdminService;