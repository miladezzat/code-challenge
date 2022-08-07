const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const Boom = require('@hapi/boom');
const localeMiddleware = require('express-locale');
const swaggerUi = require('swagger-ui-express');// for swagger ui(apis documents)
const ErrorManagement = require('./helpers/errorManagement');

const marketPlaceDocs = require('../docs');

const corsOpts = { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] };

const app = express();

app.set('trust proxy', true);
app.use(xss());
app.use(helmet());
app.use(helmet());

app.use(cors(corsOpts));
app.use(localeMiddleware({
  priority: ['query', 'accept-language', 'default'],
  allowed: ['ar-EG', 'en-US'],
  default: 'en-US',
  query: 'accept-language',
}));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true, parameterLimit: 50 }));

// App main router prefixed by /apis as our current configuration forwards requests with prefix /apis to this app
const mainRouter = new express.Router();
app.use('/api', mainRouter);

mainRouter.use('/healthcheck', require('./routes/health-check'));

mainRouter.use(
  '/docs',
  swaggerUi.serveFiles(marketPlaceDocs, config.get('swagger')),
  swaggerUi.setup(marketPlaceDocs),
);
require('./routes')(mainRouter);

// Docs routes, only enable in a non-production environnement
// catch 404 and forward to error handler
app.use(() => {
  throw Boom.notFound('InvalidUrl');
});

// production error handler
// no stack traces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => ErrorManagement.handle(req, res, err));

module.exports = app;
