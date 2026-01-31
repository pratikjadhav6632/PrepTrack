const mongoose = require('mongoose');
const url="mongodb://localhost:27017/job-tracker";
const connectDB= (url)=>{
    return mongoose.connect(url);
}

module.exports = connectDB;
