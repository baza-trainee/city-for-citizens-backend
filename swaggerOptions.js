/**
 * @swagger
 * definition:
 *   Info:
 *     properties:
 *       title:
 *         type: string
 *       version:
 *         type: string
 */

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

const swaggerOptions = {
  swaggerDefinition: {
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
    servers: [{ url: 'https://localhost:4000/api' }],
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
    openapi: '3.0.0',
  },
  apis: ['./src/routes/api/*.js'],
};

module.exports = swaggerOptions;
