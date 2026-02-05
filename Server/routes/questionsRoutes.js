const express = require('express');
const router = express.Router();

const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionsController');

router.route('/').post(createQuestion).get(getAllQuestions);
router.route('/:id').delete(deleteQuestion).patch(updateQuestion);

module.exports = router;
