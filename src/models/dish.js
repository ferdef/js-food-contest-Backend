const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voter: { type: String, required: true },
  score: { type: Number, required: true }
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  votes: [voteSchema],
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }
});

module.exports = mongoose.model('Dish', dishSchema);
