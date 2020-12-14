"use strict";

require("reflect-metadata");

require("./database");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

require("express-async-errors");

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _ErrorHandler = require("./errors/ErrorHandler");

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_routes2.default);
app.use((err, request, response, next) => {
  if (err instanceof _ErrorHandler2.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Server internal error'
  });
});
app.listen(3000, () => console.log('Server running on port 3000'));