"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _CreateNewsService = _interopRequireDefault(require("../services/CreateNewsService"));

var _newsRepository = _interopRequireDefault(require("../repository/newsRepository"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default);
const newsRoutes = (0, _express.Router)();
newsRoutes.get('/', async (request, response) => {
  const newsRepository = (0, _typeorm.getCustomRepository)(_newsRepository.default);
  const news = await newsRepository.find();
  response.json(news);
});
newsRoutes.get('/:pageId', async (request, response) => {
  const pageId = parseInt(request.params.pageId);
  const newsRepository = (0, _typeorm.getCustomRepository)(_newsRepository.default);
  const pageNews = await newsRepository.getPage({
    pageId
  });
  response.json(pageNews);
});
newsRoutes.get('/al/:slug', async (request, response) => {
  const {
    slug
  } = request.params;
  const newsRepository = (0, _typeorm.getCustomRepository)(_newsRepository.default);
  const news = await newsRepository.findOne({
    where: {
      slug
    }
  });
  return response.json(news || {});
});
newsRoutes.post('/', _ensureAuthenticated.default, upload.array('file'), async (request, response) => {
  const {
    title,
    content
  } = request.body;
  const createNews = new _CreateNewsService.default();
  const images = request.files.map(file => file.location);
  const news = await createNews.execute({
    title,
    content,
    images
  });
  return response.status(201).json(news);
});
newsRoutes.delete('/:id', _ensureAuthenticated.default, async (request, response) => {
  const {
    id
  } = request.params;
  const newsRepositoty = (0, _typeorm.getCustomRepository)(_newsRepository.default);
  const news = await newsRepositoty.deleteNews({
    id
  });
  return response.json(news);
});
var _default = newsRoutes;
exports.default = _default;