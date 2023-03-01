const request = require('postman-request')

const geocode = (address, callback) => {
    address = address ? address.trim() : address
    if (!address) {
        callback('Please provide location.', undefined)
        return
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmVlcmFqc2hlZWRldiIsImEiOiJjbGVneTZtczExNWFpM3NxcWVtemxveXNzIn0.E-menUZ7NAKm3_q6vU_YwQ&limit=1`

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
            return
        }

        if (0 === body.features.length) {
            callback('Unable to find location, try another search.', undefined)
        }

        callback(undefined, {
            latitude: body ? body.features ? body.features[0] ? body.features[0].center ? body.features[0].center[1] : '' : '' : '' : '',
            longitude: body ? body.features ? body.features[0] ? body.features[0].center ? body.features[0].center[0] : '' : '' : '' : '',
            location: body ? body.features ? body.features[0] ? body.features[0].place_name : '' : '' : ''
        })
    })
}

module.exports = geocode