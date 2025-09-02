const express = require('express');
const router = express.Router();
const Menu = require('../models/MenuItem'); // Changed from User to Menu for clarity

// Create a new menu item
router.post('/menuitems', async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    // Corrected to return the 'menu' object instead of an undefined 'user' object
    res.status(201).json(menu); 
  } catch (err) {
    // Returning err.message provides specific validation errors
    res.status(400).json({ message: err.message });
  }
});

// Get all menu items
router.get('/menuitems', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a menu item by ID
router.get('/menuitems/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      // Changed message to reflect finding a menu item
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.json(menu);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
