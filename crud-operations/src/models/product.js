const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },

  quantity: {
    type: Number,
    default: 0,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('product', ProductSchema);
