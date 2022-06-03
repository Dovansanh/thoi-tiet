const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const search = $('.input-search');
const city = $('.city');
const country = $('.country');
const time = $('.time');
const value = $('.value');
const shortDesc = $('.short-desc')
const visibility = $('.visibility span')
const wind = $('.wind span')
const sun = $('.sun span')
const content = $('.content')
const body = $('body')



body.setAttribute('class', 'hot')

function changeWetherUI() {
    let capitalSearch = search.value.trim()

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
    fetch(apiUrl)
        .then(res => res.json())
        .then(function(data) {
            console.log(data)
            if (data.cod == 200) {
                content.classList.remove('hide')
                city.innerText = data.name
                country.innerText = data.sys.country
                visibility.innerText = data.visibility + 'm '
                wind.innerText = data.wind.speed + ' m/s'
                sun.innerText = data.main.humidity + '%'
                let temp = Math.round((data.main.temp))
                value.innerText = temp
                shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
                time.innerText = new Date().toLocaleString('vi')


                if (temp < 25) {
                    body.setAttribute('class', 'cool')
                }
                if (temp >= 25) {
                    body.setAttribute('class', 'hot')

                }
            } else {
                content.classList.add('hide')
            }
        })
}
search.addEventListener('keypress', function(e) {
    if (e.code === 'Enter') {
        changeWetherUI()

    }
})