const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  name: String,
  brand: String,
  sugar: Number,
  calories: Number,
  saturatedFat: Number,
  sodium: Number,
  healthyFor: [String]
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
// This module defines a Mongoose schema for a Product.
// It includes fields for barcode, name, brand, and nutritional values.
// The schema is exported as a Mongoose model named 'Product'.
// If the model already exists, it uses the existing one to avoid redefinition errors.
// The 'healthyFor' field is an array of strings indicating which age groups the product is healthy for.
// The barcode field is required and must be unique.