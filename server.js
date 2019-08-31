const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const PORT = process.env.PORT || 7000

// middlewares that fire on every request 
app.use(express.json())// parse request body object and makes req body
app.use(morgan("dev"))

// Connection to db
// protocol to connect as opposed to https, the port mongodb is listening on
mongoose.connect('/mongodb://localhost:27017/contactdb',
 {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true

 })
 .then(() => console.log("Connected to the DB"))
 .catch(() => console.error(err))

//Routes
app.use('/contact', require('./routes/contactRouter.js'))

 // Error handling 
app.use((err, req, res, next) => {
    if(err){
        res.status(err.status)
    }
    return res.send({ errMsg: err.message})
})



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
