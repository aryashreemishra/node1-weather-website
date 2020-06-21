const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/f64414708702aef6ea0e77c4c5e7889d/'+latitude+','+longitude
    request({url , json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather sevices', undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature +'.'+' The high tody will be '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow +'. There is '+body.currently.precipProbability * 100 + '% chance of rain. '+'Currently, the humidity is '+body.currently.humidity *100+' %.'
            )
        }
    })
}

module.exports = forecast