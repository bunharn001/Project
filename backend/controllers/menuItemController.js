const express = require('express');
const router = express.Router();
const Menu = require('../models/MenuItem');

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.json(menu);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a menu item by ID
router.put('/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!menu) {
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.json(menu);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a menu item by ID
router.delete('/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      res.status(404).json({ message: 'Menu item not found' });
    } else {
      res.json({ message: 'Menu item deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
