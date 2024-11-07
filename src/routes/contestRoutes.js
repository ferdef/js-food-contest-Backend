const express = require('express');
const { createContest, getContests, addDishToContest, getDishScores } = require('../controllers/contestController');

const router = express.Router();

router.post('/contests', createContest);
router.get('/contests', getContests);
router.post('/contests/:contestId/dishes/:dishId', addDishToContest);
router.get('/contests/:contestId/scores', getDishScores);

module.exports = router;
