"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _news = _interopRequireDefault(require("./news.routes"));

var _sessions = _interopRequireDefault(require("./sessions.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/news', _news.default);
routes.use('/sessions', _sessions.default);
var _default = routes;
exports.default = _default;