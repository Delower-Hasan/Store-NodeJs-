require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('config');
    // port
const URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0-wqw2c.mongodb.net/store?retryWrites=true&w=majority`

// seting the view engine to the ejs

app.set('view engine', 'ejs')
app.set('views', 'views')



// middleware and Route call
const setMiddleWare = require('./middlewares/middlewares')
const webRoutes = require('./routes/webRoutes')





// use midleware and Route

setMiddleWare(app)


// route
webRoutes(app)


app.use((req, res, next) => {
    let error = new Error('404 page not Fountd')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    console.log(error)
    if (error.status == 404) {
        res.render('error/404', { flashMessage: {} })
    } else {
        res.render('error/500', { flashMessage: {} })
    }
})




// apps SERVER

const PORT = process.env.PORT || 8080


mongoose.connect(URI,{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Database connected')
        app.listen(PORT, () => {
            console.log(`App is now running on ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })