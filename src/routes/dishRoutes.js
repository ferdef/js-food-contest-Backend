const express = require('express');
const { createDish, getDishes, voteDish } = require('../controllers/dishController');

const router = express.Router();

router.post('/dishes', createDish);
router.get('/dishes', getDishes);
router.post('/dishes/:id/vote', voteDish);

module.exports = router;
