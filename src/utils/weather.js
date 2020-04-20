const axios = require('axios');

//weatherstack.com api key
const API_KEY = 'b763e3064f7a440fc1f45e97a6cada7e'

const forecast = (long, lang, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+API_KEY+ '&query='+ encodeURIComponent(lang + ',' + long) +'&units=m';

    axios({
        url
    }).then(({data:res}) => {
        if(res.error){
            callback('Cant locate query...')
        }else{
            const {temperature, humidity, weather_icons, weather_descriptions} = res.current
            console.log(`It is currently ${temperature} degree out. There is ${humidity}% humidity.`)
            callback(undefined, {
                        temperature: temperature,
                humidity: humidity,
                icon: weather_icons[0],
                desc: weather_descriptions[0]
            })
        }
    }).catch((err) => {
        callback('Cant connect to service', undefined)
    });
}

module.exports = forecast