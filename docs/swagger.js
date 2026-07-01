const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
      components: {
    schemas: require('./schemas'),
  },
  },
  apis: ['./modules/**/*.routes.js'], 
  
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;