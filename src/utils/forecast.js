const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a5a8571ca85f7d55202135b5a74cd456&query=${latitude},${longitude}&units=m`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
            return
        }

        if (false === body.success) {
            callback(body.error.info, undefined)
            return
        }

        callback(undefined, {
            weather_descriptions: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })
    })
}

module.exports = forecast