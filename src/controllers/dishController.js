const Dish = require('../models/dish');

exports.createDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).send(dish);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).send(dishes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.voteDish = async (req, res) => {
  try {
    const { voter, score } = req.body;
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).send({ error: 'Dish not found' });
    }
    // Check if the voter has already voted
    const existingVote = dish.votes.find(vote => vote.voter === voter);
    if (existingVote) {
      // Update the existing vote
      existingVote.score = score;
    } else {
      // Add a new vote
      dish.votes.push({ voter, score });
    }
    await dish.save();
    res.status(200).send(dish);
  } catch (error) {
    res.status(400).send(error);
  }
};
