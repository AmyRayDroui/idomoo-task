const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");

const { limiter } = require("./middlewares/rateLimiter");
const centralizedErrorHandler = require("./middlewares/centralizedErrorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { router } = require("./routes/index");

const { PORT } = require("./utils/constants");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);

app.use("", router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
