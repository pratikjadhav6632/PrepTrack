const mongoose = require('mongoose');
const url=process.env.MONGO_URI;
const connectDB= (url)=>{
    return mongoose.connect(url);
}

module.exports = connectDB;
