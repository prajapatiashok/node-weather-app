const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../src/utils/geocode');
const weatherStack = require('../src/utils/weatherStack');

const app = express();

// Define path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Ashok Prajapati'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "NODE WORK"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'We are developing web servers using node.',
        name: 'Ashok Prajapati'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!req.query.address) {
        return res.send({
            error: "You must provide an adddress in order to see the weather of a specific location."
        })
    }
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        weatherStack(latitude,longitude, (error, weatherData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: weatherData,
                address
            })
        })
    
    })
})

app.get('/help/*', ( req, res) => {
    res.render('404', {
        title: '404 ERROR',
        errorMessage: 'Help article not Found',
        name: 'Ashok Prajapati'
    })
})

app.get('*', ( req, res) => {
    res.render('404', {
        title: '404 ERROR',
        errorMessage: 'The page you are looking for is not exist. Please look for the right One.',
        name: 'Ashok Prajapati'
    })
})

app.listen(3000, () => {
    console.log('Server is on Port 3000')
})