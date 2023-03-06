// translate 
import arrLang from './lang.js';
const ruTranslate = document.querySelector ('.ru');
const enTranslate = document.querySelector ('.en');
const placeholder = document.querySelector ('.name');
const city = document.querySelector('.weather input');
let lang = 'en';
ruTranslate.addEventListener('click', () => {
    lang='ru';
    placeholder.placeholder = arrLang['entername'][lang];
    city.value = arrLang['minsk'][lang];
    getWeather();
});
enTranslate.addEventListener('click', () => {
    lang='en';
    placeholder.placeholder = arrLang['entername'][lang];
    city.value = arrLang['minsk'][lang];
    getWeather();
});


// time n date
const time = document.querySelector('.time');
const dateEl = document.querySelector('.date');
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
    
}
function showDate () {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    let langForDate = lang+'-'+lang.toUpperCase();
    const currentDate = date.toLocaleDateString(langForDate, options);
    dateEl.textContent = currentDate;
}

showDate();
showTime();

// greetings
function getTimeOfDay () {
    const date = new Date();
    const hours = date.getHours();
    switch (hours) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return 'night';
            break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            return 'morning';
            break;
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
            return 'afternoon';
            break;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
            return 'evening';
            break;
        
    }
}
function showGreeting() {
    const greeting = document.querySelector('.greeting');
        const timeOfDay = getTimeOfDay();
    const greetingText = arrLang[timeOfDay][lang];
    greeting.textContent = greetingText;
    function setLocalStorage() {
        const name = document.querySelector ('.name');
        localStorage.setItem('name', name.value);
      }
      window.addEventListener('beforeunload', setLocalStorage)
      function getLocalStorage() {
        const name = document.querySelector ('.name');
        if(localStorage.getItem('name')) {
          name.value = localStorage.getItem('name');
        }
      }
      window.addEventListener('load', getLocalStorage)
}

// background
function setBg() {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    slideNext.style.display = 'block';
    slidePrev.style.display = 'block';
    const timeOfDay = getTimeOfDay();
    const background = document.querySelector ('body');
    let sliderNum = randomNum;
    if (sliderNum<10) {
        background.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/0${sliderNum}.jpg')`;
    } else {
        background.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${sliderNum}.jpg')`;
    }

}

function getRandomNum () {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }
    return (getRandomInt(19));
} 

let randomNum = getRandomNum();
let sliderNum = randomNum;

function getSlideNext () {
    const slideNext = document.querySelector('.slide-next');
    slideNext.addEventListener('click', () => {
        randomNum++;
        if (randomNum == 20) {
            randomNum = 1;
        }

        // console.log (randomNum);
        setBg();
    })
    
}
function getSlidePrev () {    
    const slidePrev = document.querySelector('.slide-prev');
    slidePrev.addEventListener('click', () => {
        randomNum--;
        if (randomNum == 1) {
            randomNum = 20;
        }
        // console.log(randomNum);
        setBg();
    })
    
}
getSlidePrev();
getSlideNext ();
setBg();

async function setBgUnsplash() {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    const img = new Image();
    const timeOfDay = getTimeOfDay(); 
    const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=qHGHBMg8fWfDUd8JcITYy7ZddHT4_Oc0FDLbvU-KpAU`
    const res = await fetch(url);
    const data = await res.json();
    const body = document.querySelector('body');    
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = `url('${data.urls.regular}')`;
    };
    slideNext.style.display = 'none';
    slidePrev.style.display = 'none';

};

const unsplashBackground = document.querySelector ('.unsplash-background');
const githubBackground = document.querySelector ('.github-background');
unsplashBackground.addEventListener('click', setBgUnsplash);
githubBackground.addEventListener('click', setBg);




// weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
city.value = arrLang['minsk'][lang];
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=3a20c715350341472bdcca34955345ca&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    wind.textContent = `${arrLang['wind'][lang]}: ${ Math.round(data.wind.speed)} ${arrLang['ms'][lang]}`;
    humidity.textContent = `${arrLang['humidity'][lang]}: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
  }
city.addEventListener('change', () => {
    getWeather();
})
getWeather();

// quotes
const button = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let i=0;
    quote.textContent = `${data[i].text}`;
    author.textContent = `${data[i].author}`;
    button.addEventListener ('click', () => {
        if (i==2) {
            i=0;
        } else {
            i++;
        }
        quote.textContent = `${data[i].text}`;
        author.textContent = `${data[i].author}`;
        }
    );   
}
getQuotes();

// audio 
const playBtn = document.querySelector ('.play');
const pauseBtn = document.querySelector('.pause');
const prevBtn = document.querySelector ('.play-prev');
const nextBtn = document.querySelector ('.play-next');

const audio = new Audio();
let isPlay = false;
let playNum = 0;

function playAudio() {
  const titleSong = document.querySelector ('.song-name');
  titleSong.textContent = `${playList[playNum].title}`;  
  const lengthPlayer = document.querySelector ('.length');
  lengthPlayer.textContent = `${playList[playNum].duration}`;     
  const playListItem = document.querySelectorAll ('.play-item');
  audio.src = playList[playNum].src;
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    audio.volume = .35;
    playBtn.classList.add ('pause'); 
    isPlay = true;
    playListItem[playNum].classList.add ('item-active');
  } else {
    audio.pause();
    playBtn.classList.remove ('pause');
    playListItem[playNum].classList.remove ('item-active');
    isPlay = false;
  }
  
}

function playNext() {
    const playListItem = document.querySelectorAll ('.play-item');
    if (playNum < playList.length) {
        playNum++;
    }
    else {
        playNum = 0;
    }
    console.log(playNum);
    playListItem[playNum+1].classList.remove ('item-active');
    playAudio();
}

function playPrev() {
    const playListItem = document.querySelectorAll ('.play-item');
    if (playNum >0) {
        playNum--;
    }
    else {
        playNum = 3;
    }
    console.log(playNum);
    playListItem[playNum-1].classList.remove ('item-active');
    playAudio();
}

playBtn.addEventListener('click', playAudio);
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

const playListContainer = document.querySelector ('.play-list');
for (let i=0; i<playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add ('play-item');
    li.textContent = `${playList[i].title}`;
    playListContainer.append (li);
}

const audioPlayer = document.querySelector(".player");

const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);


function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

import playList from './playList.js';

