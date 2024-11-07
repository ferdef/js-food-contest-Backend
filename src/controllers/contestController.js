const Contest = require('../models/contest');
const Dish = require('../models/dish');

exports.createContest = async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).send(contest);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate('dishes');
    res.status(200).send(contests);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addDishToContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId);
    const dish = await Dish.findById(req.params.dishId);
    if (!contest || !dish) {
      return res.status(404).send({ error: 'Contest or Dish not found' });
    }
    dish.contest = contest._id;
    contest.dishes.push(dish._id);
    await dish.save();
    await contest.save();
    res.status(200).send(contest);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDishScores = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId).populate('dishes');
    if (!contest) {
      return res.status(404).send({ error: 'Contest not found' });
    }

    const scores = contest.dishes.map(dish => ({
      dish: dish.name,
      totalScore: dish.votes.reduce((acc, vote) => acc + vote.score, 0)
    }));

    res.status(200).send(scores);
  } catch (error) {
    res.status(500).send(error);
  }
};
