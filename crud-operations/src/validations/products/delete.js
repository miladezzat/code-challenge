const { Types: { ObjectId } } = require('mongoose');

const validateObjectId = (id) => ObjectId.isValid(id);

module.exports = {
  $id: '/schemas/sakneen/marketplace/products/DELETE',
  title: ' Schema',

  type: 'object',
  additionalProperties: false,

  properties: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          validator: [validateObjectId, 'product id format not correct'],
        },
      },
    },
  },
};
