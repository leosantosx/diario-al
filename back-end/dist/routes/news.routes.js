"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _typeorm = require("typeorm");

var _CreateNewsService = require("../services/CreateNewsService");

var _CreateNewsService2 = _interopRequireDefault(_CreateNewsService);

var _newsRepository = require("../repository/newsRepository");

var _newsRepository2 = _interopRequireDefault(_newsRepository);

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ensureAuthenticated2 = _interopRequireDefault(_ensureAuthenticated);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _upload = require("../config/upload");

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer2.default)(_upload2.default);
const newsRoutes = (0, _express.Router)();
newsRoutes.get('/', async (request, response) => {
  const newsRepository = (0, _typeorm.getCustomRepository)(_newsRepository2.default);
  const news = await newsRepository.find();
  response.json(news);
});
newsRoutes.get('/:pageId', async (request, response) => {
  const pageId = parseInt(request.params.pageId);
  const newsRepository = (0, _typeorm.getCustomRepository)(_newsRepository2.default);
  const pageNews = await newsRepository.getPage({
    pageId
  });
  response.json(pageNews);
});
newsRoutes.get('/al/:slug', async (request, response) => {
  const {
    slug
  } = request.params;
  const newsRepository = (0, _typeorm.getCustomRepository)(_newsRepository2.default);
  const news = await newsRepository.findOne({
    where: {
      slug
    }
  });
  return response.json(news || {});
});
newsRoutes.post('/', _ensureAuthenticated2.default, upload.array('file'), async (request, response) => {
  const {
    title,
    content
  } = request.body;
  const createNews = new _CreateNewsService2.default();
  const images = request.files.map(file => file.location);
  const news = await createNews.execute({
    title,
    content,
    images
  });
  return response.status(201).json(news);
});
newsRoutes.delete('/:id', _ensureAuthenticated2.default, async (request, response) => {
  const {
    id
  } = request.params;
  const newsRepositoty = (0, _typeorm.getCustomRepository)(_newsRepository2.default);
  const news = await newsRepositoty.deleteNews({
    id
  });
  return response.json(news);
});
exports.default = newsRoutes;