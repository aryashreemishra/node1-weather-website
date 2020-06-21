const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 


const app = express()

//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static library server 
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arya Shree Mishra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arya Shree Mishra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Welcome to the help Page.',
        title: 'Help',
        name: 'Arya Shree Mishra'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Enter an address.'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address

                })
            })
            
    })
    // res.send({
    //     forecast: 'It is partially cloudy. ',
    //     location: 'Lucknow',
    //     address: req.query.address
    // })
})

//404 PAGE FOR PAGES THAT ARE NOT FOUND IN HELP 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMsg: 'Help Article',
        name: 'Arya Shree Mishra'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMsg: 'Page',
        name: 'Arya Shree Mishra'
    })
})

app.listen(3000, () => {
    console.log('Server is up on Port 3000. ')
})