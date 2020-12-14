"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _news = require("./news.routes");

var _news2 = _interopRequireDefault(_news);

var _sessions = require("./sessions.routes");

var _sessions2 = _interopRequireDefault(_sessions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/news', _news2.default);
routes.use('/sessions', _sessions2.default);
exports.default = routes;