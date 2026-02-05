const Job = require('../models/Job');
const mongoose = require('mongoose');
const moment = require('moment');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search, source } = req.query;

  const matchStage = {
    createdBy: new mongoose.Types.ObjectId(req.user.userId),
  };

  if (search) {
    matchStage.company = { $regex: search, $options: 'i' };
  }
  if (status && status !== 'all') {
    matchStage.status = status;
  }
  if (jobType && jobType !== 'all') {
    matchStage.jobType = jobType;
  }
  if (source && source !== 'all') {
    matchStage.source = source;
  }

  // Determine sort order
  let sortStage = {};
  
  // Custom logic: Rejected jobs always at the bottom
  // We want non-rejected (isRejected: 0) to come before rejected (isRejected: 1)
  // Then we apply the user-selected sort within those groups.
  
  const sortOptions = {
    latest: { updatedAt: -1 },
    oldest: { updatedAt: 1 },
    'a-z': { position: 1 },
    'z-a': { position: -1 },
  };

  const secondarySort = sortOptions[sort] || sortOptions.latest;

  sortStage = {
    isRejected: 1, // 0 comes first (non-rejected), 1 comes last (rejected)
    ...secondarySort
  };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let jobs = await Job.aggregate([
    { $match: matchStage },
    {
      $addFields: {
        isRejected: {
          $cond: { if: { $eq: ['$status', 'Rejected'] }, then: 1, else: 0 }
        }
      }
    },
    { $sort: sortStage },
    { $skip: skip },
    { $limit: limit }
  ]);
  
  // We need total count and numPages as well.
  // Since we are using aggregate for data, checking count separately or using facet.
  // Facet is cleaner but let's stick to separate count for simplicity if we didn't want to overhaul everything,
  // BUT regular countDocuments doesn't know about the custom sort (which doesn't affect count, only order)
  // so we can still use countDocuments for total.
  
  const totalJobs = await Job.countDocuments(matchStage);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    'Applied': stats['Applied'] || 0,
    'Shortlisted': stats['Shortlisted'] || 0,
    'Interview Scheduled': stats['Interview Scheduled'] || 0,
    'Rejected': stats['Rejected'] || 0,
    'Offer': stats['Offer'] || 0,
    'Accepted': stats['Accepted'] || 0
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats
};
