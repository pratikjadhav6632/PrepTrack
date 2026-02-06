const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//  require('express-async-errors');

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const searchRouter = require('./routes/searchRoutes');
const questionsRouter = require('./routes/questionsRoutes');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Job Tracker API is running...');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/search', authenticateUser, searchRouter);
app.use('/api/v1/questions', authenticateUser, questionsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const url=process.env.MONGO_URI;
const start = async () => {
  try {
    await connectDB(url).then(()=>{
      console.log("Connected to MongoDB");
    });
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
