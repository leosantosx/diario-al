"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _News = _interopRequireDefault(require("../models/News"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateNewsService {
  parserSlug(title) {
    title = title || '';
    const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ';
    const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo';
    const p = new RegExp(a.split('').join('|'), 'g');
    return title.toString().trim().toLowerCase().replace(/ου/g, 'ou').replace(/ευ/g, 'eu').replace(/θ/g, 'th').replace(/ψ/g, 'ps').replace(/\//g, '-').replace(/\s+/g, '-').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  }

  async execute({
    title,
    content,
    images
  }) {
    const newsRepository = (0, _typeorm.getRepository)(_News.default);
    const date = new Date();
    const news = newsRepository.create({
      title,
      slug: this.parserSlug(title),
      images,
      content,
      date: date.toLocaleString()
    });
    await newsRepository.save(news);
    return news;
  }

}

var _default = CreateNewsService;
exports.default = _default;