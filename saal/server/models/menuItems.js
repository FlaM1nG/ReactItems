const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id : String,
  type: String,
  name: String,
  description: String
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = { MenuItem };