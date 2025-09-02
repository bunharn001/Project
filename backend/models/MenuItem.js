const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['appetizer', 'main-course', 'dessert', 'beverage', 'salad', 'soup', 'snack']
  },
  image: {
    type: String,
    default: ''
  },
  images: [String], // Multiple images
  ingredients: [{
    name: String,
    quantity: String,
    allergen: Boolean
  }],
  allergens: [{
    type: String,
    enum: ['nuts', 'dairy', 'eggs', 'soy', 'wheat', 'shellfish', 'fish']
  }],
  dietary: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher']
  }],
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'extra-hot'],
    default: 'mild'
  },
  availability: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  variants: [{
    name: String, // e.g., "Small", "Medium", "Large"
    price: Number,
    calories: Number
  }],
  addOns: [{
    name: String,
    price: Number
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ cuisine: 1 });
menuItemSchema.index({ availability: 1 });
menuItemSchema.index({ 'rating.average': -1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);