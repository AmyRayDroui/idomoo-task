require("dotenv").config();

const { PORT = 3000 } = process.env;

// error codes
const INVALID_DATA_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

// generic error messages
const SERVER_ERROR_MESSAGE = "Server Error";

// log file names
const REQUEST_LOGGER_FILE = "request.log";
const ERROR_LOGGER_FILE = "error.log";

module.exports = {
  PORT,
  INVALID_DATA_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  REQUEST_LOGGER_FILE,
  ERROR_LOGGER_FILE,
};
