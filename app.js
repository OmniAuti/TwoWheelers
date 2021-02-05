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
let time = today.getHours();


function storeDay() {

    let todayDay = today.getDay();
    let openDay = todayDay - 1;

        if (1 < 2) {
            day[openDay].classList.add('open')
        } else if (todayDay === 0) {
            day[0].classList.add('open')
        } else if (todayDay === 6) {
            day[6].classList.add('open')
        }
}

function storeHours() {

    const storeOpen = document.querySelector('.open-sign')
    const storeClosed = document.querySelector('.closed-sign')
    const storeOpenSoon = document.querySelector('.opening-soon-sign')

    if (time >= 10 && time < 17) {
        storeOpen.style.display = "block"
        storeClosed.style.display = "none"
        storeOpenSoon.style.display = "none"
    } else if (time >= 17 || time <= 6) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "none"
        storeClosed.style.display = "block"
    } else if (time > 6 && time <= 9) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "block"
        storeClosed.style.display = "none"
    } else if (day[5] || day[6] && time > 11) {
        storeOpen.style.display = "block"
        storeClosed.style.display = "none"
        storeOpenSoon.style.display = "none"
    } else if (day[5] || day[6] && time > 16) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "none"
        storeClosed.style.display = "block"
    } else if (day[5] || day[6] && time > 8) {
        storeOpen.style.display = "none"
        storeOpenSoon.style.display = "block"
        storeClosed.style.display = "none"
    }
}

storeHours()
storeDay()

// GOOGLE MAP _____________________________________________________

let map;
var shop = { lat:41.962220, lng: -87.652397 }

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: shop,
    zoom: 14,
    streetViewControl: false,
    mapTypeControl: false
  });

  var marker = new google.maps.Marker({
      position: shop,
      map: map
  })
}

 // SALES BOXES _____________________________________________________

 const saleBox = document.querySelectorAll('.sale-box')

 window.addEventListener('scroll', checkBoxes)
 
 function checkBoxes() {
 
     const triggerBottom = window.innerHeight/5 * 4
 
     saleBox.forEach(box => {
 
         const boxTop = box.getBoundingClientRect().top
 
         if (boxTop < triggerBottom) {
             box.classList.add('show')
         } else {
             box.classList.remove('show')
         }
     })
 }