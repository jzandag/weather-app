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
        message: 'If you decided to help someone, you cannot stop on the half of the way. You need to be sure that that the changes appeared and your words were not empty. People will be grateful to you for your help and will appreciate your efforts and time you spent.',
        message2: 'It is possible to get a lot of friends if you help other people. This fact is very important for our health. The researches showed, that the loneliness has negative influence on our blood pressure and the risk of the heart attacks will be increased. People, which know, that there are their friends that can help them, live longer than people which do not have friends or family. Are you interested in it.',
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
