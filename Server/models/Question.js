const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide the question text'],
    },
    answer: {
      type: String,
      required: [true, 'Please provide the answer'],
    },
    category: {
      type: String,
      enum: ['Technical', 'Behavioral', 'HR'],
      default: 'Technical',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);
