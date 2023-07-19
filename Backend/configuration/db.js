const mongoose = require('mongoose');

// MongoDB Connection URI
// const mongoURI = 'mongodb://localhost:27017/gorail';

// Connect to MongoDB
const connect=()=>{
    console.log("Mongodb connected")
    return mongoose.connect('mongodb://127.0.0.1:27017/gorail')
//     mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('MongoDB connection error:', err));


}
module.exports=connect;