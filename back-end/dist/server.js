"use strict";

require("reflect-metadata");

require("./database");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _routes = _interopRequireDefault(require("./routes"));

var _ErrorHandler = _interopRequireDefault(require("./errors/ErrorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_routes.default);
app.use((err, request, response, next) => {
  if (err instanceof _ErrorHandler.default) {
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