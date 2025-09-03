const Menu = require('../models/MenuItem');

// Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a menu item by ID
const getMenuItemById = async (req, res) => {
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
};

// Update a menu item by ID
const updateMenuItem = async (req, res) => {
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
};

// Delete a menu item by ID
const deleteMenuItem = async (req, res) => {
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
};

module.exports = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
};
