console.log('Client side javascript file is loaded.')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input[name=location]')
const weatherReport = document.querySelector('#weather-report')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value.trim()

    weatherReport.innerHTML = ''

    if (!location) {
        weatherReport.innerHTML = `<p class="text-danger"><i class="fa fa-warning"></i> Location must be provided.</p>`
        return
    }

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                weatherReport.innerHTML = `<p class="text-danger"><i class="fa fa-warning"></i> ${data.error}</p>`
                return
            }

            const weatherReportMessage = `<p class="text-success m-0">Location: ${data.location}</p><p class="m-0">Weather description: ${data.weather_descriptions}</p><p class="m-0">Temperature: ${data.temperature}</p><p>Feels like: ${data.feelslike}</p>`

            weatherReport.innerHTML = weatherReportMessage
            
        })
    })
})