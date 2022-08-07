module.exports = {
  $id: '/schemas/sakneen/marketplace/products/LIST',
  title: ' Schema',

  type: 'object',
  additionalProperties: false,

  properties: {
    query: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          minimum: 1,
          maximum: 50,
          default: 10,
        },
        page: {
          type: 'number',
          minimum: 1,
          default: 1,
        },
      },
    },
  },
};
