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

exports.activateContest = async (req, res) => {
  try {
    const contestId = req.params.contestId;
    const selectedContest = await Contest.findById(contestId);
    if (!selectedContest) {
      return res.status(404).send({ error: 'Contest not found' });
    }
    const contests = await Contest.find();
Contest.
    contests.forEach((contest) => {
      contest.active = contest._id.equals(contestId);
      contest.save();
    });
    // Contest.updateMany(undefined, active: false);
    selectedContest.active = true;
    // selectedContest.save();
    res.status(200).send(selectedContest);
  } catch (error) {
    res.status(500).send(error);
  }
}

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
    const contest = await Contest.findById(req.params.contestId).populate({
      path: 'dishes',
      populate: { path: 'votes.voter' }
    });
    if (!contest) {
      return res.status(404).send({ error: 'Contest not found' });
    }

    const scores = contest.dishes.map(dish => ({
      dish: dish.name,
      totalScore: dish.votes.reduce((acc, vote) => acc + vote.score, 0),
      votes: dish.votes.map(vote => ({
        voter: vote.voter.username,
        score: vote.score
      }))
    }));

    res.status(200).send(scores);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDishScoresWithOwners = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId).populate({
      path: 'dishes',
      populate: { path: 'votes.voter owner' }
    });
    if (!contest) {
      return res.status(404).send({ error: 'Contest not found' });
    }

    const scores = contest.dishes.map(dish => ({
      dish: dish.name,
      owner: dish.owner.username,
      totalScore: dish.votes.reduce((acc, vote) => acc + vote.score, 0),
      votes: dish.votes.map(vote => ({
        voter: vote.voter.username,
        score: vote.score
      }))
    }));

    res.status(200).send(scores);
  } catch (error) {
    res.status(500).send(error);
  }
};
