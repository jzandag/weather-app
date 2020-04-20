const axios = require('axios');

const API_KEY = 'pk.eyJ1IjoianphbmRhZyIsImEiOiJjazk1YnRha2wwYWJyM2dwMnYzMnFzN29zIn0.5cjCnYzF9eNIp257jpkQCA'
const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+ API_KEY +'&limit=5';

    axios({
        url
    }).then(({data:res}) => { 
        if(!res.features){
            callback('Ooopss... Cannot find the data', undefined)
        }else{
            const data = res.features
            callback(undefined, {
                longitude: res.features[0].center[0],
                latitude: res.features[0].center[1],
                placeName: res.features[0].place_name
            })
        }
    }).catch((err) => {
        callback('Unable to connect to service.... ', undefined);
    });
}

module.exports = geocode