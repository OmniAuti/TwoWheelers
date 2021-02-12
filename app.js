// Photo Carousel _________________________________________________

const container = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const pics = document.querySelectorAll('.pics')
const pause = document.querySelector('.carousel-control')

let idx = 0
let interval = setInterval(run, 2500)

function run() {
    idx++
    changeImg()
    btnCheck()
}

function play() {
    if (pause.classList.contains('pause')) {
        clearInterval(interval)
    } else if (!pause.classList.contains('pause'))  {
        interval = setInterval(run, 2500)
    }
}

function changeImg() {
    if (idx > pics.length - 1) {
        idx = 0
    } else if (idx < 0) {
        idx = pics.length - 1
    }
    container.style.transform = `translateX(${idx * -100}%)`
}

function btnCheck() {
    if (idx === 0) {
        leftBtn.disabled = true
        rightBtn.disabled = false
    } else if (idx === pics.length - 1) {
        rightBtn.disabled = true
    } else {
        rightBtn.disabled = false
        leftBtn.disabled = false
    }
}

pause.addEventListener('click', () => {
    pause.classList.toggle('pause')
    play()
})

rightBtn.addEventListener('click', () => {
    idx++
    changeImg()
    clearInterval(interval)
})

leftBtn.addEventListener('click', () => {
    idx--
    changeImg()
    clearInterval(interval)
})

// OPEN TIMES _____________________________________________________

const day = document.querySelectorAll('.day')
let today = new Date();
let todayDay = today.getDay();
let time = today.getHours();


function storeDay() {
        if (1 < 2) {
            day[todayDay].classList.add('open')
        } 
}

const storeOpen = document.querySelector('.open-sign')
const storeClosed = document.querySelector('.closed-sign')
const storeOpenSoon = document.querySelector('.opening-soon-sign')

function storeHours() {
    if (todayDay === 6 || todayDay === 0) {
        weekendHours()
    } else if (time >= 10 && time < 19) {
        storeOpen.style.display = "block"
        storeClosed.style.display = "none"
        storeOpenSoon.style.display = "none"
    } else if (time >= 19 || time <= 5) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "none"
        storeClosed.style.display = "block"
    } else if (time >= 6 && time <= 9) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "block"
        storeClosed.style.display = "none"
    }
}

function weekendHours() {
    if (time > 11 && time < 17) {
        storeOpen.style.display = "block"
        storeClosed.style.display = "none"
        storeOpenSoon.style.display = "none"
    } else if (time >= 6 && time <= 11) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "block"
        storeClosed.style.display = "none"
    } else if (time >= 17 || time <= 5)  {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "none"
        storeClosed.style.display = "block"
    }
}

storeHours()
storeDay()

// GOOGLE MAP _____________________________________________________

var shop = { lat:41.962220, lng: -87.652397 }

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: shop,
    zoom: 14,
    streetViewControl: false,
    mapTypeControl: false
  });

  const bikeMap = new google.maps.Map(document.getElementById("bike-map"), {
    center: { lat: 41.878113, lng: -87.629799 },
    zoom: 11,
    mapTypeControl: false,
    mapTypeId: 'hybrid'
  });

  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(bikeMap);



  var marker = new google.maps.Marker({
      position: shop,
      map: map

  })
}

 // SALES BOXES _____________________________________________________

 const saleBox = document.querySelectorAll('.sale-box')

 window.addEventListener('scroll', checkBoxes)
 
 function checkBoxes() {
 
     const triggerBottom = window.innerHeight / 5 * 4.1
 
     saleBox.forEach(box => {
 
         const boxTop = box.getBoundingClientRect().top
 
         if (boxTop < triggerBottom) {
             box.classList.add('show')
         } else {
             box.classList.remove('show')
         }
     })
 }

 // WEATHER APP ____________________
const tempDiv = document.getElementById('temp')
const weatherDesc = document.getElementById('weather-desc')
const windSpeed = document.getElementById('wind')
const weatherImg = document.getElementById('weather-icon')
const feelsLike = document.getElementById('temp-feels')

const visibility = document.getElementById('visibility')
const maxTempDiv = document.getElementById('max-temp')
const minTempDiv = document.getElementById('min-temp')
const humidityDiv = document.getElementById('humidity')
const windDirectDiv = document.getElementById('wind-direction')

let api = 'https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=64795acd7778d8dcbd8100c83e28916f&units=imperial'

fetch(api)
    .then(response => {
        return response.json()
    })
    .then(data => {



        const temp = Math.floor(data.main.temp)
        const current = data.weather

        const vis = Math.floor(data.visibility/1609)
        const windDirect = data.wind.deg
        const humidity = data.main.humidity
        const maxTemp = Math.floor(data.main.temp_max)
        const minTemp = Math.floor(data.main.temp_min)

        const wind = Math.ceil(data.wind.speed)

        const description = current[0].main

        const weatherIcon = current[0].main

        const feels = Math.floor(data.main.feels_like)

        tempDiv.innerHTML = `Currently: ${temp}\xB0F`
        weatherDesc.innerHTML = `${description}&#33`
        windSpeed.innerHTML = `Wind: ${wind}mph`
        feelsLike.innerHTML = `Real Feel: ${feels}\xB0F`
        weatherImg.src = `weatherapp/${weatherIcon}.png`
        visibility.innerHTML = `Visibility: ${vis} miles`
        humidityDiv.innerHTML = `Humidity: ${humidity} &#37`
        windDirectDiv.innerHTML = windDirect
        maxTempDiv.innerHTML = `Today's High: ${maxTemp}`
        minTempDiv.innerHTML = `Today's Low: ${minTemp}`
    })
