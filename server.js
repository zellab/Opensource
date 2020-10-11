//import Libraries
let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")
let dbConfig = require("./database/db")
let createError = require("http-errors")

//routes
let noteRoute = require("./routes/main")

let app = express()

//use the imported libraries
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())
app.use('/', noteRoute)

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to DB')
}, error => {
    console.log('Unable to Connect to DB: ' + error)
})

//Define server and port
let port = process.env.PORT || 4000
let server = app.listen(port, () => {
    console.log('Connected to the Port: ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})