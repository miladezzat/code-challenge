const { tags } = require('../../common/tags');

module.exports = {
  '/products': {
    get: {
      tags: [tags.PRODUCTS_TAG],
      summary: 'get products list',
      description: 'get products list',
      operationId: 'get products list',
      produces: ['application/json'],
      parameters: [
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'number',
            example: 10,
          },
          required: true,
        },
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'number',
            example: 1,
          },
          required: true,
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'edf4l34',
                        },
                        name: {
                          type: 'string',
                          example: 'Shoes',
                        },
                        quantity: {
                          type: 'number',
                          example: 5,
                        },
                      },
                    },
                  },
                  pagination: {
                    type: 'object',
                    properties: {
                      totalCount: {
                        type: 'number',
                        example: 400,
                      },
                      pages: {
                        type: 'number',
                        example: 10,
                      },
                    },
                  },
                },
              },
            },
          },
          description: 'successful operation',
        },
      },
    },

    post: {
      tags: [tags.PRODUCTS_TAG],
      summary: 'create a new product',
      description: 'create a new product',
      operationId: 'create a new product',
      produces: ['application/json'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Shoes',
                },
                quantity: {
                  type: 'number',
                  example: 5,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'edf4l34',
                  },
                  name: {
                    type: 'string',
                    example: 'Shoes',
                  },
                  quantity: {
                    type: 'number',
                    example: 5,
                  },
                },
              },
            },
          },
          description: 'successful operation',
        },
      },
    },
  },
  '/products/{id}': {
    patch: {
      tags: [tags.PRODUCTS_TAG],
      summary: 'update product info',
      description: 'update product info',
      operationId: 'update product info',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
            example: '',
            description: 'Enter product id here.',
          },
          required: true,
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Shoes',
                },
                quantity: {
                  type: 'number',
                  example: 5,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'edf4l34',
                  },
                  name: {
                    type: 'string',
                    example: 'Shoes',
                  },
                  quantity: {
                    type: 'number',
                    example: 5,
                  },
                },
              },
            },
          },
          description: 'successful operation',
        },
      },
    },

    delete: {
      tags: [tags.PRODUCTS_TAG],
      summary: 'delete Product',
      description: 'delete Product',
      operationId: 'delete Product',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
            example: '',
            description: 'Enter product id here.',
          },
          required: true,
        },
      ],
      responses: {
        204: {
          description: 'successful operation',
        },
      },
    },
  },
};
