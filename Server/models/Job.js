const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: [
        'Applied',
        'Shortlisted',
        'Interview Scheduled',
        'Rejected',
        'Offer',
        'Accepted',
      ],
      default: 'Applied',
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract'],
      default: 'Full-Time',
    },
    source: {
      type: String,
      default: 'LinkedIn',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    interviewRounds: {
      type: Number,
      default: 0,
    },
    contactPerson: {
      type: String,
      maxlength: 100,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    interviewDetails: {
      type: String,
      default: '',
    },
    feedback: {
      type: String,
      maxlength: 500,
      default: '',
    },
    improvement: {
      type: String,
      maxlength: 500,
      default: '',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
