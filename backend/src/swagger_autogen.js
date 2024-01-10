// import swaggerAutogen from "swagger-autogen";
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

// Specify the path to the JSON file where the Swagger documentation will be generated.
const outputFile = './swagger_output.json';

// Specify an array of files that contain the endpoint definitions/routes want to document.
const endpointsFiles = ['./routes/v1/ward.route.js'];

const docs = {
  info: {
    title: 'Ads Management API Documentation',
    version: '1.0.0',
    description: 'Documentation for Ads Management API',
    contact: {
      name: 'Group 3',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000/v1',
      description: 'Development server',
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object
};

// Use 'swagger-autogen' to generate Swagger documentation. This function will take the
// 'outputFile' as the target location for the generated documentation and 'endpointsFiles'
// as an array of files that contain the API endpoint definitions want to document.
swaggerAutogen(outputFile, endpointsFiles, docs);
