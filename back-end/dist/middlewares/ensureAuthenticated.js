"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _ErrorHandler = _interopRequireDefault(require("../errors/ErrorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _ErrorHandler.default('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, '80f6ec39777d807e9427ed5f5a71fe79');
    next();
  } catch {
    throw new _ErrorHandler.default('Invalid JWT token');
  }
}