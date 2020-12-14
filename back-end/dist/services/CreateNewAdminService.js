"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require("bcryptjs");

var _typeorm = require("typeorm");

var _Admin = require("../models/Admin");

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateNewAdminService {
  async execute({
    email,
    password,
    code
  }) {
    const adminRepository = (0, _typeorm.getRepository)(_Admin2.default);
    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const admin = adminRepository.create({
      email,
      password: hashedPassword,
      code
    });
    await adminRepository.save(admin);
    delete admin?.password;
    return admin;
  }

}

exports.default = CreateNewAdminService;