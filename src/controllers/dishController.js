const Dish = require('../models/dish');
const User = require('../models/user');

exports.createDish = async (req, res) => {
  try {
    const dish = new Dish({ ...req.body, owner: req.user.userId });
    await dish.save();
    res.status(201).send(dish);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('votes.voter').populate('owner');
    res.status(200).send(dishes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.voteDish = async (req, res) => {
  try {
    const { score } = req.body;
    const voterId = req.user.userId; // Assuming the user ID is stored in the JWT token
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).send({ error: 'Dish not found' });
    }

    const existingVote = dish.votes.find(vote => vote.voter.toString() === voterId);
    if (existingVote) {
      existingVote.score = score; // Update the existing vote
    } else {
      dish.votes.push({ voter: voterId, score }); // Add a new vote
    }

    await dish.save();
    res.status(200).send(dish);
  } catch (error) {
    res.status(400).send(error);
  }
};
