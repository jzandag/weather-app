const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express();
const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '..', 'template', 'views')
const partialsPath = path.join(__dirname, '..', 'template', 'partials')
const publi_dir = path.join(__dirname, '..', 'public')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publi_dir))

app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather app',
        name: 'Zidrex Andag'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About',
        name: 'Zidrex'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        message: 'We help each other because of the different reasons. Some people help, because they just cannot not to help the other people if they need help. The other people help, because they wish to give some positive energy or just because they must help. ',
        message2: 'Sometimes we can help the others, because we are sure, that they will think in a good way about as after that. We need to improve our health, and to be sure, that someone needs us. When we help, we also get the real benefits to our health. Are you interested in it.',
        title: 'Help',
        name: 'Zidrex'
    });
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {longitude, latitude, placeName} = {}) => {
        if(error){
            console.log(error);
            return res.send({
                error: 'Unable to connect to service'
            });
        }else{
            
            forecast(longitude, latitude, (error, {temperature: temp, humidity: hmd, icon, desc} = {}) => {
                if(error)
                    return res.send({
                        error: 'Error in parsing results'
                    })
                else{
                    console.log(`Longitude ${longitude}`);
                    console.log(`Latitude ${latitude}`);
                    console.log(`Place: ${placeName}`);
                    console.log('Temperature is ', temp)
                    console.log('Humidity is ', hmd)
                    res.json({
                        longitude,
                        latitude,
                        placeName,
                        temp,
                        hmd,
                        icon,
                        desc
                    })
                }
            })
        }
        
    });
})

app.get('/help/*', (req,res) => {
    res.render('404-inf', {
        title: '404',
        name: 'Zidrex Andag',
        error: 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404-inf', {
        title: '404',
        name: 'zidrex',
        error: '404 not found'
    })
})

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT );
})
