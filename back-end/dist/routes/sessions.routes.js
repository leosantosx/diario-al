"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AuthenticateAdminService = _interopRequireDefault(require("../services/AuthenticateAdminService"));

var _CreateNewAdminService = _interopRequireDefault(require("../services/CreateNewAdminService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
sessionsRouter.post('/', async (request, response) => {
  const {
    email,
    password,
    code
  } = request.body;
  const authenticateAdmin = new _AuthenticateAdminService.default();
  const admin = await authenticateAdmin.execute({
    email,
    password,
    code
  });
  response.json(admin);
});
sessionsRouter.post('/admin/21232f297a57a5a743894a0e4a801fc3', async (request, response) => {
  const {
    email,
    password,
    code
  } = request.body;
  const createNewAdmin = new _CreateNewAdminService.default();
  const admin = await createNewAdmin.execute({
    email,
    password,
    code
  });
  return response.status(201).json(admin);
});
var _default = sessionsRouter;
exports.default = _default;