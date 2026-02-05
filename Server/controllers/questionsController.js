const Question = require('../models/Question');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createQuestion = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const question = await Question.create(req.body);
  res.status(StatusCodes.CREATED).json({ question });
};

const getAllQuestions = async (req, res) => {
  const { sort, search, category, difficulty } = req.query;

  const queryObject = {
    // createdBy: req.user.userId, // Commenting out to allow public viewing
  };

  if (category && category !== 'all') {
    queryObject.category = category;
  }
  if (difficulty && difficulty !== 'all') {
    queryObject.difficulty = difficulty;
  }
  if (search) {
    queryObject.question = { $regex: search, $options: 'i' };
  }

  let result = Question.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('question');
  }
  if (sort === 'z-a') {
    result = result.sort('-question');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const questions = await result;

  const totalQuestions = await Question.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalQuestions / limit);

  res.status(StatusCodes.OK).json({ questions, totalQuestions, numOfPages });
};

const updateQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
    throw new BadRequestError('Please provide all values');
  }

  const existingQuestion = await Question.findOne({ _id: questionId });

  if (!existingQuestion) {
    throw new NotFoundError(`No question with id :${questionId}`);
  }

  // check permissions logic handled by query for now or added later if needed
  
  const updatedQuestion = await Question.findOneAndUpdate(
    { _id: questionId, createdBy: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedQuestion) {
      throw new NotFoundError(`No question with id :${questionId}`);
  }

  res.status(StatusCodes.OK).json({ question: updatedQuestion });
};

const deleteQuestion = async (req, res) => {
  const { id: questionId } = req.params;

  const question = await Question.findOne({ _id: questionId, createdBy: req.user.userId });

  if (!question) {
    throw new NotFoundError(`No question with id :${questionId}`);
  }

  await question.deleteOne(); 

  res.status(StatusCodes.OK).json({ msg: 'Success! Question removed' });
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
