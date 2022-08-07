const paths = require('./paths');

module.exports = {
  swagger: '3.0',
  openapi: '3.0.0',
  info: {
    description: 'This is the APIs Docs for KIB Products',
    version: '1.0.0',
    title: 'KIB CRUD Operations',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'dev@kib.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  components: {},
  host: 'localhost:8080',
  servers: [{ url: '/api' }],
  schemes: ['http'],
  paths,
};
