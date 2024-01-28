const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'misto-fest.fun API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ Bearer: [] }],
    servers: [
      { url: 'https://45.94.157.117:53431/api' },
      { url: 'https://city-backend-45go.onrender.com/api' },
      { url: 'https://localhost:4000/api' },
    ],
    tags: [
      { name: 'Filters' },
      { name: 'Events' },
      { name: 'Image' },
      { name: 'Users' },
      { name: 'Contacts' },
      { name: 'Partners' },
      { name: 'Documents' },
      { name: 'EventTypes' },
    ],
  },
  apis: ['./src/routes/api/*.js'],
};

module.exports = swaggerOptions;
