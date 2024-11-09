const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true }
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votes: [voteSchema],
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }
});

module.exports = mongoose.model('Dish', dishSchema);
