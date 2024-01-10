// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { readFile } from 'fs/promises';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../default_swagger_output.json');

// Options for the swagger docs
// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Sakila API Documentation",
//       version: "1.0.0",
//       description: "Documentation for Sakila API",
//       contact: {
//         name: "Group 3",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//         description: "Development server",
//       },
//     ],
//   },
//   apis: ["./routes/*.js", "./schemas/*.js"],
// };

// // Initialize swagger-jsdoc
// const swaggerSpecs = swaggerJSDoc(options);

// Export swagger
// export default (app) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//   // Serve swagger specs as JSON endpoint
//   app.get('/docs.json', (req, res) => {
//     res.json(swaggerFile);
//   });
// };

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  // Serve swagger specs as JSON endpoint
  app.get('/docs.json', (req, res) => {
    res.json(swaggerFile);
  });
};
