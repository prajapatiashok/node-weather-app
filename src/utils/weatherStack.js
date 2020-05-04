const postmanRequest = require('postman-request');

const weatherStack = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b017f6d6c52f8e1bc79dc8b578b1ef2b&query='+longitude+','+latitude+'';
    postmanRequest({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to CONNECT to Weather Services!', undefined);
        } else if(body.error) {
            callback('Unable to find the Location.');
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ " Currently the temperature is " + body.current.temperature+ " degree celsius. It is feels like " + body.current.feelslike+" degree celcius." );
        }
    })
}

module.exports = weatherStack;