const express = require('express');
const router = express.Router();
const { searchJobs } = require('../controllers/searchController');

router.route('/').get(searchJobs);

module.exports = router;
