const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },)
    console.log('Mongo is Connected!')
  } catch (err) {
    console.log(err)
  }  
}

module.exports = connectDB