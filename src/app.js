const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine, views and partials location
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        tabtitle: 'WeatherLens',
        title: 'Home'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        tabtitle: 'WeatherLens | About',
        title: 'About',
        image: 'nrj.jpg',
        createdby: 'Neeraj Shree'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        tabtitle: 'WeatherLens | Help',
        title: 'Help',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'addrtess must be provided.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {weather_descriptions, temperature, feelslike} = {}) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                weather_descriptions,
                temperature,
                feelslike,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        tabtitle: 'WeatherLens | Contact',
        title: 'Contact'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        tabtitle: 'WeatherLens | 404',
        title: '404',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        tabtitle: 'WeatherLens | 404',
        title: '404',
        message: 'Page not found.'
    })
})

app.listen(port, _ => {
    console.log(`Server is up on port ${port}`)
})