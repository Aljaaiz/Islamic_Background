//DOM ELEMENT
const time = document.getElementById("time"),
  greeting = document.getElementById("greetings"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  maindiv = document.getElementById("maindiv");

function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let mins = today.getMinutes();
  let seconds = today.getSeconds();

  //Show AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  //12 Hours Format
  hour = hour % 12 || 12;
  time.innerHTML = `${hour}<span> : </span>${addZero(mins)}${amPm}`;
  setTimeout(showTime, 1000);
}
showTime();
// Function addZero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

//GET NAME
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

//GET Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Your Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

//SET NAME INTO LS
name.addEventListener("keypress", e => {
  if (e.which == 13 || e.keyCode == 13) {
    localStorage.setItem("name", e.target.textContent);
    name.blur();
  }
});
name.addEventListener("blur", e => {
  localStorage.setItem("name", e.target.textContent);
  name.blur();
});

//SET Focus INTO LS
focus.addEventListener("keypress", e => {
  if (e.which == 13 || e.keyCode == 13) {
    localStorage.setItem("focus", e.target.textContent);
    focus.blur();
  }
});

focus.addEventListener("blur", e => {
  localStorage.setItem("focus", e.target.textContent);
  focus.blur();
});

getName();
getFocus();

// FETCHING PRAYER TIME USING BLUR EVENT
let city_input = document.querySelector(".city_search");

let key = "7f30401786cbb1917fb21240088f70c2";
const proxy = "https://cors-anywhere.herokuapp.com/";
// let country = "dubai";

city_input.addEventListener("blur", () => {
  city_inputValue = city_input.value;
  console.log(city_inputValue);

  setPrayerTimeLocToLs(city_inputValue);
  getPrayerTime(city_inputValue);
});

// setPrayerTimeLocation to LS
function setPrayerTimeLocToLs(city_inputValue) {
  localStorage.setItem("prayerTimecity", city_inputValue);
}
//GETPrayerTimeLocation from LS
function getPrayerTimeLocfrmLs(prayerTimecity) {
  if (localStorage.getItem("prayerTimecity") === null) {
    prayerTimecity = "dubai";
  } else {
    prayerTimecity = localStorage.getItem("prayerTimecity");
  }
  getPrayerTime(prayerTimecity);
}

// FETCHING PRAYER TIME USING KEY EVENT
city_input.addEventListener("keypress", e => {
  city_inputValue = city_input.value;
  console.log(city_inputValue);

  if (e.which == 13 || e.keyCode == 13) {
    getPrayerTime(city_inputValue);
    city_input.blur();
  }
});

//GET PARAYER TIME FUNCTION
function getPrayerTime(city_inputValue) {
  fetch(
    `${proxy}}https://muslimsalat.com/${city_inputValue}/daily.json?key=${key}`
  )
    .then(res => res.json())
    .then(response => {
      let output = "";
      console.log(response);

      const { items, state } = response;
      items.forEach(item => {
        output = `
        document.getElementById("prayerTimeLoc").textContent = ${state};
        <li><span>Fajr</span>- <span>${item.fajr}</span></li>
          <li><span>Sunrise</span>- <span>${item.shurooq}</span></li>
          <li><span>Dhur</span>- <span>${item.dhuhr}</span></li>
          <li><span> Asr  </span>- <span>${item.asr}</span></li>
          <li><span>Magrib</span>- <span>${item.maghrib}</span></li>
          <li><span>Ishai</span>- <span> ${item.isha}</span></li>
          <h3>Date - ${item.date_for}</span></h3>
          
          `;
      });
      // console.log(items[0].fajr);
      // function trackTime() {
      //   items.asr = "1:59";
      //   let today = new Date();
      //   let hour = today.getHours();
      //   let mins = today.getMinutes();

      //   if (hour && mins === items.fajr) {
      //     playAdhan();
      //   } else if (hour && mins === items.dhur) {
      //     playAdhan();
      //   } else if (hour && mins === items.asr) {
      //     playAdhan();
      //   } else if (hour && mins === items.maghrib) {
      //     playAdhan();
      //   } else if (hour && mins === items.ishai) {
      //     playAdhan();
      //   }
      //   setTimeout(trackTime, 1000);
      // }

      document.querySelector("ul").innerHTML = output;
    })

    .catch(function(err) {
      document.querySelector("ul").innerHTML =
        "Error Occured <br>Please try again Later";
    });
}

//WEATHER CITY MODAL SEARCH
let search_box = document.querySelector(".location-modal");
let text_input = document.querySelector("#text-input");
let search_btn = document.querySelector("#search");
const weather_div = document.querySelector("#weather_div");
const location_modal = document.querySelector(".location-modal");

weather_div.addEventListener("click", function() {
  location_modal.classList.add("active");
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".preloader").style.display = "none";
});
// GET prayer time from loca storage and perform the search againg

loadAllEvent();
// FUNC to Laod ALL FUNCTIONS
function loadAllEvent() {
  getPrayerTime();
  searchWeather();
  getCityFromLs();
  getPrayerTimeLocfrmLs();
}

// //FEtaching Weather
function searchWeather() {
  text_input.addEventListener("blur", function() {
    location_modal.classList.remove("active");
    let city = text_input.value;

    //set City to LS
    setcityToLs(city);
    fecthWeather(city);
  });
}
// FUNC TO SET WEATHER CITY TO Local Storage
function setcityToLs(city) {
  localStorage.setItem("city", city);
}

function getCityFromLs(city) {
  if (localStorage.getItem("city") == null) {
    city = "dubai";
  } else {
    city = localStorage.getItem("city");
    // console.log(city);
  }
  fecthWeather(city);
}

//FUnction to fecth Weather
function fecthWeather(city) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=010de9aad2daf9275f7f13d7d358cdc4&units=metric
        `
  )
    .then(res => res.json())
    .then(response => {
      console.log(response);
      const {
        main: { temp },
        name,
        sys: { country }
      } = response;
      const icon = response.weather[0].icon;
      document.querySelector("#weatherId").innerHTML = temp;
      document.querySelector("#location").innerText = name;
      document.querySelector("#country").innerText = country;
      const WeatherCount = (document.querySelector(
        ".weatherImg"
      ).src = `http://openweathermap.org/img/w/${icon}.png `);

      console.log(temp, name, icon, WeatherCount);

      // weather_div.addEventListener("blur", () => {
    })
    .catch(error => {
      console.log(error);
    });
}
//QUR'AN FETCH

fetch(`http://quranapi.azurewebsites.net/api/verse/1`)
  .then(res => res.json())
  .then(response => {
    response;
    document.querySelector("#qtext").innerHTML = response.Text;
    document.querySelector("#chapter").innerHTML = response.Chapter;
    document.querySelector("#c_name").innerHTML = response.Id;
    console.log(response);
  });

// let long = "";
// let lat = "";
// let OpApiKey = "85ff954134f310afbd25828f921c38fe";
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(Position => {
//     long = Position.coords.longitude;
//     lat = Position.coords.latitude;
//     console.log(lat, long);

//     //Rounding Position Coordinate to Whole Number
//     let lat2 = Math.round(lat);
//     let long2 = Math.round(long);
//     console.log("Math.Round " + lat2, "Math.Round " + long2);

function playAdhan() {
  const adhan = document.getElementById("adhan");
  adhan.play();
}

let day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    day = "Not a Day";
}

console.log(day);
