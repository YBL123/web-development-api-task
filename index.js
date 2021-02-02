// const express = require('express')
// const bodyParser = require('body-parser')
// const router = require('./config/routes')
// const errorHandler = require('./lib/errorHandler')
// const connectDB = require('./db/connect')
// const cors = require('cors')

// require('dotenv').config({ path: './config/config.env' })

// connectDB() //* calling connection here. Comes after dotenv as I am calling process.env within the connectDB function

// const app = express()

// app.use(bodyParser.json())

// app.use(cors())

// app.use('/api', router)

// app.use(errorHandler)  //* errorHandler will receive anything that will come after the controller -> in this case there are 2 options -> 1) asyncHandler, catch/next 2) next within a controller


// // const PORT = process.env.PORT || 8000 //* this is a fallback incase the process.env file doesn't work
// const PORT = process.env.PORT || 8000

// const server = app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))

// //* handle unhandled promise rejections: (node:44800) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated.
// //* unhandled promise rejections cause the server to "hang" -> process.exit allows us to put an end to it
// // //* kills the server
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`err: ${err.message}`)
//   server.close(() => process.exit(1))
// })



const express = require('express')
const bodyParser = require('body-parser')
const router = require('./config/routes')
const errorHandler = require('./lib/errorHandler')
const connectDB = require('./db/connect')
const mongoose = require('mongoose')

require('dotenv').config({ path: './config/config.env' })

connectDB() //* calling connection here. Comes after dotenv as I am calling process.env within the connectDB function

const app = express()

app.use(bodyParser.json())

app.use('/api', router)

app.use(errorHandler)  //* errorHandler will receive anything that will come after the controller -> in this case there are 2 options -> 1) asyncHandler, catch/next 2) next within a controller

const port = 8000

const url = process.env.MONGODB_URI || 'mongodb://localhost/Cluster0';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(async () => {
    await app.listen(port);
    console.log(`user API running on port ${port}`)
  })
  .catch(error => console.log(error));