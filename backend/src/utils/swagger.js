const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../default_swagger_output.json');

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  // Serve swagger specs as JSON endpoint
  app.get('/docs.json', (req, res) => {
    res.json(swaggerFile);
  });
};
