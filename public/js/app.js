console.log('hetyy');

//fetch weather


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageBox = document.querySelector('#data')
const errorBox = document.querySelector('#err')

weatherform.addEventListener('submit', (e)=> {
    e.preventDefault();

    const loc = search.value
    errorBox.textContent = ''
    messageBox.textContent = 'Loading...'
    if(!loc){
        errorBox.textContent = 'Please provide address!!'
        messageBox.textContent = ''
        return search.classList.add('error')
    }
    else
        search.classList.remove('error')

    fetch('http://localhost:3000/weather?address='+ loc).then((result) => {
        result.json().then((result) => {
            messageBox.textContent = ''
            if(result.error)
                errorBox.textContent = result.error
            else{
                messageBox.innerHTML = `
                    Longitude: ${result.longitude} <br/>
                    Latitude: ${result.latitude} <br/>
                    Place: ${result.placeName} <br/>
                    Temperature is ${result.temp} <br/>
                    Humidity is ${result.hmd} <br/>
                `
            }
        }).catch((err) => {
            
        });
    }).catch((err) => {
        
    });
})