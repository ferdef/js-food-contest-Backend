const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
});

module.exports = mongoose.model('Contest', contestSchema);
