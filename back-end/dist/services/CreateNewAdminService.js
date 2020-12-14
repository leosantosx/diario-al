"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _typeorm = require("typeorm");

var _Admin = _interopRequireDefault(require("../models/Admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateNewAdminService {
  async execute({
    email,
    password,
    code
  }) {
    const adminRepository = (0, _typeorm.getRepository)(_Admin.default);
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

var _default = CreateNewAdminService;
exports.default = _default;