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
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./modules/**/*.routes.js'], // هنا هنقرأ التعليقات من الملفات
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;